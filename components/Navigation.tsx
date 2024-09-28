'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export function Navigation() {
  const { data: session } = useSession()

  return (
    <nav>
      <Link href="/">Home</Link>
      {session ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/listings/create">Create Listing</Link>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <Link href="/signin">Sign In</Link>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  )
}