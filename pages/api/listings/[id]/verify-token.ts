import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const listingId = req.query.id as string;
  const { token } = req.body;

  try {
    const accessToken = await prisma.accessToken.findFirst({
      where: {
        token,
        listingId,
        expiresAt: { gte: new Date() },
      },
      include: {
        listing: {
          select: {
            commissionType: true,
            commissionValue: true,
          },
        },
      },
    });

    if (!accessToken) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    res.status(200).json({
      commissionType: accessToken.listing.commissionType,
      commissionValue: accessToken.listing.commissionValue,
    });
  } catch (error) {
    console.error('Error verifying access token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}