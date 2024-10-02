import React from 'react'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'

async function getListings() {
  return await prisma.listing.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      price: true,
      address: true,
      bedrooms: true,
      bathrooms: true,
      squareFootage: true,
      images: true,
    }
  })
}

export default async function ListingsPage() {
  const listings = await getListings()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id}>
            <CardContent className="p-4">
              {listing.images && listing.images.length > 0 && (
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
              <p className="text-gray-600 mb-2">{listing.address}</p>
              <p className="text-lg font-bold mb-2">${listing.price.toLocaleString()}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{listing.bedrooms} beds</span>
                <span>{listing.bathrooms} baths</span>
                <span>{listing.squareFootage} sqft</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}