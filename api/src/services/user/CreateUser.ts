import { db } from '../../database';
import AppError from '../../errors/AppError';
import { hash } from '../../utils/bcrypt';

type NewUserProps = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

class CreateUser {
  public async create(userBody: NewUserProps) {
    const userExists = await db.user.count({
      where: { email: userBody.email },
    });
    if (userExists) throw new AppError('E-mail already used');

    const passHash = await hash(userBody.password, 14);

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
