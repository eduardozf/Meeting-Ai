import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import { processError } from '@/shared/utils/error';
import FileConverter from '@/shared/services/FileConverter';
import path from 'path';
import { multerConfig } from '@/config/multer.config';

class ConvertController {
  public async convert(
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const validateSchema = z.object({
      fileName: z.string(),
      format: z.string(),
    });

    try {
      const body = await validateSchema.parseAsync(req.body);

      const converter = new FileConverter();

      const fullPath = path.resolve(multerConfig.path, body.fileName);
      const file = await converter.convertToMp3(fullPath);

      reply.status(200).send(file);
    } catch (error) {
      throw processError(error, 'Failed to convert file');
    }
  }
}

export default ConvertController;
