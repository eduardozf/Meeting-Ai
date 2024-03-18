import Fastify from 'fastify';
import routes from '../routes';

const server = Fastify({ logger: true });

const port = Number(process.env.PORT) || 3333;

server.register(routes);

server.listen({ port }, (err, address) => {
  if (err) {
    console.error('❌ Failed to start:', err.message);
    return process.exit(1);
  }

  console.clear();
  console.log(`✅ Server running on: ${address}`);
});
