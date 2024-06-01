import { type FastifyRequest } from 'fastify';
import { type File } from 'fastify-multer/src/interfaces';

declare module 'fastify' {
  export interface FastifyRequest {
    user?: { id: string };
  }
}
