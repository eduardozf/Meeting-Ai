import UserController from '@/app/controllers/user.controller';
import { type FastifyRegister } from '@/interfaces/IFastify';

const controller = new UserController();

const userRoutes: FastifyRegister = (fastify, _options, done) => {
  fastify.post('/create', controller.create);

  done();
};

export { userRoutes };
