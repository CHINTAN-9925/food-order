import { store } from "@/lib/store"
import type {
  NextApiRequest,
  NextApiResponse,
} from "next"

type FinalizeResponse = {
  success?: boolean
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FinalizeResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const { username, item } = req.body

  if (!username || !item) {
    return res.status(400).json({
      error: "Invalid payload",
    })
  }

  if (!store.finalized[username]) {
    store.finalized[username] = {}
  }

  store.finalized[username][item.id] =
    item

  console.log(
    "FINALIZED:",
    store.finalized
  )

  res.json({ success: true })
}
