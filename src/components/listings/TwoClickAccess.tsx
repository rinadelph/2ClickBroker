import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import CommissionInfo from '@/components/listings/CommissionInfo';

interface TwoClickAccessProps {
  listingId: number;
}

const TwoClickAccess: React.FC<TwoClickAccessProps> = ({ listingId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commission, setCommission] = useState<{ id: number; amount: number; listingId: number } | null>(null);

  const handleFirstClick = () => {
    // Generate token and associate it with the listing and user
    // Redirect to the commission info page with the token
    setIsModalOpen(true);
  };

  const handleSecondClick = async () => {
    // Verify the token and fetch the commission info
    const response = await fetch(`/api/commission/${listingId}`);
    const data = await response.json();
    setCommission(data);
  };

  return (
    <div>
      <Button onClick={handleFirstClick}>View Commission Info</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {commission ? (
          <CommissionInfo commission={commission} />
        ) : (
          <div>
            <p>Click the button below to view the commission information.</p>
            <Button onClick={handleSecondClick}>Reveal Commission</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TwoClickAccess;