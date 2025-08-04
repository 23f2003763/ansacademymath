import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { expertId, subject, topic, description, date, time, duration, type } = await request.json()

    // Create session request
    const session = await prisma.session.create({
      data: {
        title: `${subject} - ${topic}`,
        description,
        subject,
        datetime: new Date(`${date}T${time}`),
        duration: parseInt(duration),
        studentId: user.id,
        expertId,
        status: 'REQUESTED',
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        expert: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    // TODO: Send email notification to expert
    // TODO: Create calendar event

    return NextResponse.json({
      message: 'Session booked successfully',
      session
    })
  } catch (error) {
    console.error('Session booking error:', error)
    return NextResponse.json(
      { error: 'Failed to book session' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessions = await prisma.session.findMany({
      where: {
        OR: [
          { studentId: user.id },
          { expertId: user.id }
        ]
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        },
        expert: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        }
      },
      orderBy: {
        datetime: 'asc'
      }
    })

    return NextResponse.json({ sessions })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}