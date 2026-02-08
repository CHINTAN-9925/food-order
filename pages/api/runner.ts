import { store } from "@/lib/store"
import type {
  NextApiRequest,
  NextApiResponse,
} from "next"

type RunnerResponse = {
  success: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RunnerResponse>
) {
  const { action, user } = req.body

  const time = new Date().toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )

  if (action === "assign") {
    store.runner = user

    store.timeline.unshift({
      id: Date.now(),
      text: `${user} is getting the food`,
      time,
      type: "runner",
    })
  }

  if (action === "withdraw") {
    store.runner = null

    store.timeline.unshift({
      id: Date.now(),
      text: `${user} withdrew from getting the food`,
      time,
      type: "withdraw",
    })
  }

  res.json({ success: true })
}
