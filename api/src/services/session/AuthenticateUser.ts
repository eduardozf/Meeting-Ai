import { db } from '../../database';
import AppError from '../../errors/AppError';
import jwt from 'jsonwebtoken';
import { authConfig } from '../../config/auth.config';
import { type User } from '@prisma/client';
import HashGenerator from '../generator/hash';

interface AuthenticateProps {
  email: string;
  password: string;
}

interface AuthenticateMailResponse {
  user: User;
  token: string;
  refreshToken: string;
}

interface AuthenticateTokenResponse {
  token: string;
  refreshToken: string;
}

class AuthenticateUser {
  public async from_mail_and_password({
    email,
    password,
  }: AuthenticateProps): Promise<AuthenticateMailResponse> {
    const user = await db.user.findFirst({
      where: { email },
    });

    if (!user) throw new AppError('Invalid email or password');

    // Compare password hash
    const hashGenerator = new HashGenerator();
    const passwordMatch = await hashGenerator.compare(password, user.password);
    if (!passwordMatch) throw new AppError('Invalid email or password');

    // Create token and refresh token
    const token = jwt.sign({ id: user?.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.tokenExpiration,
    });
    const refreshToken = jwt.sign({ userId: user?.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.refreshTokenExpiration,
    });

    return { user, token, refreshToken };
  }

  public async from_refresh_token(
    tokenString: string,
  ): Promise<AuthenticateTokenResponse> {
    // Verify if refreshToken already used or invalid
    const invalid = await db.tokenInvalidate.findFirst({
      where: { token: tokenString },
    });

    if (invalid) throw new AppError('Invalid JWT Token');

    // Decode the JWT token and take the userId information
    const decodedToken = jwt.verify(tokenString, authConfig.jwt.secret) as {
      userId: string;
    };

    // TODO verify if refresh token expired

    // Find the user by id
    const user = await db.user.findFirst({
      where: { id: decodedToken.userId },
      select: { id: true },
    });

    if (!user) throw new AppError('Invalid JWT Token');

    // Invalidate token and create new ones
    await db.tokenInvalidate.create({ data: { token: tokenString } });

    const token = jwt.sign({ id: user?.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.tokenExpiration,
    });
    const refreshToken = jwt.sign({ userId: user?.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.refreshTokenExpiration,
    });

    return { token, refreshToken };
  }
}

export default AuthenticateUser;
