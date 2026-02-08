"use client"

import { useEffect, useState } from "react"

export default function SharedPanel() {
  const [data, setData] = useState<any>(null)

  // 🔄 Poll shared state
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/cart")
      const json = await res.json()
      setData(json)
    }

    fetchData()
    const i = setInterval(fetchData, 2000)
    return () => clearInterval(i)
  }, [])

  if (!data) return null

  let grand = 0

  // 📊 BUILD SUMMARY
  const summary: any = {}

  Object.values(data.finalized || {}).forEach(
    (items: any) => {
      Object.values(items).forEach((it: any) => {
        if (!summary[it.name]) {
          summary[it.name] = 0
        }
        summary[it.name] += it.qty
      })
    }
  )

  return (
    <div
      className="
        w-full lg:w-80
        bg-gradient-to-b
        from-gray-900
        to-black
        text-white
        p-4
        lg:sticky lg:top-0
        h-full lg:h-screen
        overflow-y-auto
        border-l border-gray-800
      "
    >

      {/* 🌟 RUNNER STATUS */}
      <div className="relative mb-6">

        {/* Glow */}
        <div
          className={`
            absolute inset-0 rounded-2xl blur-xl opacity-70
            ${
              data.runner
                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                : "bg-gradient-to-r from-orange-500 to-yellow-500"
            }
          `}
        />

        {/* Banner */}
        <div
          className={`
            relative overflow-hidden rounded-2xl p-4
            text-center shadow-2xl backdrop-blur-md
            border animate-pulse
            ${
              data.runner
                ? "bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 border-green-300/30"
                : "bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 border-yellow-300/30"
            }
          `}
        >

          {/* Shine Sweep */}
          <div className="
            absolute inset-0
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            animate-[shine_3s_linear_infinite]
          " />

          {data.runner ? (
            <div className="relative z-10">

              <div className="
                text-xl font-extrabold
                flex items-center justify-center gap-2
              ">
                <span className="animate-bounce">
                  🚴
                </span>

                {data.runner}
              </div>

              <div className="text-sm tracking-wide">
                is bringing the food
              </div>

            </div>
          ) : (
            <div className="relative z-10">

              <div className="text-xl font-extrabold">
                🍽 No one is getting the food yet
              </div>

              <div className="
                text-sm tracking-wide
                text-yellow-100
              ">
                Be the first one 🚴
              </div>

            </div>
          )}

        </div>
      </div>

      {/* 📦 CLEAR ORDERS MESSAGE ONLY */}
      {data.lastOrderMessage &&
        data.lastOrderMessage.includes("cleared") && (
          <div
            className="
              mb-5
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              px-4 py-2
              rounded-xl
              text-center
              font-semibold
              shadow-lg
              animate-pulse
            "
          >
            {data.lastOrderMessage}
          </div>
        )}

      {/* HEADER */}
      <h2 className="
        font-bold text-xl
        text-yellow-400 mb-3
      ">
        🧾 Orders
      </h2>

      {/* 📊 SUMMARY */}
      {Object.keys(summary).length > 0 && (
        <div className="
          mb-5
          bg-gray-800/70
          border border-gray-700
          p-4
          rounded-2xl
        ">
          <h3 className="
            font-bold text-green-400 mb-2
          ">
            📊 Summary
          </h3>

          {Object.entries(summary).map(
            ([name, qty]: any) => (
              <div
                key={name}
                className="
                  flex justify-between
                  text-sm
                  border-b border-gray-700
                  pb-1
                "
              >
                <span>🍽 {name}</span>

                <span className="
                  text-yellow-300 font-bold
                ">
                  × {qty}
                </span>
              </div>
            )
          )}
        </div>
      )}

      {/* EMPTY STATE */}
      {Object.keys(data.finalized || {}).length === 0 && (
        <div className="
          bg-gray-800/60
          border border-gray-700
          p-4
          rounded-xl
          text-center
          text-sm
          text-gray-400
        ">
          No active orders 🍽
        </div>
      )}

      {/* 👤 USER ORDERS */}
      {Object.entries(data.finalized || {}).map(
        ([user, items]: any) => {
          let total = 0

          return (
            <div
              key={user}
              className="
                mb-4
                bg-gray-800/70
                p-4
                rounded-2xl
                border border-gray-700
                shadow
              "
            >

              {/* USER HEADER */}
              <div className="
                flex items-center gap-3 mb-2
              ">

                <div className="
                  w-10 h-10
                  rounded-full
                  bg-gradient-to-r
                  from-orange-500
                  to-yellow-400
                  flex items-center justify-center
                  font-bold text-black
                ">
                  {user.charAt(0).toUpperCase()}
                </div>

                <h3 className="
                  font-bold text-orange-400 text-lg
                ">
                  {user}
                </h3>
              </div>

              {Object.values(items).map(
                (it: any) => {
                  total += it.price * it.qty

                  return (
                    <div
                      key={it.id}
                      className="
                        flex justify-between text-sm
                      "
                    >
                      <span>
                        {it.name} × {it.qty}
                      </span>

                      <span className="text-yellow-300">
                        ₹{it.price * it.qty}
                      </span>
                    </div>
                  )
                }
              )}

              <div className="
                text-right font-bold
                text-yellow-300 mt-2
              ">
                ₹{total}
              </div>

              {(grand += total) && ""}
            </div>
          )
        }
      )}

      {/* 💰 GRAND TOTAL */}
      <div className="
        sticky bottom-0
        bg-gray-950/90
        p-4
        rounded-2xl
        border border-gray-800
        shadow-lg
        mt-4
      ">
        <div className="
          flex justify-between
          font-bold text-lg
        ">
          <span>Grand Total</span>

          <span className="text-green-400">
            ₹{grand}
          </span>
        </div>
      </div>

    </div>
  )
}
