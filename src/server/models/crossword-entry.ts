import * as dynamoose from 'dynamoose';

export interface CrosswordEntry {
  groupId: string;
  date: string;
  completionTime: string;
}

const CrosswordEntryEntity = dynamoose.model<CrosswordEntry, CrosswordEntry>('CrosswordEntries', {
  groupId: String,
  completionTime: String,
  date: String
});

export { CrosswordEntryEntity };
