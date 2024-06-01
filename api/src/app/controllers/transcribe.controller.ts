import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import { processError } from '@/shared/utils/error';
import TranscriberService from '../services/transcriber/TranscriberService';

class TranscribeController {
  public async transcribe(
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const validateSchema = z.object({ id: z.string() });

    try {
      const body = await validateSchema.parseAsync(req.body);

      const transcriber = new TranscriberService();
      const transcription = await transcriber.transcribeFile(body.id);

      reply.status(200).send(transcription);
    } catch (error) {
      console.trace(error);
      throw processError(error, 'Failed to transcribe file');
    }
  }
}

export default TranscribeController;
