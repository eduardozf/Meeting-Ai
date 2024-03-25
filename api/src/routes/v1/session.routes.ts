import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import SessionController from '../../controllers/session.controller';

const controller = new SessionController();

const sessionRoutes = (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: (err?: Error) => void,
) => {
  fastify.post('/login', controller.login);

  fastify.post('/refresh', controller.refresh_token);

  fastify.post('/signup', controller.signup);

  done();
};

export { sessionRoutes };
