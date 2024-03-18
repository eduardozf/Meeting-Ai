import {
  DoneFuncWithErrOrRes,
  FastifyInstance,
  FastifyPluginOptions,
} from 'fastify';

const v1 = (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: DoneFuncWithErrOrRes,
) => {
  fastify.get('/', () => ({ status: '🚀 V1 is running!' }));

  // TODO Routes

  done();
};

export { v1 };
