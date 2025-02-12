import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import User from "../../models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, username } = req.body;
      console.log('Request body:', req.body); // Log the request body
      const newUser = new User({ name, email, username });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any).code === 11000) {
        // Duplicate key error
        res.status(400).json({ error: 'Username already exists' });
      } else {
        console.error('Error creating user:', error); // Log the error
        res.status(500).json({ error: 'Failed to create user' });
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;