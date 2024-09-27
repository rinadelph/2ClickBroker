# API Route Handling Prompt

When implementing API routes in the 2Click Broker project:

1. Use the `app/api` directory for all API routes.

2. Implement route handlers using `route.ts` files.

3. Export functions named after HTTP methods (GET, POST, PUT, DELETE, etc.).

4. Use strong typing for request and response data.

5. Implement proper error handling and return appropriate HTTP status codes.

6. Use middleware for common operations like authentication across multiple routes.

7. Validate input data before processing.

8. Use try-catch blocks to handle potential errors in asynchronous operations.

9. Implement rate limiting for public-facing APIs.

10. Use environment variables for sensitive information like API keys.

Example of an API route:

```typescript
// app/api/listings/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const listingSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  price: z.number().positive(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = listingSchema.parse(body);

    const newListing = await prisma.listing.create({
      data: validatedData,
    });

    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

Remember to handle CORS if necessary and implement authentication/authorization checks where appropriate.
