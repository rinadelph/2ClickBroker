import { FC, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Listing } from '@/app/manage-listings/page';

interface EditListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
  onEdit: (id: string, updatedListing: Partial<Listing>) => void;
}

const EditListingModal: FC<EditListingModalProps> = ({ isOpen, onClose, listing, onEdit }) => {
  const [property, setProperty] = useState(listing.property);
  const [type, setType] = useState(listing.type);
  const [price, setPrice] = useState(listing.price);
  const [status, setStatus] = useState(listing.status);

  useEffect(() => {
    setProperty(listing.property);
    setType(listing.type);
    setPrice(listing.price);
    setStatus(listing.status);
  }, [listing]);

  const handleSubmit = () => {
    onEdit(listing.id, { property, type, price, status });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Listing</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="property">Property</Label>
            <Input
              id="property"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </div>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditListingModal;