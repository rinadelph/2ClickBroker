import React from 'react';
import { notFound } from 'next/navigation';
import ListingDetails from '@/components/listings/ListingDetails';
import TwoClickAccess from '@/components/listings/TwoClickAccess';

interface ListingPageProps {
  params: {
    id: string;
  };
}

const ListingPage: React.FC<ListingPageProps> = ({ params }) => {
  const [listing, setListing] = React.useState(null);

  React.useEffect(() => {
    const fetchListing = async () => {
      const response = await fetch(`/api/listings/${params.id}`);
      const data = await response.json();
      setListing(data);
    };

    fetchListing();
  }, [params.id]);

  if (!listing) {
    notFound();
  }

  return (
    <div>
      <ListingDetails listing={listing} />
      <TwoClickAccess listingId={listing.id} />
    </div>
  );
};

export default ListingPage;