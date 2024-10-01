'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, MapPin, FileText, BarChart, Menu } from 'lucide-react';
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white w-64 min-h-screen p-4 ${isSidebarOpen ? '' : 'hidden'}`}>
        <nav className="mt-8">
          <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/listing-finder" className="flex items-center mt-4 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
            <MapPin className="mr-3 h-5 w-5" />
            Listing Finder
          </Link>
          <Link href="/manage-listings" className="flex items-center mt-4 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
            <FileText className="mr-3 h-5 w-5" />
            Manage Listings
          </Link>
          <Link href="/analytics" className="flex items-center mt-4 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
            <BarChart className="mr-3 h-5 w-5" />
            Analytics
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" onClick={toggleSidebar}>
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            {/* Add user profile or other top bar elements here */}
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {/* Add your dashboard widgets and content here */}
          <h2 className="text-xl font-semibold mb-4">Welcome to your Dashboard</h2>
          {/* Add more dashboard components here */}
        </main>
      </div>
    </div>
  );
}