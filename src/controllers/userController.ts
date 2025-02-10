// filepath: /c:/Users/user/Desktop/BackendNestJs/my-nextjs-app/src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import dbConnect from '../utils/dbConnect';

export const getUsers = async (req: Request, res: Response) => {
  try {
    await dbConnect();
    const users = await User.find({});
    res.status(200).json(users);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    await dbConnect();
    const { name, email, username } = req.body;
    const newUser = new User({ name, email, username });
    await newUser.save();
    res.status(201).json(newUser);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};