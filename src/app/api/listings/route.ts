import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const listingSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  price: z.number().positive(),
  location: z.string().min(1).max(100),
});

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = listingSchema.parse(body);

    const newListing = await prisma.listing.create({
      data: validatedData,
    });

    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating listing:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}