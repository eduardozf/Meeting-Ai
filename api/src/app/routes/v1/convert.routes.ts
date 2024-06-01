import ConvertController from '@/app/controllers/convert.controller';
import { type FastifyRegister } from '@/interfaces/IFastify';
const controller = new ConvertController();

const convertRoutes: FastifyRegister = (fastify, _options, done) => {
  fastify.post('/', controller.convert);
  done();
};
export { convertRoutes };
