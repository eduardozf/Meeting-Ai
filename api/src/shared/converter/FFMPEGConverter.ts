import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { type IConverterResponse, type IConverter } from '@/interfaces';
import { splitFileName } from '../utils/strings';
import path from 'path';
import { processError } from '../utils/error';
ffmpeg.setFfmpegPath(ffmpegPath.path);

class FFMPEGConverter implements IConverter {
  private filePath: string = '';
  private bitrate: number = 25;

  public setFilePath(path: string): IConverter {
    this.filePath = path;
    this.bitrate = Number(process.env.DEFAULT_MP3_BITRATE) || 25;

    return this;
  }

  private getOutputFolder(): string {
    let folder = './storage';

    const customFolder = process?.env?.CONVERTER_OUTPUT_FOLDER;
    if (customFolder) {
      // Clears the output string
      const regex = /[/\\]+$/;
      const parsedPath = customFolder.replace(regex, '');
      folder = parsedPath;
    }

    return folder;
  }

  public setBitrate(value: number): this {
    this.bitrate = value;

    return this;
  }

  public async toMp3(): Promise<IConverterResponse> {
    try {
      const { name } = splitFileName(this.filePath);
      const convertedFilename = `${name}.mp3`;

      const outputFolder = this.getOutputFolder();
      const fullOutputPath = path.resolve(outputFolder, convertedFilename);

      const filePromise = new Promise((resolve, reject) => {
        ffmpeg(this.filePath)
          .output(fullOutputPath)
          .audioBitrate(this.bitrate)
          .on('end', () => {
            resolve(true);
          })
          .on('error', (err: any) => {
            reject(err);
          })
          .run();
      });

      await filePromise;
      const response: IConverterResponse = {
        id: name,
        filename: convertedFilename,
      };

      return response;
    } catch (error: any) {
      throw processError(error, 'Failed to convert file to mp3');
    }
  }
}

export default FFMPEGConverter;
