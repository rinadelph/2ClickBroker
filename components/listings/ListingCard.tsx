import React from 'react'
import { Listing } from '@/app/manage-listings/page'

interface ListingCardProps {
  listing: Listing
  onEdit: (listing: Listing) => void
  onDelete: (listing: Listing) => void
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onEdit, onDelete }) => {
  return (
    <div>
      {/* Implement your card here */}
    </div>
  )
}

export default ListingCard