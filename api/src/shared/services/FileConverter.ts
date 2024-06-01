import { type IConverterResponse, type IConverter } from '@/interfaces';
import FFMPEGConverter from '../converter/FFMPEGConverter';

class FileConverter {
  private readonly converter: IConverter = new FFMPEGConverter();

  async convertToMp3(filePath: string): Promise<IConverterResponse> {
    const output = await this.converter.setFilePath(filePath).toMp3();
    return output;
  }
}

export default FileConverter;
