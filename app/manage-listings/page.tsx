'use client'

import React, { useState, ChangeEvent } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Home, 
  MapPin, 
  BarChart, 
  FileText, 
  Settings, 
  Search, 
  Plus, 
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ListingTable from '@/components/listings/ListingTable'
import ListingCard from '@/components/listings/ListingCard'
import AddListingModal from '@/components/listings/AddListingModal'
import EditListingModal from '@/components/listings/EditListingModal'
import DeleteConfirmationModal from '@/components/listings/DeleteConfirmationModal'

// Define the Listing interface
export interface Listing {
  id: number;
  address: string;
  price: number;
  status: 'Active' | 'Pending' | 'Sold';
  type: 'Single Family' | 'Condo' | 'Multi-Family' | 'Townhouse';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
}

// Mock data for listings
const mockListings: Listing[] = [
  { id: 1, address: "123 Maple Street, New York, NY 10001", price: 500000, status: "Active", type: "Single Family", bedrooms: 3, bathrooms: 2, sqft: 1500, image: "https://picsum.photos/seed/1/300/200" },
  { id: 2, address: "456 Oak Avenue, Brooklyn, NY 11201", price: 750000, status: "Pending", type: "Condo", bedrooms: 2, bathrooms: 2, sqft: 1200, image: "https://picsum.photos/seed/2/300/200" },
  { id: 3, address: "789 Pine Road, Queens, NY 11101", price: 1000000, status: "Sold", type: "Multi-Family", bedrooms: 5, bathrooms: 3, sqft: 2500, image: "https://picsum.photos/seed/3/300/200" },
  { id: 4, address: "101 Cedar Lane, Staten Island, NY 10301", price: 450000, status: "Active", type: "Townhouse", bedrooms: 3, bathrooms: 2.5, sqft: 1800, image: "https://picsum.photos/seed/4/300/200" },
  { id: 5, address: "202 Birch Boulevard, Bronx, NY 10451", price: 600000, status: "Active", type: "Single Family", bedrooms: 4, bathrooms: 3, sqft: 2000, image: "https://picsum.photos/seed/5/300/200" },
  { id: 6, address: "303 Elm Street, Manhattan, NY 10002", price: 2000000, status: "Pending", type: "Condo", bedrooms: 3, bathrooms: 3, sqft: 1800, image: "https://picsum.photos/seed/6/300/200" },
  { id: 7, address: "404 Willow Way, Brooklyn, NY 11202", price: 850000, status: "Active", type: "Townhouse", bedrooms: 3, bathrooms: 2.5, sqft: 1600, image: "https://picsum.photos/seed/7/300/200" },
  { id: 8, address: "505 Sycamore Street, Queens, NY 11102", price: 700000, status: "Sold", type: "Single Family", bedrooms: 4, bathrooms: 2, sqft: 1900, image: "https://picsum.photos/seed/8/300/200" },
]

// Mock function to fetch listings
const fetchListings = async (): Promise<Listing[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockListings
}

// Create a client
const queryClient = new QueryClient()

function ManageListingsContent() {
  const [view, setView] = useState<'table' | 'card'>('card')
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<keyof Listing>("price")
  const [filterStatus, setFilterStatus] = useState<'all' | Listing['status']>("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [editingListing, setEditingListing] = useState<Listing | null>(null)
  const [deletingListing, setDeletingListing] = useState<Listing | null>(null)

  const { data: listings, isLoading, error } = useQuery<Listing[]>('listings', fetchListings)

  const filteredListings = listings
    ?.filter((listing: Listing) => 
      listing.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterStatus === 'all' || listing.status === filterStatus)
    )
    .sort((a: Listing, b: Listing) => {
      if (sortBy === 'price') {
        return a.price - b.price
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status)
      } else if (sortBy === 'type') {
        return a.type.localeCompare(b.type)
      }
      return 0
    })

  const handleAddListing = (newListing: Listing): void => {
    setIsAddModalOpen(false)
    // Additional logic to add the listing can be added here
  }

  const handleEditListing = (updatedListing: Listing): void => {
    setEditingListing(null)
    // Additional logic to update the listing can be added here
  }

  const handleDeleteListing = (listingId: number): void => {
    setDeletingListing(null)
    // Additional logic to delete the listing can be added here
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Side Menu */}
      <aside className="w-64 bg-white shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">2Click Broker</h1>
        </div>
        <nav className="mt-6">
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <MapPin className="w-5 h-5 mr-3" />
            Listing Finder
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 bg-gray-100">
            <FileText className="w-5 h-5 mr-3" />
            Manage Listings
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <BarChart className="w-5 h-5 mr-3" />
            Analytics
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Manage Listings</h1>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-5 h-5 mr-2" /> Add New Listing
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px] relative">
              <Input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pr-10 bg-white"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Select value={sortBy} onValueChange={(value: keyof Listing) => setSortBy(value)}>
              <SelectTrigger className="w-[150px] bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value: 'all' | Listing['status']) => setFilterStatus(value)}>
              <SelectTrigger className="w-[150px] bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Bulk Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Change Status</DropdownMenuItem>
                <DropdownMenuItem>Delete Selected</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Tabs value={view} onValueChange={(value) => setView(value as 'table' | 'card')} className="ml-auto">
              <TabsList className="bg-white">
                <TabsTrigger value="table"><List className="w-5 h-5" /></TabsTrigger>
                <TabsTrigger value="card"><Grid className="w-5 h-5" /></TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Listings */}
          {isLoading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-500">Loading listings...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">Error loading listings</div>
          ) : (
            <div>
              {view === 'table' ? (
                <ListingTable 
                  listings={filteredListings as Listing[]} 
                  onEdit={(listing: Listing) => setEditingListing(listing)}
                  onDelete={(listing: Listing) => setDeletingListing(listing)}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings?.map((listing: Listing) => (
                    <ListingCard 
                      key={listing.id} 
                      listing={listing}
                      onEdit={() => setEditingListing(listing)}
                      onDelete={() => setDeletingListing(listing)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{' '}
              <span className="font-medium">20</span> results
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* User Menu */}
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Modals */}
      <AddListingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddListing}
      />
      {editingListing && (
        <EditListingModal
          isOpen={!!editingListing}
          onClose={() => setEditingListing(null)}
          onEdit={handleEditListing}
          listing={editingListing}
        />
      )}
      {deletingListing && (
        <DeleteConfirmationModal
          isOpen={!!deletingListing}
          onClose={() => setDeletingListing(null)}
          onConfirm={() => handleDeleteListing(deletingListing.id)}
          listingAddress={deletingListing.address}
        />
      )}
    </div>
  )
}

export default function ManageListings() {
  return (
    <QueryClientProvider client={queryClient}>
      <ManageListingsContent />
    </QueryClientProvider>
  )
}