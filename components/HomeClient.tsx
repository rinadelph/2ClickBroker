'use client';

import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, MapPin, DollarSign, Users, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HomeClient() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignIn = () => {
    router.push('/signin')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            2ClickBroker
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/agents" className="text-gray-600 hover:text-blue-600">
              Agents
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            {session ? (
              <button onClick={() => signOut()} className="text-gray-600 hover:text-blue-600">
                Sign Out
              </button>
            ) : (
              <button onClick={handleSignIn} className="text-gray-600 hover:text-blue-600">
                Sign In
              </button>
            )}
          </nav>
          <button
            className="md:hidden text-gray-600 hover:text-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white py-2">
            <Link href="/listings" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
              Listings
            </Link>
            <Link href="/agents" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
              Agents
            </Link>
            <Link href="/about" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
              About
            </Link>
            {session ? (
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={handleSignIn}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </header>

      <main>
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to 2ClickBroker
            </h1>
            <p className="text-xl mb-8">
              The easiest way to manage and access real estate listings
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                placeholder="Search for properties..."
                className="w-full md:w-96 px-4 py-2 rounded-md text-gray-900"
                aria-label="Search for properties"
              />
              <button type="submit" className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-blue-100 transition duration-300">
                Search
              </button>
            </form>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Search size={48} className="mx-auto mb-4 text-blue-600" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
                <p className="text-gray-600">Find your perfect property with our powerful search tools</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <MapPin size={48} className="mx-auto mb-4 text-blue-600" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">Location Based</h3>
                <p className="text-gray-600">Explore properties in your desired locations</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <DollarSign size={48} className="mx-auto mb-4 text-blue-600" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">Commission Info</h3>
                <p className="text-gray-600">Access commission details with our secure two-click system</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Users size={48} className="mx-auto mb-4 text-blue-600" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">Agent Network</h3>
                <p className="text-gray-600">Connect with top real estate professionals</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-200 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={`https://via.placeholder.com/400x200?text=Property+${i}`}
                    alt={`Featured Property ${i}`}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Beautiful Home in City Center</h3>
                    <p className="text-gray-600 mb-4">123 Main St, Anytown, USA</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">$500,000</span>
                      <Link href="/listings/1" className="text-blue-600 hover:underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/listings"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
              >
                View All Listings
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">2ClickBroker</h3>
              <p className="text-gray-400">Simplifying real estate for professionals</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/listings" className="text-gray-400 hover:text-white">Listings</Link></li>
                <li><Link href="/agents" className="text-gray-400 hover:text-white">Agents</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <address className="not-italic">
                <p className="text-gray-400">123 Real Estate St, Suite 456</p>
                <p className="text-gray-400">Broker City, BC 12345</p>
                <p className="text-gray-400">Phone: <a href="tel:+11234567890" className="hover:text-white">(123) 456-7890</a></p>
                <p className="text-gray-400">Email: <a href="mailto:info@2clickbroker.com" className="hover:text-white">info@2clickbroker.com</a></p>
              </address>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} 2ClickBroker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}