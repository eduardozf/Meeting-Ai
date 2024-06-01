import { type IIDGenerator } from '@/interfaces';
import BSONGenerator from '../generator/BSONGenerator';

class IDGenerator {
  private readonly generator: IIDGenerator;

  constructor() {
    this.generator = new BSONGenerator();
  }

  public generateID(): string {
    const id = this.generator.generate();
    return id;
  }
}

export default IDGenerator;
