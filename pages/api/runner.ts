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

  if (action === "assign") {
    store.runner = user
  }

  if (action === "withdraw") {
    store.runner = null
  }

  res.json({ success: true })
}
