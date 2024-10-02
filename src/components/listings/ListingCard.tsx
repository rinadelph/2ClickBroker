import React from 'react';
import { Listing } from '@/app/manage-listings/page';

interface ListingCardProps {
  listing: Listing;
  onEdit: () => void;
  onDelete: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onEdit, onDelete }) => {
  return (
    <div className="card">
      <img src={listing.image} alt={listing.address} />
      <div className="card-body">
        <h2>{listing.address}</h2>
        <p>Price: ${listing.price}</p>
        <p>Status: {listing.status}</p>
        <p>Type: {listing.type}</p>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ListingCard;