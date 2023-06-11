// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import cryptoRandomString from 'crypto-random-string'

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

    if (!req.body.username || !req.body.password) return res.status(400).json({message: 'Username and/or password missing in request!'})

    const user = await prisma.user.findUnique({where: {username: req.body.username}})

    if (user) return res.status(400).json({message: 'User already exists'})

    //session stuff
    var expiryDate = new Date()
    expiryDate.setMonth((expiryDate.getMonth() + 1) % 12)

    const session_token = cryptoRandomString({
        length: 48,
        type: 'url-safe'
    })

    const newUser = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10),
            session:  session_token
        }
    })

    if (!newUser) return res.status(500).end()

    res.setHeader('Set-Cookie', `session=${session_token}; expires=${expiryDate.toUTCString()}; path=/; samesite=lax; httponly; secure;`)
    res.redirect('/').end()

}
