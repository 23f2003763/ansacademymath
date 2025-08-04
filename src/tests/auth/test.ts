/// <reference types="jest" />
import { verifyToken, generateToken } from '@/lib/auth'
import { NextRequest } from 'next/server'

// Mock Prisma
jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}))

describe('Authentication', () => {
  it('should generate and verify token correctly', async () => {
    const userId = 'test-user-id'
    const token = generateToken(userId)
    
    expect(token).toBeDefined()
    expect(typeof token).toBe('string')
  })

  it('should return null for invalid token', async () => {
    const request = new NextRequest('http://localhost:3000')
    request.cookies.set('token', 'invalid-token')
    
    const user = await verifyToken(request)
    expect(user).toBeNull()
  })
})