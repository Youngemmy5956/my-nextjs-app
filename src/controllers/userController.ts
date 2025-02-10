// filepath: /c:/Users/user/Desktop/BackendNestJs/my-nextjs-app/src/controllers/userController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../models/User';
import dbConnect from '../utils/dbConnect';

export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const users = await User.find({});
    res.status(200).json(users);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const { name, email, username } = req.body; // Include username in the request body
    const newUser = new User({ name, email, username });
    await newUser.save();
    res.status(201).json(newUser);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};