import { type FastifyRequest as FFR } from 'fastify';
import { type File } from 'fastify-multer/src/interfaces';

declare module 'fastify' {
  export interface FastifyRequest extends FFR {
    user?: { id: string };
    file?: File;
  }
}
