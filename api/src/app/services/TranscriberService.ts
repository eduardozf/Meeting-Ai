import { type ITranscriber, type ITranscriberResponse } from '@/interfaces';
import OpenAiTranscriber from '@/shared/transcribers/OpenAiTranscriber';

class TranscriberService {
  private readonly transcriber: ITranscriber;

  constructor() {
    this.transcriber = new OpenAiTranscriber();
  }

  public async transcribeFile(id: string): Promise<ITranscriberResponse> {
    const file = `${id}.mp3`;

    const transcription = await this.transcriber.setFile(file).audioToText();

    return transcription;
  }
}

export default TranscriberService;
