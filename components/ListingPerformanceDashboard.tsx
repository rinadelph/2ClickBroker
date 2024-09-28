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

export default function ListingPerformanceDashboard() {
  const { data: session } = useSession()
  const [performanceData, setPerformanceData] = useState([])
  const [timeRange, setTimeRange] = useState("Last 30 days")

  useEffect(() => {
    const fetchPerformanceData = async () => {
      if (session?.user?.id) {
        const response = await fetch(`/api/listings/performance?userId=${session.user.id}&timeRange=${timeRange}`)
        if (response.ok) {
          const data = await response.json()
          setPerformanceData(data)
        }
      }
    }

    fetchPerformanceData()
  }, [session, timeRange])

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
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="views" stackId="1" stroke="#8884d8" fill="#8884d8" name="Views" />
            <Area type="monotone" dataKey="inquiries" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Inquiries" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}