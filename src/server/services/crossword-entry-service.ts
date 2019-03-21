import { CrosswordEntry, CrosswordEntryEntity } from '../models/crossword-entry';
import { Model } from 'dynamoose';

class CrosswordEntryService {
  public save(crosswordEntry: CrosswordEntry): Promise<Model<CrosswordEntry>> {
    const entity = new CrosswordEntryEntity(crosswordEntry);
    return entity.save();
  }

  public getTopTimes(topCount: number, groupId: string): Promise<Array<Model<CrosswordEntry>>> {
    return CrosswordEntryEntity.query('groupId').eq(groupId).ascending().limit(topCount).exec((error, result) => {
      if (!error) {
        console.log(result[0]);
        return result;
      }
      throw error;
    });
  }
}

const service = new CrosswordEntryService();

export { service as CrosswordEntryService }
