import { store } from "@/lib/store"
import type {
  NextApiRequest,
  NextApiResponse,
} from "next"

type OrderResponse = {
  success: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderResponse>
) {
  if (!store.runner) {
    return res.json({ success: false })
  }

  const runnerName = store.runner

  const snapshot = {
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    finalized: JSON.parse(
      JSON.stringify(store.finalized)
    ),
    runner: runnerName,
  }

  store.history.unshift(snapshot)

  if (store.history.length > 2) {
    store.history.pop()
  }

  const time = new Date().toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )

  store.timeline.unshift({
    id: Date.now(),
    text: `${runnerName} placed the lunch order`,
    time,
    type: "placed",
  })

  store.finalized = {}
  store.runner = null

  res.json({ success: true })
}
