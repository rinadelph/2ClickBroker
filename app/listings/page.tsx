import React from 'react'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from "@/components/ui/card"

async function getListings() {
  return await prisma.listing.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      price: true,
      description: true,
      location: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      user: true,
      commissions: true,
      Location: true,
    }
  });
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
              <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
              <p className="text-gray-600 mb-2">{listing.location}</p>
              <p className="text-lg font-bold mb-2">${listing.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{listing.description}</p>
              <p className="text-sm text-gray-500 mt-2">Status: {listing.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}