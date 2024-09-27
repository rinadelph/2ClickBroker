import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const commission = await prisma.commission.findUnique({
      where: { id: Number(id) },
    });

    if (!commission) {
      return NextResponse.json({ error: 'Commission not found' }, { status: 404 });
    }

    return NextResponse.json(commission);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}