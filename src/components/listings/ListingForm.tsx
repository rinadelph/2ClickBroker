import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface ListingFormProps {
  onSubmit: (listing: { title: string; description: string; price: number; location: string }) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, price: Number(price), location });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Input label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <Button>Submit</Button>
    </form>
  );
};

export default ListingForm;