import {
  type FastifyInstance,
  type FastifyPluginOptions,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';

export type FastifyRegister = (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: (err?: Error) => void,
) => void;

export type FastifyMiddleware = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: Error) => void,
) => void;
