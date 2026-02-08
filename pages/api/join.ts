import { store } from "@/lib/store"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.body

  if (!username) return res.status(400).json({ error: "Name required" })

  if (store.users.length >= 10)
    return res.status(400).json({ error: "User limit reached" })

  if (!store.users.includes(username)) {
    store.users.push(username)
  }

  res.json({ users: store.users })
}
