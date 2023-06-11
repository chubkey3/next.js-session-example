// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import cryptoRandomString from 'crypto-random-string'
import type { NextApiRequest, NextApiResponse } from 'next'



type Data = {
  message: string
}

type DataSession = {
  session: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | DataSession>
) {

    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({where: {username: req.body.username}})

    if (user){
      const isValid = await bcrypt.compare(req.body.password, user.password)

      if (isValid){

        var expiryDate = new Date()
        expiryDate.setMonth((expiryDate.getMonth() + 1) % 12)

        const session_token = cryptoRandomString({
          length: 48,
          type: 'url-safe'
        })

        const updateSession = await prisma.user.update({where: {username: req.body.username}, data: {session: session_token}})

        if (updateSession){
          res.setHeader('Set-Cookie', `session=${session_token}; expires=${expiryDate.toUTCString()}; path=/; samesite=lax; httponly; secure;`)
        
          res.redirect('/')
        } else {
          res.status(500).end()
        }
        
      } else {
        res.redirect('/login')
      }

    } else {
      res.redirect('/login')
    }

}
