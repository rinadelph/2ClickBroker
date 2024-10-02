import React from 'react'
import { Listing } from '@/app/manage-listings/page'

interface ListingDetailsProps {
  listing: Listing
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ listing }) => {
  return (
    <div>
      <h1>{listing.title}</h1>
      <p>{listing.description}</p>
      <p>Price: ${listing.price}</p>
      <p>Location: {listing.location}</p>
      <p>Posted by: {listing.user.name || listing.user.email}</p>
    </div>
  )
}

export default ListingDetails