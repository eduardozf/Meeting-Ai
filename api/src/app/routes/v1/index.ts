import { ensureAuthenticated } from '@/app/middleware/ensureAuthenticated';
import { type FastifyRegister } from '@/interfaces/IFastify';
import { fileRoutes } from './file.routes';
import { sessionRoutes } from './session.routes';
import { userRoutes } from './user.routes';
import { convertRoutes } from './convert.routes';
import { transcribeRoutes } from './transcribe.routes';

const publicRoutes: FastifyRegister = (fastify, _options, done) => {
  fastify.get('/', () => ({ status: '🚀 V1 is running!' }));
  fastify.register(sessionRoutes, { prefix: '/session' });

  done();
};

const privateRoutes: FastifyRegister = (fastify, _options, done) => {
  fastify.addHook('preHandler', ensureAuthenticated);

  fastify.register(userRoutes, { prefix: '/user' });
  fastify.register(fileRoutes, { prefix: '/file' });
  fastify.register(convertRoutes, { prefix: '/convert' });
  fastify.register(transcribeRoutes, { prefix: '/transcribe' });

  done();
};

const v1: FastifyRegister = (fastify, _options, done) => {
  fastify.register(publicRoutes);
  fastify.register(privateRoutes);

  done();
};

export { v1 };
