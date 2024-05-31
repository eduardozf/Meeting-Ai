import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import AppError from '../../errors/AppError';
import IDGenerator from '../generator/id';
ffmpeg.setFfmpegPath(ffmpegPath.path);

class FFMPEGConverter implements IConverter {
  private filePath: string = '';

  public setFilePath(path: string): IConverter {
    this.filePath = path;

    return this;
  }

  private getOutputFolder(): string {
    let folder = './tmp';

    const customFolder = process?.env?.CONVERTER_OUTPUT_FOLDER;
    if (customFolder) {
      // Clears the output string
      const regex = /[/\\]+$/;
      const parsedPath = customFolder.replace(regex, '');
      folder = parsedPath;
    }

    return folder;
  }

  private getNewID(): string {
    const generator = new IDGenerator();
    const id = generator.generateID();
    return id;
  }

  public async toMp3(bitrate = 30): Promise<string> {
    try {
      const newId = this.getNewID();
      const outputFolder = this.getOutputFolder();
      const fullOutputPath = `${outputFolder}/${newId}.mp3`;

      const filePromise = new Promise((resolve, reject) => {
        ffmpeg(this.filePath)
          .output(fullOutputPath)
          .audioBitrate(bitrate)
          .on('end', () => {
            resolve(true);
          })
          .on('error', (err: any) => {
            reject(err);
          })
          .run();
      });

      await filePromise;
      return fullOutputPath;
    } catch (error: any) {
      throw new AppError('Failed to convert file to mp3');
    }
  }
}

export default FFMPEGConverter;
