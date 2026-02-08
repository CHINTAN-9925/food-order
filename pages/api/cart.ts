import { store } from "@/lib/store"

export default function handler(req, res) {
  res.json({
  users: store.users,
  menu: store.menu,
  finalized: store.finalized,
  runner: store.runner,
  history: store.history,
  timeline: store.timeline,
  lastOrderMessage: store.lastOrderMessage,
})

}
