import { dynamoose } from '../services/dynamoose-wrapper-service';

export interface CrosswordEntry {
  teamId: string;
  crossworderId: string,
  crossworderType: string,
  date: string;
  completionTime: string;
}

const CrosswordEntryEntity = dynamoose.model<CrosswordEntry, CrosswordEntry>('CrosswordEntries2', {
  teamId: String,
  crossworderId: {
    type: String,
    index: {
      global: true,
      hashKey: 'crossworderId',
      rangeKey: 'completionTime',
      name: 'crossworderId-completionTime-index',
      throughput: 1
    }
  },
  crossworderType: String,
  completionTime: String,
  date: String
}, { update: false, create: false });

export { CrosswordEntryEntity };
