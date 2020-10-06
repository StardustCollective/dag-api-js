import {RestApi} from '../cross-platform/api/rest.api';
import {AddressBalance, AddressLastAcceptedTransaction, ClusterInfo} from '../data/types';
import {ClusterPeerInfo} from '../data/cluster-peer-info';
import {PeerMetrics} from '../data/peer-metrics';
import {PeerMetricsResponse} from './peer-node-api';
import {DagApiConstants} from '../dag-api-constants';

class LoadBalancerApi {

  private service = new RestApi(DagApiConstants.LOAD_BALANCER_URL);

  config () {
    return this.service.configure();
  }

  async getMetrics () {
    return this.service.$get<PeerMetricsResponse>('/metrics').then(rawData => PeerMetrics.parse(rawData.metrics, 0));
  }

  async getAddressBalance (address: string) {
    return this.service.$get<AddressBalance>('/address/' + address);
  }

  //To send DAG from and an Address with a previous tx:
  // 1. get last-ref
  // 2. Block-Explorer/transactions/hash
  // 3. Use tx.transactionOriginal as -p (previous)
  async getAddressLastAcceptedTransactionRef (address: string) {
    return this.service.$get<AddressLastAcceptedTransaction>('/transaction/last-ref/' + address);
  }

  async postTransaction (tx: any) {
    return this.service.$post('/transaction', tx);
  }

  async getClusterInfo (): Promise<ClusterPeerInfo[]> {
    return this.service.$get<ClusterInfo[]>('/cluster/info').then(info => this.processClusterInfo(info))
  }

  async getClusterInfoWithRetry (): Promise<ClusterPeerInfo[]> {
    return this.service.$get<ClusterInfo[]>('/cluster/info', null, { retry: 5 }).then(info => this.retryClusterInfo(info))
  }

  //Returns number of connected Nodes in Cluster
  async activeNodeCount () {
    return this.service.$get<number>('/utils/health');
  }

  private retryClusterInfo (info: ClusterInfo[]) {
    if (info && info.map) {
      return this.processClusterInfo(info);
    }
    else {
      return new Promise<ClusterPeerInfo[]>(resolve => {
        setTimeout(() => {
          resolve(this.getClusterInfoWithRetry());
        }, 1000)
      });

    }
  }

  private processClusterInfo (info: ClusterInfo[]): ClusterPeerInfo[] {
    return info && info.map && info.map(d => ({ alias: d.alias, walletId: d.id.hex, ip: d.ip.host, status: d.status, reputation: d.reputation }));
  }
}

export const loadBalancerApi = new LoadBalancerApi();

