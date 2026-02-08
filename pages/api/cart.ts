import type { NextApiRequest, NextApiResponse } from "next"
import { store } from "@/lib/store"

// 🧾 Response Type
type CartResponse = {
  users: any[]
  menu: any[]
  finalized: Record<string, any>
  runner: string | null
  history: any[]
  timeline: any[]
  lastOrderMessage?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartResponse>
) {
  res.status(200).json({
    users: store.users,
    menu: store.menu,
    finalized: store.finalized,
    runner: store.runner,
    history: store.history,
    timeline: store.timeline,
    // lastOrderMessage:
    //   store.lastOrderMessage,
  })
}
