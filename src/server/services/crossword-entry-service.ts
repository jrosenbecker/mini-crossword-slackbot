import { Model } from 'dynamoose';

import { CrosswordEntry, CrosswordEntryEntity } from '../models/crossword-entry';

class CrosswordEntryService {
  public save(crosswordEntry: CrosswordEntry): Promise<Model<CrosswordEntry>> {
    const entity = new CrosswordEntryEntity(crosswordEntry);
    return entity.save();
  }

  public getTopTimes(topCount: number, groupId: string): Promise<CrosswordEntry[]> {
    return CrosswordEntryEntity.query('groupId').eq(groupId).ascending().limit(topCount).exec()
      .then(result => {
        return result as CrosswordEntry[];
      });
  }

  public getAllTopTimes(groupId: string): Promise<CrosswordEntry[]> {
    return CrosswordEntryEntity.query('groupId').eq(groupId).ascending().exec()
      .then(result => {
        return result as CrosswordEntry[];
      });
  }
}

const service = new CrosswordEntryService();

export { service as CrosswordEntryService }
