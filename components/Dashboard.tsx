'use client'

import { useState } from 'react'
import { Bell, Home, BarChart, FileText, Settings, Search, ChevronDown, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const data = [
  { date: '01 Sep', views: 4000, commissionClicks: 2400, conversions: 240 },
  { date: '05 Sep', views: 3000, commissionClicks: 1398, conversions: 139 },
  { date: '10 Sep', views: 2000, commissionClicks: 9800, conversions: 980 },
  { date: '15 Sep', views: 2780, commissionClicks: 3908, conversions: 390 },
  { date: '20 Sep', views: 1890, commissionClicks: 4800, conversions: 480 },
  { date: '25 Sep', views: 2390, commissionClicks: 3800, conversions: 380 },
  { date: '30 Sep', views: 3490, commissionClicks: 4300, conversions: 430 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeRange, setTimeRange] = useState("Last 30 days")

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">2Click Broker</h1>
        </div>
        <nav className="mt-6">
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 bg-gray-100">
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-6 py-3 mt-2 text-gray-600 hover:bg-gray-100">
            <MapPin className="w-5 h-5 mr-3" />
            Listing Finder
          </a>
          <a href="#" className="flex items-center px-6 py-3 mt-2 text-gray-600 hover:bg-gray-100">
            <FileText className="w-5 h-5 mr-3" />
            Manage Listings
          </a>
          <a href="#" className="flex items-center px-6 py-3 mt-2 text-gray-600 hover:bg-gray-100">
            <BarChart className="w-5 h-5 mr-3" />
            Analytics
          </a>
          <a href="#" className="flex items-center px-6 py-3 mt-2 text-gray-600 hover:bg-gray-100">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-5">
            <div className="flex items-center bg-gray-100 rounded-lg">
              <Search className="h-5 w-5 text-gray-500 ml-3" />
              <Input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-transparent border-none focus:ring-0"
              />
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <img
                      src="/placeholder.svg?height=32&width=32"
                      alt="User avatar"
                      className="rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Analytics Overview</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
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

          <div className="grid grid-cols-12 gap-6">
            {/* Summary Cards */}
            <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">254</div>
                  <p className="text-xs text-muted-foreground">+12 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45,231</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Commission Views</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,203</div>
                  <p className="text-xs text-muted-foreground">+18% this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">328</div>
                  <p className="text-xs text-muted-foreground">+5.3% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Chart */}
            <Card className="col-span-12 lg:col-span-8">
              <CardHeader>
                <CardTitle>Listing Performance Overview</CardTitle>
                <CardDescription>Compare views, commission clicks, and conversions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area type="monotone" dataKey="views" stackId="1" stroke="#8884d8" fill="#8884d8" name="Views" />
                      <Area type="monotone" dataKey="commissionClicks" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Commission Clicks" />
                      <Area type="monotone" dataKey="conversions" stackId="1" stroke="#ffc658" fill="#ffc658" name="Conversions" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Listings */}
            <Card className="col-span-12 lg:col-span-6">
              <CardHeader>
                <CardTitle>Top Performing Listings</CardTitle>
                <CardDescription>Listings with the highest conversion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { address: "123 Main St, Anytown, USA", views: 1200, commissionClicks: 45, conversions: 15, price: "$450,000" },
                    { address: "456 Elm St, Somewhere, USA", views: 980, commissionClicks: 32, conversions: 12, price: "$375,000" },
                    { address: "789 Oak Ave, Elsewhere, USA", views: 850, commissionClicks: 28, conversions: 10, price: "$525,000" },
                  ].map((listing, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{listing.address}</p>
                        <p className="text-sm text-gray-500">{listing.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{listing.views} views</p>
                        <p className="text-sm text-gray-500">{listing.commissionClicks} commission clicks</p>
                        <p className="text-sm font-medium text-green-600">{listing.conversions} conversions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Conversions */}
            <Card className="col-span-12 lg:col-span-6">
              <CardHeader>
                <CardTitle>Recent Conversions</CardTitle>
                <CardDescription>Latest client interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "call", address: "123 Main St, Anytown, USA", time: "2 hours ago" },
                    { type: "email", address: "456 Elm St, Somewhere, USA", time: "5 hours ago" },
                    { type: "call", address: "789 Oak Ave, Elsewhere, USA", time: "1 day ago" },
                  ].map((conversion, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        {conversion.type === "call" ? (
                          <Phone className="h-5 w-5 text-green-500 mr-3" />
                        ) : (
                          <Mail className="h-5 w-5 text-blue-500 mr-3" />
                        )}
                        <div>
                          <p className="font-medium">{conversion.address}</p>
                          <p className="text-sm text-gray-500">{conversion.time}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}