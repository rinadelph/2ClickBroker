import React from 'react';

interface ListingDetailsProps {
  listing: {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
  };
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ listing }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{listing.title}</h2>
      <p className="mb-4">{listing.description}</p>
      <p className="mb-4">Price: ${listing.price}</p>
      <p>Location: {listing.location}</p>
    </div>
  );
};

export default ListingDetails;