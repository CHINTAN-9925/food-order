import { store } from "@/lib/store"

export default function handler(req, res) {
  if (!store.runner) {
    return res.json({ success: false })
  }

  const runnerName = store.runner

  // 🧾 ARCHIVE SNAPSHOT
  const snapshot = {
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    finalized: JSON.parse(
      JSON.stringify(store.finalized)
    ),
    runner: runnerName,
  }

  store.history.unshift(snapshot)

  // Keep only last 2
  if (store.history.length > 2) {
    store.history.pop()
  }

  // Clear orders
  store.finalized = {}
  store.runner = null

  res.json({ success: true })
}
