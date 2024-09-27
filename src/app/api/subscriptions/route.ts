import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany();
    return NextResponse.json(subscriptions);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const newSubscription = await prisma.subscription.create({
      data: body,
    });

    return NextResponse.json(newSubscription, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}