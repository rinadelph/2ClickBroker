'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Listings</h1>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
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