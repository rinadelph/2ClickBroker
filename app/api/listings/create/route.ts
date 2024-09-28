import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'  // Updated import

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const { title, description, price, location, latitude, longitude } = await req.json()
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        location,
        userId: session.user.id,
        locations: {
          create: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            address: location,
          }
        }
      },
      include: {
        locations: true,
      },
    })

    return NextResponse.json({ listing })
  } catch (error) {
    console.error('Error creating listing:', error)
    return NextResponse.json({ error: 'Error creating listing' }, { status: 500 })
  }
}