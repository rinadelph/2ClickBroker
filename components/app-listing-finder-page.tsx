'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import * as turf from '@turf/turf'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Menu } from 'lucide-react'

// Mock data for listings
const mockListings = [
  { id: 1, lat: 40.7128, lng: -74.0060, price: 500000, address: "123 Broadway, New York, NY 10007" },
  { id: 2, lat: 40.7282, lng: -73.7949, price: 450000, address: "456 Main St, Flushing, NY 11355" },
  { id: 3, lat: 40.6782, lng: -73.9442, price: 600000, address: "789 Atlantic Ave, Brooklyn, NY 11238" },
  { id: 4, lat: 40.7589, lng: -73.9851, price: 800000, address: "321 5th Ave, New York, NY 10016" },
  { id: 5, lat: 40.7549, lng: -73.9840, price: 750000, address: "555 Madison Ave, New York, NY 10022" },
]

export function Page() {
  const [viewport, setViewport] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 10
  })
  const [searchZip, setSearchZip] = useState("")
  const [visibleListings, setVisibleListings] = useState(mockListings)
  const [selectedListing, setSelectedListing] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const updateVisibleListings = useCallback(() => {
    const bounds = [
      [viewport.longitude - 0.1, viewport.latitude - 0.1],
      [viewport.longitude + 0.1, viewport.latitude + 0.1]
    ]
    const visibleOnes = mockListings.filter(listing => 
      turf.booleanPointInPolygon(
        turf.point([listing.lng, listing.lat]),
        turf.bboxPolygon(bounds.flat())
      )
    )
    setVisibleListings(visibleOnes)
  }, [viewport])

  useEffect(() => {
    updateVisibleListings()
  }, [viewport, updateVisibleListings])

  const handleZipSearch = () => {
    // In a real application, you would call an API to get the lat/lng for the zip code
    // For this example, we'll just set a fixed point
    setViewport({
      latitude: 40.7128,
      longitude: -74.0060,
      zoom: 12
    })
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">2Click Broker: Listing Finder</h1>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className={`w-80 bg-white p-4 overflow-y-auto transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex mb-4">
            <Input
              type="text"
              placeholder="Enter ZIP code"
              value={searchZip}
              onChange={(e) => setSearchZip(e.target.value)}
              className="mr-2"
            />
            <Button onClick={handleZipSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          <div className="space-y-4">
            {visibleListings.map(listing => (
              <Card key={listing.id} className="cursor-pointer hover:shadow-md transition-shadow duration-200" onClick={() => setSelectedListing(listing)}>
                <CardHeader>
                  <CardTitle>${listing.price.toLocaleString()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{listing.address}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </aside>
        <main className="flex-1 relative">
          <Map
            {...viewport}
            onMove={evt => setViewport(evt.viewState)}
            style={{width: '100%', height: '100%'}}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          >
            {visibleListings.map(listing => (
              <Marker
                key={listing.id}
                latitude={listing.lat}
                longitude={listing.lng}
                onClick={(e) => {
                  e.originalEvent.stopPropagation()
                  setSelectedListing(listing)
                }}
              >
                <MapPin className="text-red-500 h-6 w-6" />
              </Marker>
            ))}
            {selectedListing && (
              <Popup
                latitude={selectedListing.lat}
                longitude={selectedListing.lng}
                onClose={() => setSelectedListing(null)}
                closeOnClick={false}
                anchor="bottom"
              >
                <div className="p-2">
                  <h3 className="font-bold">${selectedListing.price.toLocaleString()}</h3>
                  <p>{selectedListing.address}</p>
                  <Button className="mt-2 w-full" size="sm">View Details</Button>
                </div>
              </Popup>
            )}
          </Map>
        </main>
      </div>
    </div>
  )
}