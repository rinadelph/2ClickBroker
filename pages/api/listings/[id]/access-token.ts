import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateAccessToken } from '@/lib/generateAccessToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const listingId = req.query.id as string;

  const token = generateAccessToken();

  await prisma.accessToken.create({
    data: {
      token,
      listingId,
      userId: session.user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Token expires in 24 hours
    },
  });

  res.status(200).json({ token });
}