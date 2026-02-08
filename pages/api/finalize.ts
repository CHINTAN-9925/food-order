import { store } from "@/lib/store"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  if (store.locked) {
    return res
      .status(400)
      .json({ error: "Order locked" })
  }

  const { username, item } = req.body

  if (!username || !item) {
    return res.status(400).json({
      error: "Invalid payload",
    })
  }

  if (!store.finalized[username]) {
    store.finalized[username] = {}
  }

  store.finalized[username][item.id] = item

  console.log("FINALIZED:", store.finalized) // Debug log

  res.json({ success: true })
}
