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
    const { name } = await req.json()
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email! },
      data: { name },
    })

    return NextResponse.json({ user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email } })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 })
  }
}