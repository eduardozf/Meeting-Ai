import ChatController from '@/app/controllers/chat.controller';
import { type FastifyRegister } from '@/interfaces/IFastify';
const controller = new ChatController();

const chatRoutes: FastifyRegister = (fastify, _options, done) => {
  fastify.post('/', controller.ask);
  done();
};
export { chatRoutes };
