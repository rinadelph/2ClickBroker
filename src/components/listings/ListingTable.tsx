import React from 'react';
import { Listing } from '@/app/manage-listings/page';

interface ListingTableProps {
  listings: Listing[];
  onEdit: (listing: Listing) => void;
  onDelete: (listing: Listing) => void;
}

const ListingTable: React.FC<ListingTableProps> = ({ listings, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Address</th>
          <th>Price</th>
          <th>Status</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {listings.map((listing) => (
          <tr key={listing.id}>
            <td>{listing.address}</td>
            <td>{listing.price}</td>
            <td>{listing.status}</td>
            <td>{listing.type}</td>
            <td>
              <button onClick={() => onEdit(listing)}>Edit</button>
              <button onClick={() => onDelete(listing)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListingTable;