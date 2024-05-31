import multer from 'fastify-multer';
import { type FastifyRegister } from '../../models/fastify';

const storage = multer.diskStorage({
  destination: './storage',
  filename(req, file, callback) {
    // TODO
    console.log({ file });
    // const { name, format } = splitFileName(file?.originalname);

    // if (!name) callback(new Error("Invalid format"), "");

    // const newName = uuid() + "." + format;
    callback(null, file?.originalname);
  },
});

const upload = multer({ storage });

const fileRoutes: FastifyRegister = (fastify, _options, done) => {
  fastify.get('/', () => ({ message: 'TODO' }));

  fastify.register(multer.contentParser);

  fastify.post(
    '/upload',
    { preHandler: upload.single('file') },
    (req, reply) => {
      console.log(req.body);

      return reply.send({ message: 'TODO' });
    },
  );

  done();
};
export { fileRoutes };
