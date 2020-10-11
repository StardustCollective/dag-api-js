import {RestApi} from '../cross-platform/api/rest.api';
import {Block, Snapshot, Transaction} from '../data/types';
import {DagApiConstants} from '../dag-api-constants';

export class BlockExplorerApi {
  private service = new RestApi(DagApiConstants.BLOCK_EXPLORER_URL);

  config () {
    return this.service.configure();
  }

  async getLatestSnapshot () {
    return this.service.$get<Snapshot>('/snapshots/latest');
  }

  async getSnapshot (height: number) {
    return this.service.$get<Snapshot>('/snapshots/' + height);
  }

  async getTransactionsByAddress (address: string) {
    return this.service.$get<Transaction[]>('/transactions', { address });
  }

  async getCheckpointBlock(id: string) {
    return this.service.$get<Block>('/checkpoints/' + id);
  }

  async getTransaction (id: string) {
    return this.service.$get<Transaction>('/transactions/' + id);
  }
}

export const blockExplorerApi = new BlockExplorerApi();


