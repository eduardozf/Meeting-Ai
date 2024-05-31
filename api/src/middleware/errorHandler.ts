import {
  type FastifyError,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';
import AppError from '../errors/AppError';

const errorHandler = (
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
): FastifyReply => {
  if (error instanceof AppError) {
    const { message, statusCode } = error;
    return reply
      .status(statusCode)
      .send({ type: 'error', message, statusCode });
  }

  console.error(error.message);

  return reply.status(500).send({
    type: 'error',
    message: 'Internal Server Error!',
    statusCode: 500,
  });
};

export { errorHandler };
