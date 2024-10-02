import React from 'react';
import { Listing } from '@/app/manage-listings/page';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (listing: Listing) => void;
}

const AddListingModal: React.FC<AddListingModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [newListing, setNewListing] = React.useState<Listing>({
    id: 0,
    address: '',
    price: 0,
    status: 'Active',
    type: 'Single Family',
    bedrooms: 0,
    bathrooms: 0,
    sqft: 0,
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewListing((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onAdd(newListing);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Listing</h2>
        <input name="address" value={newListing.address} onChange={handleChange} placeholder="Address" />
        <input name="price" value={newListing.price} onChange={handleChange} placeholder="Price" type="number" />
        <input name="status" value={newListing.status} onChange={handleChange} placeholder="Status" />
        <input name="type" value={newListing.type} onChange={handleChange} placeholder="Type" />
        <input name="bedrooms" value={newListing.bedrooms} onChange={handleChange} placeholder="Bedrooms" type="number" />
        <input name="bathrooms" value={newListing.bathrooms} onChange={handleChange} placeholder="Bathrooms" type="number" />
        <input name="sqft" value={newListing.sqft} onChange={handleChange} placeholder="Sqft" type="number" />
        <input name="image" value={newListing.image} onChange={handleChange} placeholder="Image URL" />
        <button onClick={handleSubmit}>Add</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddListingModal;