"use client";

import React, { useState } from 'react';
import { Listing } from '@/app/manage-listings/page';
import { Button, Input, Textarea } from '@/components/ui';

interface ListingFormProps {
  onSubmit: (listing: Listing) => void;
  initialData?: Listing;
}

const ListingForm: React.FC<ListingFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price || 0);
  const [location, setLocation] = useState(initialData?.location || '');

  const handleSubmit = () => {
    onSubmit({ title, description, price, location } as Listing);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <Input value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} placeholder="Price" type="number" />
      <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ListingForm;