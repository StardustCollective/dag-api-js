import {PeerNodeState} from './peer-metrics';

export type AddressBalance = {
  "balance":number,
  "memPoolBalance":number,
  "reputation":number,
  "ancestorBalances":{},
  "ancestorReputations":{},
  "balanceByLatestSnapshot":number,
  "rewardsBalance":number
}

export type ClusterInfo = {
  "alias": string,
  "id": {
    "hex": string
  },
  "ip": {
    "host": string,
    "port": number //9001
  },
  "status": PeerNodeState,
  "reputation": number
}

export type Block = {
  "hash": string,
  "height": {
    "min": number,
    "max": number
  },
  "transactions": string[],
  "children": number,
  "snapshotHash": string
}

export type Transaction = {
  hash : string;
  amount : number;
  receiver : string;
  sender : string;
  fee : number;
  isDummy : true;
  timeAgo?: string;
  timestamp: string;
  lastTransactionRef : {
    prevHash : string;
    ordinal : number
  };
  snapshotHash : string;
  checkpointBlock : string;
  pending?: boolean;
  pendingMsg?: string;
}

export type AddressLastAcceptedTransaction = {
  address: string;
  prevHash: string,
  ordinal: number,
  success: boolean,
  message: string,
  tx: any
}

export type SnapshotCacheInfo = {
  blockCount: number;
  blockHeight: number;
  cacheJobStatus: string;
  dateStr: string;
  dagAmount: number;
  rebuildTime: number;
  snapshotId: string;
  txsWithAmount: TransactionDag[];
  date: number;
  txCount: number;
}

export type TransactionDag = {
  hash: string;
  from: string;
  to: string;
}

export type Snapshot = {
  latestSnapshotInfo?: SnapshotCacheInfo;
  "hash": string,
  "height": number,
  "checkpointBlocks": string[]
}
