import { multerConfig } from '@/config/multer.config';
import { type ITranscriberResponse, type ITranscriber } from '@/interfaces';
import path from 'path';
import { getOpenAi } from '../utils/openai';
import fs from 'fs';
import AppError from '@/errors/AppError';
import { splitFileName } from '../utils/strings';

class OpenAiTranscriber implements ITranscriber {
  private fullPath: string = '';
  private readonly supportedFormats = [
    'm4a',
    'mp3',
    'webm',
    'mp4',
    'mpga',
    'wav',
    'mpeg',
  ];

  public setFile(fileName: string): this {
    this.fullPath = path.resolve(multerConfig.path, fileName);

    const exists = fs.existsSync(this.fullPath);
    if (!exists) throw new AppError('File not found on transcription');

    return this;
  }

  private supportedFileType(myType: string): boolean {
    const supported = this.supportedFormats.includes(myType);
    return supported;
  }

  public async audioToText(): Promise<ITranscriberResponse> {
    const openai = getOpenAi();

    const { name, format } = splitFileName(this.fullPath);
    this.supportedFileType(format);

    const file = fs.createReadStream(this.fullPath);

    const transcription = (await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
      language: 'pt',
      temperature: 0,
      response_format: 'text',
    })) as unknown as string;

    const filename = `${name}.txt`;
    const savePath = path.resolve(multerConfig.path, filename);

    fs.writeFileSync(savePath, transcription, 'utf-8');

    const response: ITranscriberResponse = {
      id: name,
      filename,
      transcription,
    };

    return response;
  }
}

export default OpenAiTranscriber;
