import React from 'react';
import Link from 'next/link';

const ListingsPage: React.FC = () => {
  // Fetch listings data

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Listings</h1>
      {/* Display listings */}
      <Link href="/listings/create">
        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New Listing
        </a>
      </Link>
    </div>
  );
};

export default ListingsPage;