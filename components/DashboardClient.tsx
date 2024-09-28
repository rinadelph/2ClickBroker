'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ListingPerformanceDashboard from '@/components/ListingPerformanceDashboard'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardClient() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!session) router.push('/auth/signin')
  }, [session, status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">2Click Broker Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {session.user?.name || 'Broker'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Here's an overview of your listings performance.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Listings: {/* Add actual data here */}</p>
            <p>Total Views: {/* Add actual data here */}</p>
            <p>Total Inquiries: {/* Add actual data here */}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Listing Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ListingPerformanceDashboard />
        </CardContent>
      </Card>
    </div>
  )
}