"use client";

import React from 'react';
import ListingForm from '@/components/listings/ListingForm';

const CreateListingPage: React.FC = () => {
  const handleSubmit = async (listing: {
    title: string;
    description: string;
    price: number;
    location: string;
  }) => {
    // Send POST request to create a new listing
    const response = await fetch('/api/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listing),
    });

    if (response.ok) {
      // Redirect to listings page
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Listing</h1>
      <ListingForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateListingPage;