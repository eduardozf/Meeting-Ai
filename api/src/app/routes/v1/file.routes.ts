import { type FastifyRegister } from '@/interfaces/IFastify';
import UploadFile from '@/shared/services/UploadFile';

const fileRoutes: FastifyRegister = (fastify, _options, done) => {
  fastify.get('/', () => ({ message: 'TODO' }));

  fastify.post('/upload', new UploadFile().uploadFile);

  done();
};
export { fileRoutes };
