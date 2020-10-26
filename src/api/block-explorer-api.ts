import {RestApi} from '../cross-platform/api/rest.api';
import {Block, Snapshot, Transaction} from '../dto/types';
import {DagApiConstants} from '../dag-api-constants';

export class BlockExplorerApi {
  private service = new RestApi(DagApiConstants.BLOCK_EXPLORER_URL);

  config () {
    return this.service.configure();
  }

  async getLatestSnapshot () {
    return this.service.$get<Snapshot>('/snapshot/latest');
  }

  async getSnapshot (height: number) {
    return this.service.$get<Snapshot>('/snapshot/' + height);
  }

  async getTransactionsByAddress (address: string) {
    return this.service.$get<Transaction[]>('/address/' + address + '/transaction' );
  }

  async getCheckpointBlock(id: string) {
    return this.service.$get<Block>('/checkpoint-block/' + id);
  }

  async getTransaction (id: string) {
    return this.service.$get<Transaction>('/transaction/' + id);
  }
}

export const blockExplorerApi = new BlockExplorerApi();


