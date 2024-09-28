'use client'

import React from 'react'
import ListingPerformanceDashboard from '@/components/ListingPerformanceDashboard'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, ArrowUpRight } from 'lucide-react'

export function Page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">2Click Broker Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Listing
              </Button>
              <Button variant="outline">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                View All Listings
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-sm">New listing added: 123 Main St</li>
              <li className="text-sm">Commission viewed: 456 Elm St</li>
              <li className="text-sm">Inquiry received: 789 Oak Ave</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <ListingPerformanceDashboard />
    </div>
  )
}