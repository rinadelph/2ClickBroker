import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'  // Updated import

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { 
      title, description, price, 
      buildingArea, buildingAreaUnit, 
      lotArea, lotAreaUnit, 
      address, location, 
      bedrooms, bathrooms, amenities, 
      isOfferingCommission, commissionType, 
      primaryType, specificType, characteristics 
    } = await req.json();

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        buildingArea: buildingArea ? parseFloat(buildingArea) : undefined,
        buildingAreaUnit,
        lotArea: lotArea ? parseFloat(lotArea) : undefined,
        lotAreaUnit,
        address,
        location,
        bedrooms: bedrooms ? parseInt(bedrooms, 10) : undefined,
        bathrooms: bathrooms ? parseFloat(bathrooms) : undefined,
        amenities,
        isOfferingCommission,
        commissionType,
        primaryType,
        specificType,
        characteristics,
        userId: session.user.id, // Assign userId directly instead of using connect
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json({ listing }, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json({ error: 'Error creating listing' }, { status: 500 });
  }
}