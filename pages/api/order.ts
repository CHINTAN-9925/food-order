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

  // 🕒 Timestamp
  const time = new Date().toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )

  // ✅ ONLY ACTIVITY — NO CLEARING
  store.timeline.unshift({
    id: Date.now(),
    text: `Order is placed by ${runnerName}`,
    time,
    type: "placed",
  })

  res.json({ success: true })
}
