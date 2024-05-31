import GetFileContent from '../upload/GetFileContent';
import WriteFile from '../upload/WriteFIle';
import {
  ChatCompletionCreateParamsBase,
  ChatCompletionMessageParam,
} from 'openai/resources/chat/completions';
import { ThreadCreateParams } from 'openai/resources/beta/threads/threads';
import { getOpenai } from '../../../tools/openai';

type MessageType = {
  content: string;
  role: 'user';
  file_ids?: Array<string>;
  metadata?: unknown | null;
};

type StartChatProps = {
  file_id: string;
  messages: string;
  model: ChatCompletionCreateParamsBase['model'];
};

class ChatMeet {
  public async message({ filename, message, model }: StartChatProps) {
    const openai = getOpenai()
    const getFile = new GetFileContent();
    const writeFile = new WriteFile();

    const path = './tmp';
    const { name } = splitFileName(filename);

    const noFormat = path + '/' + name;
    const input = noFormat + '.txt';
    const output = noFormat + '-price' + '.txt';

    try {
      const assistant = await openai.beta.assistants.create({
        file_ids: [''],
        model,
        name: 'Meet Assistant',
      });

      // const userMessages = messages?.map(
      //   (m: string) => ({ role: 'user', content: m }) as MessageType,
      // );

      const thread = await openai.beta.threads.createAndRunStream({
        assistant_id: assistant.id,
        stream: true
      });

      thread.

      messages: userMessages,


      const content = chat.choices[0].message.content || '';

      writeFile.execute({ path: output, content });

      return chat.choices[0].message.content;
    } catch (err: any) {
      console.log(err.message);
      return { error: err.message };
    }
  }
}

export default ChatMeet;
