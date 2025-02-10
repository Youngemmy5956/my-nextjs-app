// filepath: /c:/Users/user/Desktop/BackendNestJs/my-nextjs-app/server.ts
import express from 'express';
import next from 'next';
import dotenv from 'dotenv';
import userRoutes from './src/routes/user';

dotenv.config(); // Load environment variables

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Middleware to parse JSON bodies
  server.use(express.json());

  // Use the user routes
  server.use('/api', userRoutes);

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err?: Error) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});