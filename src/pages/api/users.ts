import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers } from '../../controllers/userController';
import { logger } from '../../middleware/logger';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getUsers(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default logger(handler);