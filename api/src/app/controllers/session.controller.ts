import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import AuthenticateUser from '../services/session/AuthenticateUser';
import CreateUser from '../services/user/CreateUser';
import { processError } from '@/shared/utils/error';

class SessionController {
  public async login(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const validateSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    try {
      const body = await validateSchema.parseAsync(req.body);

      const auth = new AuthenticateUser();
      const response = await auth.from_mail_and_password(body);

      reply.status(200).send(response);
    } catch (error) {
      throw processError(error, 'Failed to login');
    }
  }

  public async refresh_token(
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const validateSchema = z.object({
      refreshToken: z.string(),
    });

    try {
      const body = await validateSchema.parseAsync(req.body);

      const auth = new AuthenticateUser();
      const response = await auth.from_refresh_token(body.refreshToken);

      reply.status(200).send(response);
    } catch (error) {
      throw processError(error, 'Failed to refresh token');
    }
  }

  public async signup(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const validateSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    try {
      const body = await validateSchema.parseAsync(req.body);

      const user = new CreateUser();
      const response = await user.create(body);

      reply.status(200).send(response);
    } catch (error) {
      throw processError(error, 'Failed to create user');
    }
  }
}

export default SessionController;
