import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const analytics = await prisma.analytics.findUnique({
      where: { id: Number(id) },
    });

    if (!analytics) {
      return NextResponse.json({ error: 'Analytics not found' }, { status: 404 });
    }

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}