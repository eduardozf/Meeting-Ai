import multer from 'fastify-multer';
import { type FastifyRegister } from '@/interfaces/IFastify';
import UploadFile from '../../services/UploadFileService';

const fileRoutes: FastifyRegister = (fastify, _options, done) => {
  fastify.get('/', () => ({ message: 'TODO' }));

  fastify.register(multer.contentParser);

  fastify.post('/upload', async (req, rep) => {
    await new UploadFile().uploadFile(req, rep);
  });

  done();
};
export { fileRoutes };
