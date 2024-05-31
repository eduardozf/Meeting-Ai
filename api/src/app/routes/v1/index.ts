import { ensureAuthenticated } from '../../middleware/ensureAuthenticated';
import { type FastifyRegister } from '../../../interfaces/IFastify';
import { fileRoutes } from './file.routes';
import { sessionRoutes } from './session.routes';
import { userRoutes } from './user.routes';

const publicRoutes: FastifyRegister = (fastify, _options, done) => {
  fastify.get('/', () => ({ status: '🚀 V1 is running!' }));
  fastify.register(sessionRoutes, { prefix: '/session' });

  done();
};

const privateRoutes: FastifyRegister = (fastify, _options, done) => {
  fastify.addHook('preHandler', ensureAuthenticated);

  fastify.register(userRoutes, { prefix: '/user' });
  fastify.register(fileRoutes, { prefix: '/file' });

  done();
};

const v1: FastifyRegister = (fastify, _options, done) => {
  fastify.register(publicRoutes);
  fastify.register(privateRoutes);

  done();
};

export { v1 };
