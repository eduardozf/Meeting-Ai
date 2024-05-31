import { type IIDGenerator } from '@/interfaces';
import UUIDGenerator from '../../shared/generator/UUIDGenerator';

class IDGenerator {
  private readonly generator: IIDGenerator = new UUIDGenerator();

  public generateID(): string {
    const id = this.generator.generate();
    return id;
  }
}

export default IDGenerator;
