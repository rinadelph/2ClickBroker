import React from 'react'
import { Listing } from '@/app/manage-listings/page'

interface ListingTableProps {
  listings: Listing[]
  onEdit: (listing: Listing) => void
  onDelete: (listing: Listing) => void
}

const ListingTable: React.FC<ListingTableProps> = ({ listings, onEdit, onDelete }) => {
  return (
    <table>
      {/* Implement your table here */}
    </table>
  )
}

export default ListingTable