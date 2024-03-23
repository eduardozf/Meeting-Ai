import { db } from '../../database';
import AppError from '../../errors/AppError';
import jwt from 'jsonwebtoken';
import { jwt_secret_key } from '../../config/jwt';

type AuthenticateProps = { email: string; password: string };

class AuthenticateUser {
  public async from_mail_and_password({ email, password }: AuthenticateProps) {
    const user = await db.user.findFirst({
      where: { email },
    });

    // Compare password hash
    // const passwordMatch = hash.compare()
    // if (!passwordMatch) throw new AppError('Invalid email or password');

    // Create token and refresh token
    const token = jwt.sign({}, jwt_secret_key, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user?.id }, jwt_secret_key, {
      expiresIn: '7d',
    });

    return { user, token, refreshToken };
  }

  public async from_refresh_token(tokenString: string) {
    // Verify if refreshToken already used or invalid
    const invalid = await db.tokenInvalidate.findFirst({
      where: { token: tokenString },
    });

    if (invalid) throw new AppError('Invalid JWT Token');

    // Decode the JWT token and take the userId information
    const decodedToken = jwt.verify(tokenString, jwt_secret_key) as {
      userId: string;
    };

    // Find the user by id
    const user = await db.user.findFirst({
      where: { id: decodedToken.userId },
      select: { id: true },
    });

    if (!user) throw new AppError('Invalid JWT Token');

    // Invalidate token and create new ones
    await db.tokenInvalidate.create({ data: { token: tokenString } });

    const token = jwt.sign({}, jwt_secret_key, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user?.id }, jwt_secret_key, {
      expiresIn: '7d',
    });

    return { token, refreshToken };
  }
}

export default AuthenticateUser;
