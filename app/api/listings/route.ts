import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { uploadImage } from '@/lib/imageUpload'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

const listingSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  price: z.number().positive(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().nonnegative(),
  squareFootage: z.number().positive(),
  address: z.string().min(1).max(200),
  primaryType: z.string(),
  specificType: z.string(),
  characteristics: z.array(z.string()),
})

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
        price: true,
        address: true,
        bedrooms: true,
        bathrooms: true,
        squareFootage: true,
        images: true,
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(listings)
  } catch (error) {
    console.error('Error fetching listings:', error)
    return NextResponse.json({ error: 'Error fetching listings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const formData = await request.formData()
    const listingData = JSON.parse(formData.get('listingData') as string)
    const images = formData.getAll('images') as File[]

    const validatedData = listingSchema.parse(listingData)

    const imageUrls = await Promise.all(images.map(uploadImage))

    const newListing = await prisma.listing.create({
      data: {
        ...validatedData,
        images: imageUrls,
        userId: session.user.id,
      },
    })

    return NextResponse.json(newListing, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating listing:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}