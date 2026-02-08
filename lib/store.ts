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

  // 🥘 Indian Main Course
  { id: "1", name: "Tawa Paneer", price: 135, emoji: "🍛" },
  { id: "2", name: "Sev Tameta", price: 120, emoji: "🍅" },
  { id: "3", name: "Dal Fry", price: 110, emoji: "🥣" },

  // 🍚 Rice
  { id: "4", name: "Jeera Rice", price: 90, emoji: "🍚" },
  { id: "5", name: "Fried Rice", price: 110, emoji: "🍜" },

  // 🫓 Breads
  { id: "6", name: "Naan", price: 40, emoji: "🫓" },
  { id: "7", name: "Chapati", price: 20, emoji: "🥙" },
  { id: "8", name: "Tandoori Roti", price: 35, emoji: "🫓" },

  // 🥟 Snacks
  { id: "9", name: "Samosa", price: 25, emoji: "🥟" },
  { id: "10", name: "Pav Bhaji", price: 120, emoji: "🥘" },

  // 🥞 South Indian
  { id: "11", name: "Plain Dosa", price: 70, emoji: "🥞" },
  { id: "12", name: "Masala Dosa", price: 90, emoji: "🥞" },
  { id: "13", name: "Mysore Masala Dosa", price: 110, emoji: "🥞" },

  { id: "14", name: "Masala Uttapam", price: 95, emoji: "🥞" },
  { id: "15", name: "Tomato Onion Uttapam", price: 100, emoji: "🥞" },

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
