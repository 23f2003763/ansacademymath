import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ansacademymath.in' },
    update: {},
    create: {
      email: 'admin@ansacademymath.in',
      username: 'admin',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      ansPoints: 0,
      examPrep: [],
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })