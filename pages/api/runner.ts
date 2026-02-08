import { store } from "@/lib/store"

export default function handler(req, res) {
  const { action, user } = req.body

  if (action === "assign") {
    store.runner = user
  }

  if (action === "withdraw") {
    store.runner = null
  }

  res.json({ success: true })
}
