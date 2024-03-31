import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import AppError from '../../errors/AppError';
ffmpeg.setFfmpegPath(ffmpegPath.path);

type ConvertProps = {
  id: string;
  path: string;
};

class ConvertFile {
  public async toMp3({ id, path }: ConvertProps) {
    try {
      const filePromise = new Promise((resolve, reject) => {
        ffmpeg(path)
          .output(`./tmp/${id}.mp3`)
          .audioBitrate(30)
          .on('end', () => resolve(true))
          .on('error', (err: any) => reject(err))
          .run();
      });

      await filePromise;
    } catch (error: any) {
      throw new AppError('Failed to convert file to mp3');
    }
  }
}

export default ConvertFile;
