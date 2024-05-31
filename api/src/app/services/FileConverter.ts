import FFMPEGConverter from '../../shared/converter/FFMPEGConverter';

class FileConverter {
  private readonly converter: IConverter = new FFMPEGConverter();

  async convertToMp3(filePath: string): Promise<string> {
    const output = await this.converter.setFilePath(filePath).toMp3();
    return output;
  }
}

export default FileConverter;
