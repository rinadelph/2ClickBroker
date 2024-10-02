import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Seed users
    const user1 = await prisma.user.create({
      data: {
        email: 'user1@example.com',
        name: 'User One',
        role: 'user',
      },
    });

    // Create a listing
    const listing = await prisma.listing.create({
      data: {
        title: 'Beautiful House',
        description: 'A lovely family home',
        price: 250000,
        bedrooms: 3,
        bathrooms: 2,
        squareFootage: 2000,
        address: '123 Main St, Anytown, USA',
        primaryType: 'residential',
        specificType: 'single-family',
        characteristics: ['new-construction', 'for-sale'],
        images: ['/uploads/house1.jpg'],
        userId: user1.id,
      },
    });

    console.log('Database seeded successfully');
    console.log({ user: user1, listing });
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });