import Fastify from 'fastify';
import { errorHandler } from '../middleware/errorHandler';
import routes from '../routes';

const server = Fastify({ logger: true });

const port = Number(process.env.PORT) || 3333;

// Register parent error handler
server.setErrorHandler(errorHandler);

server.register(routes);

server.listen({ port }, (err, address) => {
  if (err) {
    console.error('❌ Failed to start:', err.message);
    return process.exit(1);
  }

  console.clear();
  console.log(`✅ Server running on: ${address}`);
});
