import React from 'react'
import { Listing } from '@/app/manage-listings/page'
import { Button } from "@/components/ui/button"

interface ListingTableProps {
  listings: Listing[]
  onEdit: (listing: Listing) => void
  onDelete: (listing: Listing) => void
}

const ListingTable: React.FC<ListingTableProps> = ({ listings, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {listings.map((listing) => (
            <tr key={listing.id}>
              <td className="px-6 py-4 whitespace-nowrap">{listing.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">${listing.price.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  listing.status === 'Active' ? 'bg-green-100 text-green-800' :
                  listing.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {listing.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{listing.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button variant="ghost" size="sm" onClick={() => onEdit(listing)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(listing)} className="text-red-600">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListingTable