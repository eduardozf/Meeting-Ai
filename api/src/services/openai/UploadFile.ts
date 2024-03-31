import { FileCreateParams } from 'openai/resources/files';
import { getOpenai } from '../../tools/openai';
import GetFileContent from '../upload/GetFileContent';

type PurposesType = FileCreateParams['purpose'];

class UploadFileToAi {
  public async toOpenAi(
    file_path: string,
    purpose: PurposesType = 'assistants',
  ) {
    const openai = getOpenai();
    const getFile = new GetFileContent();

    const file = await openai.files.create({
      file: getFile.asStream(file_path),
      purpose,
    });

    return file;
  }

  public async removeOpenAi(file_id: string) {
    const openai = getOpenai();
    const file = await openai.files.del(file_id);

    return file;
  }
}

export default UploadFileToAi;
