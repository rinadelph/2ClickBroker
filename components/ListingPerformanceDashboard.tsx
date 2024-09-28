import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Listing {
  id: string
  title: string
  views: number
  inquiries: number
}

export default function ListingPerformanceDashboard() {
  const { data: session } = useSession()
  const [listings, setListings] = useState<Listing[]>([])
  const [timeRange, setTimeRange] = useState("Last 30 days")

  useEffect(() => {
    // Fetch listings data from your API
    const fetchListings = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/listings?userId=${session.user.id}`)
          if (response.ok) {
            const data = await response.json()
            setListings(data.listings)
          } else {
            console.error('Failed to fetch listings')
          }
        } catch (error) {
          console.error('Error fetching listings:', error)
        }
      }
    }

    fetchListings()
  }, [session])

  // Mock data for the chart
  const chartData = [
    { date: '2023-01-01', views: 100, inquiries: 10 },
    { date: '2023-01-02', views: 120, inquiries: 15 },
    { date: '2023-01-03', views: 150, inquiries: 20 },
    { date: '2023-01-04', views: 180, inquiries: 25 },
    { date: '2023-01-05', views: 200, inquiries: 30 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Performance Overview</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {timeRange} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setTimeRange("Last 7 days")}>Last 7 days</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setTimeRange("Last 30 days")}>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setTimeRange("Last 3 months")}>Last 3 months</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="views" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="inquiries" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Listing Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Views</th>
                <th className="py-2 px-4 text-left">Inquiries</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} className="border-b">
                  <td className="py-2 px-4">{listing.title}</td>
                  <td className="py-2 px-4">{listing.views}</td>
                  <td className="py-2 px-4">{listing.inquiries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}