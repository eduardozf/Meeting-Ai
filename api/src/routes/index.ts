import {
  DoneFuncWithErrOrRes,
  FastifyInstance,
  FastifyPluginOptions,
} from 'fastify';
import { v1 } from './v1';

const routes = (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: DoneFuncWithErrOrRes,
) => {
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
