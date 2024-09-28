'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ListingPerformanceDashboard from '@/components/ListingPerformanceDashboard'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Settings, Search, Home, MapPin, FileText, BarChart } from 'lucide-react'
import TopBottomListings from '@/components/TopBottomListings'

export default function DashboardClient() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [totalListings, setTotalListings] = useState(0)
  const [totalViews, setTotalViews] = useState(0)
  const [totalInquiries, setTotalInquiries] = useState(0)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/auth/signin')
    
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      setTotalListings(data.totalListings)
      setTotalViews(data.totalViews)
      setTotalInquiries(data.totalInquiries)
    }

    fetchDashboardData()
  }, [session, status, router])

  if (status === 'loading') return <div>Loading...</div>
  if (!session) return null

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">2Click Broker</h2>
        </div>
        <nav className="mt-6">
          <Link href="/dashboard" className="flex items-center px-6 py-3 text-gray-700 bg-gray-100">
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/listing-finder" className="flex items-center px-6 py-3 mt-2 text-gray-600 hover:bg-gray-100">
            <MapPin className="w-5 h-5 mr-3" />
            Listing Finder
          </Link>
          <Link href="/listings" className="flex items-center px-6 py-3 mt-2 text-gray-600 hover:bg-gray-100">
            <FileText className="w-5 h-5 mr-3" />
            Manage Listings
          </Link>
          <Link href="/analytics" className="flex items-center px-6 py-3 mt-2 text-gray-600 hover:bg-gray-100">
            <BarChart className="w-5 h-5 mr-3" />
            Analytics
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Total Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{totalListings}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{totalViews}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{totalInquiries}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Listing Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ListingPerformanceDashboard />
              </CardContent>
            </Card>

            <TopBottomListings />

            {/* Add more dashboard components here */}
          </div>
        </main>
      </div>
    </div>
  )
}