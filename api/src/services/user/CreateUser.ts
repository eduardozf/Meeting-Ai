import { db } from '../../database';
import AppError from '../../errors/AppError';
import * as bcrypt from 'bcryptjs';

type NewUserProps = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

class CreateUser {
  public async create(userBody: NewUserProps) {
    const passHash = await bcrypt.hash(userBody.password, 14);

    const user = await db.user.create({
      data: { ...userBody, password: passHash },
    });

    if (!user) throw new AppError('Failed to create user');

    return user;
  }
}

export default CreateUser;
