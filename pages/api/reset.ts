import { store } from "@/lib/store"
import type {
  NextApiRequest,
  NextApiResponse,
} from "next"

type ResetResponse = {
  success: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResetResponse>
) {
  if (!store.runner) {
    return res.json({ success: false })
  }

  const runnerName = store.runner
  const now = new Date()

  const day = String(
    now.getDate()
  ).padStart(2, "0")
  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0")
  const year = now.getFullYear()

  const formattedDate =
    `${day}/${month}/${year}`

  const snapshot = {
    id: Date.now(),
    date: formattedDate,
    finalized: JSON.parse(
      JSON.stringify(store.finalized)
    ),
    runner: runnerName,
  }

  store.history.unshift(snapshot)

  if (store.history.length > 2) {
    store.history.pop()
  }

  store.finalized = {}
  store.runner = null

  const time = now.toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )

  store.timeline.unshift({
    id: Date.now(),
    text: `${runnerName} cleared all orders`,
    time,
    type: "cleared",
  })

  res.json({ success: true })
}
