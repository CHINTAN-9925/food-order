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

  // Clear orders
  store.finalized = {}

  // Remove runner
  store.runner = null

  // Clear activity completely
  store.timeline = []

  res.json({ success: true })
}
