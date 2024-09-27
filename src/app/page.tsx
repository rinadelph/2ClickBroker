import React from 'react';
import ListingsPage from '@/components/ListingsPage';
import { getListings } from '@/hooks/use-listings';

export default async function HomePage() {
  try {
    const listings = await getListings();
    return <ListingsPage listings={listings} />;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return <div>Error loading listings. Please try again later.</div>;
  }
}