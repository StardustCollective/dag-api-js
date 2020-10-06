import {PeerNodeState} from './peer-metrics';

export type ClusterPeerInfo = {
  ip: string;
  alias: string;
  status: PeerNodeState;
  walletId: string;
  reputation: number;
}

