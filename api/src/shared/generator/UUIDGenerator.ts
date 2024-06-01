import { v4 } from 'uuid';
import AppError from '@/errors/AppError';
import { type IIDGenerator } from '@/interfaces';

class UUIDGenerator implements IIDGenerator {
  public generate(): string {
    try {
      const id = v4();
      return id;
    } catch (error) {
      throw new AppError('Failed to generate UUID');
    }
  }
}

export default UUIDGenerator;
