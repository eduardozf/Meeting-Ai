import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import { processError } from '@/shared/utils/error';
import ChatMeet from '../services/ChatMeet';

class ChatController {
  public async ask(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const validateSchema = z.object({
      id: z.string(),
    });

    try {
      const body = await validateSchema.parseAsync(req.body);

      const chat = new ChatMeet();

      const file = await chat.startChat({
        meetId: body.id,
        messages: 'a',
        model: 'gpt-4o',
      });

      reply.status(200).send(file);
    } catch (error) {
      throw processError(error, 'Failed to convert file');
    }
  }
}

export default ChatController;
