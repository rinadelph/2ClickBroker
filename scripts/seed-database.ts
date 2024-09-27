import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      name: 'John Doe',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      name: 'Jane Smith',
    },
  });

  // Create sample listings
  await prisma.listing.create({
    data: {
      title: 'Cozy Apartment',
      description: 'A cozy apartment in the heart of the city',
      price: 1000,
      location: 'New York',
      userId: user1.id,
    },
  });

  await prisma.listing.create({
    data: {
      title: 'Spacious House',
      description: 'A spacious house with a beautiful garden',
      price: 2500,
      location: 'Los Angeles',
      userId: user2.id,
    },
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });