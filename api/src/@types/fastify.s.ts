import { type FastifyRequest as FFP } from 'fastify';
import { type File } from 'fastify-multer/src/interfaces';

declare module 'fastify' {
  export interface FastifyRequest extends FFP {
    user: { id: string };
    file?: File;
  }
}
