'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import * as turf from '@turf/turf'
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Slider } from "@/components/ui/Slider"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Checkbox } from "@/components/ui/Checkbox"
import { Home, MapPin, BarChart, FileText, Settings, Search, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'

// Expanded mock data for listings
const mockListings = [
  { id: 1, lat: 40.7128, lng: -74.0060, price: 500000, address: "123 Broadway, New York, NY 10007", type: "Single Family" },
  { id: 2, lat: 40.7282, lng: -73.7949, price: 2500, address: "456 Main St, Flushing, NY 11355", type: "Apartment" },
  { id: 3, lat: 40.6782, lng: -73.9442, price: 600000, address: "789 Atlantic Ave, Brooklyn, NY 11238", type: "Commercial" },
  { id: 4, lat: 40.7589, lng: -73.9851, price: 3500, address: "321 5th Ave, New York, NY 10016", type: "Condominium" },
  { id: 5, lat: 40.7549, lng: -73.9840, price: 750000, address: "555 Madison Ave, New York, NY 10022", type: "Multi-Family" },
  { id: 6, lat: 40.7831, lng: -73.9712, price: 450000, address: "789 Park Ave, New York, NY 10021", type: "Cooperative" },
  { id: 7, lat: 40.7484, lng: -73.9857, price: 550000, address: "234 E 34th St, New York, NY 10016", type: "Townhome" },
  { id: 8, lat: 40.6782, lng: -74.0059, price: 200000, address: "567 Bay St, Staten Island, NY 10304", type: "Mobile Home" },
  { id: 9, lat: 40.8224, lng: -73.9496, price: 1200000, address: "890 Riverside Dr, New York, NY 10032", type: "Farm" },
  { id: 10, lat: 40.7614, lng: -73.9776, price: 300000, address: "123 E 57th St, New York, NY 10022", type: "Lot/Land" },
  { id: 11, lat: 40.7505, lng: -73.9934, price: 100000, address: "456 W 34th St, New York, NY 10001", type: "Timeshare" },
  { id: 12, lat: 40.7023, lng: -74.0164, price: 250000, address: "789 South St, New York, NY 10038", type: "Boat Dock" },
  { id: 13, lat: 40.7587, lng: -73.9787, price: 2000000, address: "321 Lexington Ave, New York, NY 10016", type: "Residential Income" },
  { id: 14, lat: 40.7308, lng: -73.9973, price: 1500000, address: "555 Broadway, New York, NY 10012", type: "Other" },
]

const propertyTypes = [
  { value: "all", label: "All Types" },
  { value: "residential", label: "All Residential", subTypes: [
    { value: "single-family", label: "Single Family" },
    { value: "condominium", label: "Condominium" },
    { value: "cooperative", label: "Cooperative" },
    { value: "townhome", label: "Townhome" },
    { value: "mobile-home", label: "Mobile Home" },
    { value: "apartment", label: "Apartment" },
    { value: "multi-family", label: "Multi-Family" },
  ]},
  { value: "farm", label: "Farm" },
  { value: "lot-land", label: "Lot/Land" },
  { value: "timeshare", label: "Timeshare" },
  { value: "boat-dock", label: "Boat Dock" },
  { value: "commercial", label: "Commercial" },
  { value: "residential-income", label: "Residential Income" },
  { value: "other", label: "Other" },
]

export default function ListingFinder() {
  const [viewport, setViewport] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 12
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleListings, setVisibleListings] = useState(mockListings)
  const [selectedListing, setSelectedListing] = useState(null)
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState(new Set(["all"]))
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [showSubTypes, setShowSubTypes] = useState(false)

  const updateVisibleListings = useCallback(() => {
    const filtered = mockListings.filter(listing => {
      const inPriceRange = listing.price >= priceRange[0] && listing.price <= priceRange[1]
      const matchesPropertyType = selectedPropertyTypes.has("all") || selectedPropertyTypes.has(listing.type.toLowerCase().replace(" ", "-"))
      const matchesSearch = listing.address.toLowerCase().includes(searchQuery.toLowerCase())

      return inPriceRange && matchesPropertyType && matchesSearch
    })

    setVisibleListings(filtered)
  }, [selectedPropertyTypes, priceRange, searchQuery])

  useEffect(() => {
    updateVisibleListings()
  }, [updateVisibleListings])

  const handlePropertyTypeChange = (type) => {
    setSelectedPropertyTypes(prev => {
      const newSet = new Set(prev)
      if (type === "all") {
        if (newSet.has("all")) {
          newSet.clear()
        } else {
          newSet.clear()
          newSet.add("all")
        }
      } else {
        if (newSet.has(type)) {
          newSet.delete(type)
        } else {
          newSet.add(type)
          newSet.delete("all")
        }
      }
      if (newSet.size === 0) {
        newSet.add("all")
      }
      return newSet
    })
  }

  const handleSearch = () => {
    updateVisibleListings()
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Menu */}
      <aside className="w-64 bg-white shadow-md z-20">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">2Click Broker</h1>
        </div>
        <nav className="mt-6">
          <Link href="/dashboard" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/listing-finder" className="flex items-center px-6 py-3 text-gray-700 bg-gray-100">
            <MapPin className="w-5 h-5 mr-3" />
            Listing Finder
          </Link>
          <Link href="/analytics" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <BarChart className="w-5 h-5 mr-3" />
            Analytics
          </Link>
          <Link href="/listing-manager" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <FileText className="w-5 h-5 mr-3" />
            Listing Manager
          </Link>
          <Link href="/settings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
      </aside>

      <div className="flex flex-1 overflow-hidden">
        {/* Map */}
        <main className="flex-1 relative">
          <Map
            {...viewport}
            onMove={evt => setViewport(evt.viewState)}
            style={{width: '100%', height: '100%'}}
            mapStyle="mapbox://styles/mapbox/light-v10"
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
                <div className="bg-blue-500 text-white rounded-full p-2 font-bold text-xs">
                  ${listing.price.toLocaleString()}
                </div>
              </Marker>
            ))}
            {selectedListing && (
              <Popup
                latitude={selectedListing.lat}
                longitude={selectedListing.lng}
                onClose={() => setSelectedListing(null)}
                closeOnClick={false}
                anchor="bottom"
                offsetTop={-15}
              >
                <div className="p-2 max-w-xs">
                  <h3 className="font-bold text-lg mb-1">
                    ${selectedListing.price.toLocaleString()}
                  </h3>
                  <p className="text-sm mb-1">{selectedListing.address}</p>
                  <p className="text-sm text-gray-500 capitalize mb-2">{selectedListing.type}</p>
                  <Button className="w-full" size="sm">View Details</Button>
                </div>
              </Popup>
            )}
          </Map>
        </main>

        {/* Filter Sidebar */}
        <aside className="w-80 bg-white overflow-hidden z-10 flex flex-col border-l">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by address, city, or ZIP"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <ScrollArea className="flex-grow">
            <div className="p-4">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Property Type</h3>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.value}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedPropertyTypes.has(type.value)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                      onClick={() => {
                        handlePropertyTypeChange(type.value)
                        setShowSubTypes(type.subTypes && type.subTypes.length > 0)
                      }}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
                {showSubTypes && (
                  <div className="mt-2 ml-4">
                    {propertyTypes.find(t => t.value === "residential")?.subTypes?.map((subType) => (
                      <label key={subType.value} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          checked={selectedPropertyTypes.has(subType.value)}
                          onCheckedChange={() => handlePropertyTypeChange(subType.value)}
                        />
                        <span>{subType.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                <Slider
                  min={0}
                  max={2000000}
                  step={10000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <Button className="w-full" onClick={handleSearch}>
              Show Results ({visibleListings.length})
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}