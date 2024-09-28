import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (exists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }
    const hashedPassword = await hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    })
    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ message: "An error occurred while registering the user" }, { status: 500 })
  }
}