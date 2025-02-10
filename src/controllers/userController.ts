import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../models/User';

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

export const getUsers = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(users);
};