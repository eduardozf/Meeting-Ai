import UserController from '../../controllers/user.controller';
import { FastifyRegister } from '../../models/fastify';

const controller = new UserController();

const userRoutes: FastifyRegister = (fastify, _options, done) => {
  fastify.post('/create', controller.create);

  done();
};

export { userRoutes };
