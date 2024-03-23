import {
  DoneFuncWithErrOrRes,
  FastifyInstance,
  FastifyPluginOptions,
} from 'fastify';
import UserController from '../../controllers/user.controller';

const controller = new UserController();

const userRoutes = (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: DoneFuncWithErrOrRes,
) => {
  fastify.post('/create', controller.create);

  done();
};

export { userRoutes };
