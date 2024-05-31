import AppError from '@/errors/AppError';
import bcrypt from 'bcrypt';

class BcryptGenerator implements IHashGenerator {
  public async compare(data: string, toCompare: string): Promise<boolean> {
    try {
      const match = await bcrypt.compare(data, toCompare);
      return match;
    } catch (error) {
      throw new AppError('Failed to validate Hash');
    }
  }

  public async generate(data: string): Promise<string> {
    try {
      const id = await bcrypt.hash(data, 14);
      return id;
    } catch (error) {
      throw new AppError('Failed to generate Hash');
    }
  }
}

export default BcryptGenerator;
