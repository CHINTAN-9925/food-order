import { store } from "@/lib/store"

export default function handler(req, res) {
  res.json(store.history)
}
