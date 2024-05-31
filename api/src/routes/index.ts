import { v1 } from './v1';

import cors from '@fastify/cors';
import { type FastifyRegister } from '../models/fastify';

const routes: FastifyRegister = (fastify, _options, done) => {
  fastify.register(cors);
  fastify.register(v1, { prefix: '/v1' });

  //
  // 404 Route
  //

  fastify.get('*', (_req, res) =>
    res.status(404).send({ error: { message: 'Not found', statusCode: 404 } }),
  );

  done();
};

export default routes;
