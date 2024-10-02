import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Seed users
    const user1 = await prisma.user.create({
      data: {
        email: 'user1@example.com',
        name: 'User One',
        role: 'user', // Ensure this property is defined in the type
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: 'user2@example.com',
        name: 'User Two',
        role: 'admin',
      },
    });

    // Seed listings
    const listing1 = await prisma.listing.create({
      data: {
        title: 'Beautiful House',
        description: 'A lovely family home',
        price: 250000,
        location: 'New York',
        status: 'active',
        userId: user1.id,
        locations: {
          create: {
            latitude: 40.7128,
            longitude: -74.0060,
            address: '123 Main St, New York, NY 10001',
          },
        },
      },
    });

    const listing2 = await prisma.listing.create({
      data: {
        title: 'Cozy Apartment',
        description: 'Perfect for young professionals',
        price: 150000,
        location: 'San Francisco',
        status: 'active',
        userId: user2.id,
        locations: {
          create: {
            latitude: 37.7749,
            longitude: -122.4194,
            address: '456 Market St, San Francisco, CA 94103',
          },
        },
      },
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();