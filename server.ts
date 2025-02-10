/* eslint-disable @typescript-eslint/no-unused-vars */
// filepath: /c:/Users/user/Desktop/BackendNestJs/my-nextjs-app/server.ts
import express, { Request, Response } from 'express';
import next from 'next';
import dotenv from 'dotenv';
import User from '@/models/User';

dotenv.config(); // Load environment variables

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Define your custom API routes here
  server.get('/api/users', async (req: Request, res: Response) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  // Handle all other routes with Next.js
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(3000, (err?: Error) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});