import AppError from '../errors/AppError';

const processError = (error: any, defaultMessage: string) => {
  if (error instanceof AppError) throw new AppError(error.message);
  throw new AppError(defaultMessage);
};

export { processError };
