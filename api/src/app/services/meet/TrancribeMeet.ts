import { getOpenai } from '../../../tools/openai';
import GetFileContent from '../upload/GetFileContent';
import WriteFile from '../upload/WriteFIle';

interface TranscribeProps {
  id: string;
  language: string;
}

class TranscribeMeet {
  public async transcribe({ id, language }: TranscribeProps) {
    const openai = getOpenai();
    const getFile = new GetFileContent();
    const writeFile = new WriteFile();

    const file = getFile.asStream(id);

    const transcription: any = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
      language,
      temperature: 0,
      response_format: 'text',
    });

    writeFile.local({ filename: id, content: transcription, format: 'txt' });

    return transcription;
  }
}

export default TranscribeMeet;
