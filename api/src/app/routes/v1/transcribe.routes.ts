import ConvertController from '@/app/controllers/transcribe.controller';
import { type FastifyRegister } from '@/interfaces/IFastify';
const controller = new ConvertController();

const transcribeRoutes: FastifyRegister = (fastify, _options, done) => {
  fastify.post('/', controller.transcribe);
  done();
};
export { transcribeRoutes };
