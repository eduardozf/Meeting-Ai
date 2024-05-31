import { authConfig } from '../config/auth.config';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { type FastifyMiddleware } from '../models/fastify';

const ensureAuthenticated: FastifyMiddleware = (request, reply, done) => {
  const authHeader = request?.headers?.authorization;

  if (!authHeader) throw new AppError('Invalid JWT token', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded: any = jwt.verify(token, authConfig.jwt.secret);

    const { id } = decoded;

    if (!id) throw new AppError('Invalid JWT token', 401);

    request.user = { id };
    done();
  } catch (err) {
    reply.code(401).send(new AppError('Invalid JWT token'));
  }
};

export { ensureAuthenticated };
