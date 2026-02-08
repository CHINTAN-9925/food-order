/* eslint-disable no-var */

// 🧠 Store Type
type StoreType = {
  users: string[]
  menu: any[]
  finalized: Record<string, any>
  runner: string | null
  timeline: any[]
  history: any[]
}

// 🌍 Extend globalThis
declare global {
  var __lunchStore__: StoreType | undefined
}

// 🧾 Initial Store Data
const initialStore: StoreType = {
  users: [],

  menu: [
    { id: "1", name: "Pizza", price: 120, emoji: "🍕" },
    { id: "2", name: "Burger", price: 80, emoji: "🍔" },
    { id: "3", name: "Pasta", price: 100, emoji: "🍝" },
    { id: "4", name: "Fries", price: 60, emoji: "🍟" },
  ],

  finalized: {},
  runner: null,
  timeline: [],
  history: [],
}

// ♻️ Singleton Pattern
export const store =
  globalThis.__lunchStore__ ??
  initialStore

// Save reference
globalThis.__lunchStore__ = store
