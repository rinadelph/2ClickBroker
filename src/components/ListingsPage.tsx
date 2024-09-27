'use client';

import React from 'react';

interface User {
  name: string | null;
  email: string;
}

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  user: User;
}

interface ListingsPageProps {
  listings: Listing[];
}

const ListingsPage: React.FC<ListingsPageProps> = ({ listings }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Listings</h1>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-bold">{listing.title}</h2>
            <p>{listing.description}</p>
            <p>Price: ${listing.price}</p>
            <p>Location: {listing.location}</p>
            <p>Posted by: {listing.user.name || listing.user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingsPage;