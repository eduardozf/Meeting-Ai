import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import CreateUser from '../services/user/CreateUser';
import { processError } from '@/shared/utils/error';

class UserController {
  public async create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
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

      reply.status(200).send(response);
    } catch (error) {
      processError(error, 'Failed to create user');
    }
  }
}

export default UserController;
