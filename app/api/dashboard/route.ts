import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const userId = session.user.id

    const totalListings = await prisma.listing.count({
      where: { userId: userId }
    })

    const totalViews = await prisma.listing.aggregate({
      where: { userId: userId },
      _sum: { views: true }
    })

    const totalInquiries = await prisma.listing.aggregate({
      where: { userId: userId },
      _sum: { inquiries: true }
    })

    return NextResponse.json({
      totalListings,
      totalViews: totalViews._sum.views || 0,
      totalInquiries: totalInquiries._sum.inquiries || 0
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json({ error: 'Error fetching dashboard data' }, { status: 500 })
  }
}