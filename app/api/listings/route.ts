import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const listings = await prisma.listing.findMany({
      where: { userId: userId },
      select: {
        id: true,
        title: true,
        views: true,
        inquiries: true,
      },
      orderBy: { views: 'desc' }
    })

    const topListings = listings.slice(0, 5)
    const bottomListings = listings.slice(-5).reverse()

    return NextResponse.json({ topListings, bottomListings })
  } catch (error) {
    console.error('Error fetching listings:', error)
    return NextResponse.json({ error: 'Error fetching listings' }, { status: 500 })
  }
}