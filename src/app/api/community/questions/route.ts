import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subject = searchParams.get('subject')
    const exam = searchParams.get('exam')
    const sortBy = searchParams.get('sortBy') || 'recent'
    const search = searchParams.get('search')

    let orderBy = {}
    switch (sortBy) {
      case 'popular':
        orderBy = { upvotes: 'desc' }
        break
      case 'unanswered':
        orderBy = { answers: { _count: 'asc' } }
        break
      default:
        orderBy = { createdAt: 'desc' }
    }

    const questions = await prisma.question.findMany({
      where: {
        ...(subject && subject !== 'all' && { subject }),
        ...(exam && exam !== 'all' && { exam }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } }
          ]
        })
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            ansPoints: true,
            avatar: true
          }
        },
        _count: {
          select: {
            answers: true,
            votes: true
          }
        }
      },
      orderBy,
      take: 50
    })

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { title, content, latex, subject, exam, difficulty, tags } = await request.json()

    const question = await prisma.question.create({
      data: {
        title,
        content,
        latex,
        subject,
        exam,
        difficulty,
        authorId: user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            ansPoints: true,
            avatar: true
          }
        }
      }
    })

    // Award points for asking question
    await prisma.user.update({
      where: { id: user.id },
      data: {
        ansPoints: {
          increment: 10
        }
      }
    })

    return NextResponse.json({ question })
  } catch (error) {
    console.error('Error creating question:', error)
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    )
  }
}