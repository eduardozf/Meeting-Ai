import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import AuthenticateUser from '../services/session/AuthenticateUser';

class SessionController {
  public async login(
    req: FastifyRequest,
    reply: FastifyReply,
    done: DoneFuncWithErrOrRes,
  ) {
    const validateSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    try {
      const body = await validateSchema.parseAsync(req.body);

      const auth = new AuthenticateUser();
      const response = await auth.from_mail_and_password(body);

      reply.status(200).json(response);
    } catch (error) {
      if (error instanceof Error) done(error);
    }
  }
}

export default SessionController;
