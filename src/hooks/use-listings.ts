import { prisma } from '@/lib/prisma';

export async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return listings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw new Error('Failed to fetch listings. Please check your database connection.');
  }
}