import FFMPEGConverter from './FFMPEGConverter';

class Converter {
  private readonly converter: IConverter = new FFMPEGConverter();

  async convertToMp3(filePath: string): Promise<string> {
    const output = await this.converter.setFilePath(filePath).toMp3();
    return output;
  }
}

export default Converter;
