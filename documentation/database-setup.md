# Database Setup and Seeding

## Prisma Schema

The Prisma schema is defined in `2click-broker-lms/prisma/schema.prisma`. It includes models for User, Listing, Commission, Subscription, and other related entities.

Key points:
- The `User` model includes fields for email, name, role, and timestamps.
- The `Listing` model is associated with a User and includes fields for title, description, price, and status.

## Updating the Schema

If you need to update the Prisma schema:

1. Modify the `2click-broker-lms/prisma/schema.prisma` file.
2. Run `npx prisma generate` to update the Prisma client.
3. Run `npx prisma db push` to update the database schema (for development).
4. Update the seeding script if necessary to match the new schema.
5. Re-run the seeding script if needed.

## Seeding the Database

The database seeding script is located at `2click-broker-lms/scripts/seed-database.ts`. This script creates initial data for development and testing purposes.

To run the seeding script:

1. Ensure your database connection is set up correctly in the `.env` file.
2. Run the following command:

   ```bash
   npm run seed
   ```

   This command should be defined in `package.json` to run the seed script using ts-node.

3. The script will create sample users and listings. You can modify the script to add more data as needed.

Remember to keep the seeding script in sync with any changes made to the Prisma schema to avoid type errors during the build process.

## Common Issues and Solutions

- If you encounter type errors related to unknown properties in the seed script, ensure that the properties you're trying to set match the fields defined in your Prisma schema.
- When creating related data (e.g., a Listing for a User), use the appropriate create or connect syntax as defined by Prisma.