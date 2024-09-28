import React from 'react'
import { Listing } from '@/app/manage-listings/page'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react'

interface ListingCardProps {
  listing: Listing
  onEdit: (listing: Listing) => void
  onDelete: (listing: Listing) => void
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={listing.image} alt={listing.address} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{listing.address}</h3>
        <p className="text-2xl font-bold text-gray-900 mb-2">${listing.price.toLocaleString()}</p>
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            listing.status === 'Active' ? 'bg-green-100 text-green-800' :
            listing.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {listing.status}
          </span>
          <span className="text-sm text-gray-600">{listing.type}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span className="mr-2">{listing.bedrooms} beds</span>
          <span className="mr-2">{listing.bathrooms} baths</span>
          <span>{listing.sqft} sqft</span>
        </div>
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={() => onEdit(listing)}>Edit</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Change Status</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(listing)} className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default ListingCard