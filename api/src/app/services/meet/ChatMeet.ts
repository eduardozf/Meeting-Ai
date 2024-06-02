import { type ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';
import { getOpenAi } from '@/shared/utils/openai';
import { createReadStream } from 'fs';
import path from 'path';
import { multerConfig } from '@/config/multer.config';
import { type FileObject } from 'openai/resources';
import { processError } from '@/shared/utils/error';
import type OpenAI from 'openai';
import {
  type TextContentBlock,
  type Message,
} from 'openai/resources/beta/threads/messages';
import { type Thread } from 'openai/resources/beta/threads/threads';
import { type AssistantsPage } from 'openai/resources/beta/assistants';
import { type Run } from 'openai/resources/beta/threads/runs/runs';

// interface MessageType {
//   content: string;
//   role: 'user';
//   file_ids?: string[];
//   metadata?: unknown | null;
// }

interface StartChatProps {
  meetId: string;
  messages: string;
  model: ChatCompletionCreateParamsBase['model'];
}

interface IRawMessage {
  id: string;
  role: 'user' | 'assistant';
  message: string;
}

type vectorFileId = string;

class ChatMeet {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = getOpenAi();
  }

  private async fileToVector(meetId: string): Promise<vectorFileId> {
    // Get file as stream
    const filename = `${meetId}.txt`;
    const fullPath = path.resolve(multerConfig.path, filename);
    const file = createReadStream(fullPath);

    // Create a OpenAi Vector of the file
    const vectorStore = await this.openai.beta.vectorStores.create({
      name: `Transcrição - ${meetId}`,
    });
    this.openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
      files: [file],
    });

    return vectorStore.id;
  }

  private async getOpenAiFiles(): Promise<FileObject[]> {
    const files = await this.openai.files.list(undefined, {});

    return files?.data;
  }

  private async getOpenAiAssistants(): Promise<AssistantsPage> {
    const assistants = await this.openai.beta.assistants.list();

    return assistants;
  }

  private async createThread(): Promise<Thread> {
    const thread = await this.openai.beta.threads.create();

    return thread;
  }

  private async addMessage(
    threadId: string,
    message: string,
  ): Promise<Message> {
    const newMessage = this.openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message,
    });

    return await newMessage;
  }

  private async runThread(threadId: string, assistantId: string): Promise<Run> {
    const run = await this.openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: assistantId,
    });

    return run;
  }

  private async getThreadMessages(
    threadId: string,
    runId?: string,
  ): Promise<Message[]> {
    const fromRun = runId ? { run_id: runId } : undefined;

    const messages = await this.openai.beta.threads.messages.list(
      threadId,
      fromRun,
    );

    return messages?.data?.reverse();
  }

  private getRawMessages(messages: Message[]): IRawMessage[] {
    const rawMessages = messages.map(apiMessage => {
      const findMessageText = apiMessage.content.find(
        it => it.type === 'text',
      ) as TextContentBlock;

      const message: IRawMessage = {
        id: apiMessage.id,
        role: apiMessage.role,
        message: findMessageText?.text?.value,
      };

      return message;
    });

    return rawMessages;
  }

  public async startChat({
    meetId,
    messages,
    model,
  }: StartChatProps): Promise<any> {
    try {
      const vectorId = await this.fileToVector(meetId);
      console.log(vectorId);

      // Arquivo teste
      // const vectorId = 'vs_2W3rvfkvwSOuu7CHqnzxWqeM';
      // const assistant = { id: 'asst_1fSowuVrDmMHaPihMKm6QuWO' };
      // const thread = { id: 'thread_rCbbR6rfhet449ot5x9m4nfs' };

      // Adventures
      // const vectorId = 'vs_QBHo7C1wSxiEBiKMYasb5nwy';
      // const assistant = { id: 'asst_Z4z2t1C9FszpovD3ws39cqva' };
      // const thread = { id: 'thread_znL3g74eMzBhB60EZQMDyhZ2' };

      const assistant = await this.openai.beta.assistants.create({
        tool_resources: {
          file_search: { vector_store_ids: [vectorId] },
        },
        model: 'gpt-4o',
        name: meetId,
        tools: [{ type: 'file_search' }],
      });
      console.log(assistant?.id);

      const thread = await this.createThread();
      console.log(thread?.id);

      await this.addMessage(
        thread.id,
        'Poderia me dar um resumo do que se trata a transcrição de reunião no arquivo?',
      );
      const run = await this.runThread(thread.id, assistant.id);

      // return await this.openai.beta.assistants.retrieve(assistant.id);

      // return await this.openai.beta.threads.retrieve(thread.id);

      // const mm = await this.getThreadMessages(thread.id, run.id);
      // const data = this.getRawMessages(mm);

      const data = await this.getThreadMessages(thread.id, run.id);

      return data;
    } catch (error) {
      console.trace(error);
      throw processError(error, 'Failed to create new OpenAi Chat');
    }
  }
}

export default ChatMeet;
