// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const prisma = new PrismaClient()
  
    if (req.cookies.session){
      const user = await prisma.user.findUnique({where: {session: req.cookies.session}})

      if (user){
          await prisma.user.update({
            where: {
              session: req.cookies.session,
            }, data: {
              session: ""
            }
          })
      }
    }
    

    res.setHeader('Set-Cookie', `session=; expires=${new Date(0).toUTCString()}; path=/; samesite=lax; httponly; secure;`)  
    res.redirect('/')

}
