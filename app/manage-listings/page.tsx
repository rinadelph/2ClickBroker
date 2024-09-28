    // Start of Selection
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
      List
    } from 'lucide-react'
    import ListingTable from '@/components/listings/ListingTable'
    import ListingCard from '@/components/listings/ListingCard'
    import AddListingModal from '@/components/listings/AddListingModal'
    import EditListingModal from '@/components/listings/EditListingModal'
    import DeleteConfirmationModal from '@/components/listings/DeleteConfirmationModal'
    
    // Define the Listing interface
    interface Listing {
      id: number;
      address: string;
      price: number;
      status: 'Active' | 'Pending' | 'Sold';
      type: 'Single Family' | 'Condo' | 'Multi-Family';
    }
    
    // Mock function to fetch listings
    const fetchListings = async (): Promise<Listing[]> => {
      return [
        { id: 1, address: "123 Main St", price: 500000, status: "Active", type: "Single Family" },
        { id: 2, address: "456 Elm St", price: 350000, status: "Pending", type: "Condo" },
        { id: 3, address: "789 Oak St", price: 750000, status: "Sold", type: "Multi-Family" },
      ]
    }
    
    // Create a client
    const queryClient = new QueryClient()
    
    // Wrap the ManageListings component with QueryClientProvider
    export default function ManageListingsWrapper() {
      return (
        <QueryClientProvider client={queryClient}>
          <ManageListings />
        </QueryClientProvider>
      )
    }

    function ManageListings() {
      const [view, setView] = useState<'table' | 'card'>('table')
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
        <div className="flex h-screen bg-gray-100">
          {/* Side Menu */}
          <aside className="w-64 bg-white shadow-md z-20">
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
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Manage Listings</h1>
                <Button onClick={() => setIsAddModalOpen(true)}>
                  <Plus className="w-5 h-5 mr-2" /> Add New Listing
                </Button>
              </div>
    
              {/* Search and Filters */}
              <div className="mb-6 flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Search listings..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <Select value={sortBy} onValueChange={(value: keyof Listing) => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="type">Type</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={(value: 'all' | Listing['status']) => setFilterStatus(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
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
              </div>
    
              {/* View Toggle */}
              <div className="mb-6">
                <Tabs value={view} onValueChange={(value: string) => setView(value as 'table' | 'card')}>
                  <TabsList>
                    <TabsTrigger value="table"><List className="w-5 h-5 mr-2" /> Table View</TabsTrigger>
                    <TabsTrigger value="card"><Grid className="w-5 h-5 mr-2" /> Card View</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
    
              {/* Listings */}
              {isLoading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error loading listings</div>
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
            </div>
          </main>
    
          {/* Modals */}
          {isAddModalOpen && (
            <AddListingModal 
              isOpen={isAddModalOpen} 
              onClose={() => setIsAddModalOpen(false)}
              onAdd={handleAddListing}
            />
          )}
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