import AppError from '@/errors/AppError';
import { type IIDGenerator } from '@/interfaces';
import ObjectID from 'bson-objectid';

class BSONGenerator implements IIDGenerator {
  public generate(): string {
    try {
      const id = ObjectID().toHexString();
      return id;
    } catch (error) {
      throw new AppError('Failed to generate BSON');
    }
  }
}

export default BSONGenerator;
