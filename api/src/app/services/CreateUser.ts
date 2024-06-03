import { type User } from '@prisma/client';
import { db } from '@/infra/database';
import AppError from '@/errors/AppError';
import HashGenerator from '@/shared/services/HashGenerator';

interface NewUserProps {
  name: string;
  email: string;
  password: string;
  image?: string;
}

class CreateUser {
  public async create(userBody: NewUserProps): Promise<Partial<User>> {
    const userExists = await db.user.count({
      where: { email: userBody.email },
    });
    if (userExists) throw new AppError('E-mail already used');

    const hashGenerator = new HashGenerator();
    const passHash = await hashGenerator.hash(userBody.password);

    const user = await db.user.create({
      data: { ...userBody, password: passHash },
    });

    if (!user) throw new AppError('Failed to create user');

    const parsedUser: Partial<typeof user> = user;
    delete parsedUser.password;

    return parsedUser;
  }
}

export default CreateUser;
