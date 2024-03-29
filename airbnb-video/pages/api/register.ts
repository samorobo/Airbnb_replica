// pages/api/register.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Handle the registration logic here
      const userData = req.body; // User data sent from the frontend
      // Save user data to the database or perform other actions

      // Send a success response
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      // Handle errors
      console.error('Registration failed:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  } else {
    // Return a 405 Method Not Allowed error if the request method is not POST
    res.status(405).end();
  }
}
