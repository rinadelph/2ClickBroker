import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { uploadImage } from '@/lib/uploadImage'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { sanitizeInput } from '@/lib/sanitize' // Create this utility function

const listingSchema = z.object({
  title: z.string().min(1).max(100).transform(sanitizeInput),
  description: z.string().min(1).max(1000).transform(sanitizeInput),
  price: z.coerce.number().positive(),
  buildingArea: z.coerce.number().positive().optional(),
  buildingAreaUnit: z.string().optional(),
  lotArea: z.coerce.number().positive().optional(),
  lotAreaUnit: z.string().optional(),
  address: z.string().min(1).max(200).transform(sanitizeInput),
  location: z.string().optional().transform(sanitizeInput),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  bathrooms: z.coerce.number().nonnegative().optional(),
  yearBuilt: z.coerce.number().int().positive().optional(),
  parkingSpaces: z.coerce.number().int().nonnegative().optional(),
  amenities: z.string().optional().transform(sanitizeInput),
  isOfferingCommission: z.boolean(),
  commissionType: z.string().optional(),
  commissionValue: z.coerce.number().nonnegative().optional(),
  primaryType: z.string().optional(),
  specificType: z.string().optional(),
  characteristics: z.array(z.string()).optional(),
  latitude: z.number(),
  longitude: z.number(),
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

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  console.log('Session:', session); // Add this line

  if (!session || !session.user) {
    console.log('Unauthorized: No session or user found'); // Add this line
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log('User:', session.user); // Add this line

  try {
    const formData = await req.formData();
    const listingDataRaw = formData.get('listingData');
    
    if (typeof listingDataRaw !== 'string') {
      return NextResponse.json({ error: 'Invalid listing data' }, { status: 400 });
    }

    const listingData = JSON.parse(listingDataRaw);
    const images = formData.getAll('images') as File[];

    // Validate the listing data
    const validatedData = listingSchema.parse(listingData);

    // Validate images
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (images.length > 10) {
      return NextResponse.json({ error: 'Maximum 10 images allowed' }, { status: 400 });
    }

    for (const image of images) {
      if (!allowedTypes.includes(image.type)) {
        return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
      }
      if (image.size > maxSize) {
        return NextResponse.json({ error: 'Image size exceeds 5MB limit' }, { status: 400 });
      }
    }

    const listing = await prisma.listing.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        locations: {
          create: [
            {
              latitude: listingData.latitude,
              longitude: listingData.longitude,
              address: listingData.address,
            },
          ],
        },
      },
    });

    console.log('Created listing:', listing); // Add this line

    // Upload and save images
    if (images && images.length > 0) {
      const imagePromises = images.map(async (image: File) => {
        const url = await uploadImage(image);
        return prisma.image.create({
          data: {
            url,
            listingId: listing.id,
          },
        });
      });

      await Promise.all(imagePromises);
    }

    return NextResponse.json({ success: true, listing }, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid listing data', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error creating listing' }, { status: 500 });
  }
}