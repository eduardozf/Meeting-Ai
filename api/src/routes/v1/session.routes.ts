import {
  DoneFuncWithErrOrRes,
  FastifyInstance,
  FastifyPluginOptions,
} from 'fastify';
import SessionController from '../../controllers/session.controller';

const controller = new SessionController();

const sessionRoutes = (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: DoneFuncWithErrOrRes,
) => {
  fastify.post('/login', controller.login);

  fastify.post('/refresh', controller.refresh_token);

  done();
};

export { sessionRoutes };
