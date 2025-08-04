import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    // Check AI service
    const aiHealthy = await fetch(process.env.OLLAMA_URL + '/api/version')
      .then(res => res.ok)
      .catch(() => false)

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'healthy',
        ai: aiHealthy ? 'healthy' : 'unhealthy'
      }
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Database connection failed'
      },
      { status: 503 }
    )
  }
}