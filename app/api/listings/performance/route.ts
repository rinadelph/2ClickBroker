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
  const timeRange = searchParams.get('timeRange') || 'Last 30 days'

  try {
    const userId = session.user.id

    // Calculate the start date based on the time range
    const startDate = new Date()
    if (timeRange === 'Last 7 days') {
      startDate.setDate(startDate.getDate() - 7)
    } else if (timeRange === 'Last 30 days') {
      startDate.setDate(startDate.getDate() - 30)
    } else if (timeRange === 'Last 3 months') {
      startDate.setMonth(startDate.getMonth() - 3)
    }

    const performanceData = await prisma.listing.findMany({
      where: {
        userId: userId,
        createdAt: { gte: startDate }
      },
      select: {
        createdAt: true,
        views: true,
        inquiries: true
      },
      orderBy: { createdAt: 'asc' }
    })

    // Group data by date
    const groupedData = performanceData.reduce((acc, item) => {
      const date = item.createdAt.toISOString().split('T')[0]
      if (!acc[date]) {
        acc[date] = { date, views: 0, inquiries: 0 }
      }
      acc[date].views += item.views
      acc[date].inquiries += item.inquiries
      return acc
    }, {})

    return NextResponse.json(Object.values(groupedData))
  } catch (error) {
    console.error('Error fetching listing performance data:', error)
    return NextResponse.json({ error: 'Error fetching listing performance data' }, { status: 500 })
  }
}