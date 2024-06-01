import AppError from '@/errors/AppError';

function processError(error: any, defaultMessage: string): Error {
  if (error instanceof AppError) throw new AppError(error.message);
  throw new AppError(defaultMessage);
}

export { processError };
