# Next.js App Router Prompt

When working with Next.js App Router in the 2Click Broker project:

1. Use the `app/` directory for all routes. Each folder represents a route segment.

2. Create `page.tsx` files within these folders to make them publicly accessible routes.

3. Use `layout.tsx` for shared layouts among multiple pages.

4. Implement dynamic routes using folders with square brackets, e.g., `[id]`.

5. Use `loading.tsx` for loading UI and `error.tsx` for error handling at the page or layout level.

6. Implement route handlers (API routes) using `route.ts` files within the `app/` directory.

7. Use the `useRouter` hook from `next/navigation` for programmatic navigation.

8. Leverage server components by default, and use `'use client'` directive only when necessary for client-side interactivity.

9. Use `Link` component from `next/link` for client-side navigation between pages.

10. Implement middleware in the project root for operations that should run before matching routes.

Example of a dynamic route:

```typescript
// app/listings/[id]/page.tsx
import { notFound } from 'next/navigation';

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await fetchListing(params.id);
  
  if (!listing) {
    notFound();
  }

  return <ListingDetails listing={listing} />;
}
```

Remember to handle loading states and errors appropriately for each route.
