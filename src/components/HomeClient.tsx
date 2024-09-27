'use client';

import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, MapPin, DollarSign, Users, Menu, X } from 'lucide-react'

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            2ClickBroker
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/listings" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300">
              Listings
            </Link>
            <Link href="/agents" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300">
              Agents
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300">
              About
            </Link>
            {session ? (
              <button onClick={() => signOut()} className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Sign Out
              </button>
            ) : (
              <button onClick={() => signIn()} className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Sign In
              </button>
            )}
          </nav>
          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white py-2">
            <Link href="/listings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600">Listings</Link>
            <Link href="/agents" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600">Agents</Link>
            <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600">About</Link>
            {session ? (
              <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600">Sign Out</button>
            ) : (
              <button onClick={() => signIn()} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600">Sign In</button>
            )}
          </div>
        )}
      </header>

      <main>
        <section className="bg-blue-600 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to 2ClickBroker</h1>
              <p className="text-xl mb-8">
                The easiest way to manage and access real estate listings. Find your dream property with just two clicks.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                <input
                  type="text"
                  placeholder="Search for properties..."
                  className="w-full md:w-96 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button type="submit" className="w-full md:w-auto bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Search, title: "Easy Search", description: "Find your perfect property with our powerful search tools" },
                { icon: MapPin, title: "Location Based", description: "Explore properties in your desired locations" },
                { icon: DollarSign, title: "Commission Info", description: "Access commission details with our secure two-click system" },
                { icon: Users, title: "Agent Network", description: "Connect with top real estate professionals" }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <feature.icon size={48} className="mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={`https://via.placeholder.com/400x300?text=Property+${i}`}
                    alt={`Featured Property ${i}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Luxurious Villa in Malibu</h3>
                    <p className="text-gray-600 mb-4">123 Ocean View Dr, Malibu, CA</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">$2,500,000</span>
                      <Link href={`/listings/${i}`} className="text-blue-600 hover:underline">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/listings"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                View All Listings
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">2ClickBroker</h3>
              <p className="text-gray-400">Simplifying real estate for professionals and home seekers alike.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/listings" className="text-gray-400 hover:text-white transition-colors">Listings</Link></li>
                <li><Link href="/agents" className="text-gray-400 hover:text-white transition-colors">Agents</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-400">
                <p>123 Real Estate St, Suite 456</p>
                <p>Broker City, BC 12345</p>
                <p className="mt-2">Phone: (123) 456-7890</p>
                <p>Email: info@2clickbroker.com</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} 2ClickBroker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}