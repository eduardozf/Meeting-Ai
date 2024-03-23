import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import CreateUser from '../services/user/CreateUser';

class UserController {
  public async create(
    req: FastifyRequest,
    reply: FastifyReply,
    done: DoneFuncWithErrOrRes,
  ) {
    const validateSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      image: z.string().optional(),
    });

    try {
      const body = await validateSchema.parseAsync(req.body);

      const createUser = new CreateUser();
      const response = await createUser.create(body);

      reply.status(200).json(response);
    } catch (error) {
      if (error instanceof Error) done(error);
    }
  }
}

export default UserController;
