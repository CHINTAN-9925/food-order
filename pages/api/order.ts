import { store } from "@/lib/store"

export default function handler(req, res) {
  if (!store.runner) {
    return res.json({ success: false })
  }

  const runnerName = store.runner

  // 🧾 ARCHIVE CURRENT ORDERS
  const snapshot = {
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    finalized: JSON.parse(
      JSON.stringify(store.finalized)
    ),
    runner: runnerName,
  }

  store.history.unshift(snapshot)

  // Keep only last 2 orders
  if (store.history.length > 2) {
    store.history.pop()
  }

  // 🕒 TIMELINE ENTRY
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  store.timeline.unshift({
    id: Date.now(),
    text: `${runnerName} placed the lunch order`,
    time,
    type: "placed",
  })

  // 🧹 CLEAR CURRENT ORDERS
  store.finalized = {}

  // Remove runner
  store.runner = null

  res.json({ success: true })
}
