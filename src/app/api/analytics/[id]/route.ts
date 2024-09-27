import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const analytics = await prisma.analytics.findUnique({
      where: { id: Number(id) },
    });

    if (!analytics) {
      return NextResponse.json({ error: 'Analytics not found' }, { status: 404 });
    }

    return NextResponse.json(analytics);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}