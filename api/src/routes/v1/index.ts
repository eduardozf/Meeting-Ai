import {
  DoneFuncWithErrOrRes,
  FastifyInstance,
  FastifyPluginOptions,
} from 'fastify';
import { sessionRoutes } from './session.routes';
import { userRoutes } from './user.routes';

const v1 = (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: DoneFuncWithErrOrRes,
) => {
  fastify.get('/', () => ({ status: '🚀 V1 is running!' }));

  fastify.register(sessionRoutes, { prefix: '/session' });
  fastify.register(userRoutes, { prefix: '/user' });

  done();
};

export { v1 };
