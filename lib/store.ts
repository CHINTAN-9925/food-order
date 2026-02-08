export const store = global.store || {
  users: [],

  menu: [
    { id: "1", name: "Pizza", price: 120, emoji: "🍕" },
    { id: "2", name: "Burger", price: 80, emoji: "🍔" },
    { id: "3", name: "Pasta", price: 100, emoji: "🍝" },
    { id: "4", name: "Fries", price: 60, emoji: "🍟" },
  ],

  finalized: {},

  runner: null,

  history: [],

  lastOrderMessage: null,

  // 🕒 NEW
  timeline: [],
}

global.store = store
