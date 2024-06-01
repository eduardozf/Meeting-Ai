import { type IHashGenerator } from '@/interfaces';
import BcryptGenerator from '../generator/BcryptGenerator';

class HashGenerator {
  private readonly generator: IHashGenerator = new BcryptGenerator();

  public async hash(data: string): Promise<string> {
    const hashString = await this.generator.generate(data);
    return hashString;
  }

  public async compare(data: string, compareWith: string): Promise<boolean> {
    const valid = await this.generator.compare(data, compareWith);
    return valid;
  }
}

export default HashGenerator;
