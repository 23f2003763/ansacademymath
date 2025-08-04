import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { prisma } from './db'

export async function verifyToken(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true,
        ansPoints: true,
        examPrep: true,
        avatar: true
      }
    })

    return user
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export function generateToken(userId: string): string {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )
}