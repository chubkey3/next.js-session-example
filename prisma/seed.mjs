import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

    
    await prisma.user.upsert({
      where: { username: 'chubkey' },
      update: {},
      create: {
        username: 'chubkey',
        password: ''
      }
    })

    

  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })