# Prisma ORM Usage Prompt

When working with Prisma ORM in the 2Click Broker project:

1. Define your schema in `prisma/schema.prisma` using Prisma's schema language.

2. Use `prisma generate` to generate the Prisma Client after schema changes.

3. Use `prisma migrate dev` for creating and applying migrations during development.

4. Create a singleton instance of PrismaClient to be used across your application.

5. Use Prisma's fluent API for querying and mutating data.

6. Leverage Prisma's relations for efficient querying of related data.

7. Use transactions for operations that require multiple database changes.

8. Implement proper error handling for database operations.

9. Use Prisma's pagination options for large datasets.

10. Leverage Prisma's raw SQL execution capabilities when needed for complex queries.

Example of Prisma usage:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getListingsWithBroker(skip: number, take: number) {
  try {
    const listings = await prisma.listing.findMany({
      skip,
      take,
      include: {
        broker: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return listings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}

async function createListingWithTransaction(listingData: CreateListingInput, brokerId: string) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const listing = await tx.listing.create({
        data: {
          ...listingData,
          brokerId,
        },
      });

      await tx.broker.update({
        where: { id: brokerId },
        data: { listingCount: { increment: 1 } },
      });

      return listing;
    });

    return result;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
}
```

Remember to close the Prisma Client when your application shuts down.
