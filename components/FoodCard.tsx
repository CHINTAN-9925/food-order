"use client"

import { useState } from "react"

export default function FoodCard({
  item,
  username,
  locked,
}: any) {
  const [qty, setQty] = useState(0)
  const [loading, setLoading] = useState(false)

  const finalize = async () => {
    if (qty === 0) {
      alert("Select quantity first")
      return
    }

    setLoading(true)

    await fetch("/api/finalize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        item: {
          id: item.id,
          name: item.name,
          price: item.price,
          qty,
        },
      }),
    })

    setQty(0)
    setLoading(false)
  }

  return (
    <div
      className="
        bg-gray-900/70
        backdrop-blur-md
        border border-gray-800
        rounded-2xl
        p-3 sm:p-4
        shadow-xl
        hover:scale-[1.02]
        transition
      "
    >

      {/* Emoji */}
      <div className="text-4xl sm:text-5xl mb-1 sm:mb-2">
        {item.emoji}
      </div>

      {/* Name */}
      <h2 className="font-bold text-sm sm:text-lg">
        {item.name}
      </h2>

      {/* Price */}
      <p className="
        text-yellow-400
        font-semibold
        text-sm sm:text-base
      ">
        ₹{item.price}
      </p>

      {/* Quantity Controls */}
      <div className="
        flex items-center justify-center
        gap-3 my-2
      ">

        <button
          onClick={() =>
            setQty(Math.max(0, qty - 1))
          }
          className="
            bg-gray-800
            w-8 h-8
            rounded-lg
            text-lg
            hover:bg-gray-700
          "
        >
          −
        </button>

        <span className="font-bold">
          {qty}
        </span>

        <button
          onClick={() => setQty(qty + 1)}
          className="
            bg-gray-800
            w-8 h-8
            rounded-lg
            text-lg
            hover:bg-gray-700
          "
        >
          +
        </button>
      </div>

      {/* 🔶 FINALIZE BUTTON — LESS ROUNDED */}
      <button
        onClick={finalize}
        disabled={locked || loading}
        className="
          w-full
          bg-gradient-to-r
          from-orange-500
          to-yellow-400
          text-black
          font-bold
          py-1.5 sm:py-2
          rounded-lg        /* ← Changed */
          shadow-lg
          text-sm sm:text-base
          hover:scale-105
          active:scale-95
          transition
          disabled:opacity-50
        "
      >
        {loading ? "Adding..." : "Finalize"}
      </button>

    </div>
  )
}
