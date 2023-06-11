// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

type Data = {
  username: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient()

  const session = req.cookies.session

  const user = await prisma.user.findUnique({
    where: {
      session: session
    }
  })

  if (user){
    res.status(200).json({username: user.username})
    
  } else {
    res.setHeader('Set-Cookie', `session=; expires=${new Date(0).toUTCString()}; path=/; samesite=lax; httponly; secure;`)
    res.status(404).end()
  }

  
  
}
