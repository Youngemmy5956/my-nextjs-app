// filepath: /c:/Users/user/Desktop/BackendNestJs/my-nextjs-app/src/pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers, createUser } from '../../controllers/userController';
import { logger } from '../../middleware/logger';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getUsers(req, res);
  } else if (req.method === 'POST') {
    await createUser(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default logger(handler);