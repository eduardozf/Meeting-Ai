import SessionController from '../../controllers/session.controller';
import { type FastifyRegister } from '../../models/fastify';

const controller = new SessionController();

const sessionRoutes: FastifyRegister = (fastify, _options, done) => {
  fastify.post('/login', controller.login);

  fastify.post('/refresh', controller.refresh_token);

  fastify.post('/signup', controller.signup);

  done();
};

export { sessionRoutes };
