"use client"

import { useEffect, useState } from "react"

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch("/api/history")
      setHistory(await res.json())
    }

    fetchHistory()
  }, [])

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-gray-900
        via-gray-950
        to-black
        text-white
        p-4 sm:p-6
      "
    >

      <h1 className="
        text-2xl font-bold
        text-yellow-400 mb-4
      ">
        🧾 Order History
      </h1>

      <p className="
        text-sm text-gray-400 mb-6
      ">
        Only last 2 orders are saved
      </p>

      {history.length === 0 && (
        <div className="
          bg-gray-800 p-4 rounded-xl
          text-gray-400 text-sm
        ">
          No history available
        </div>
      )}

      <div className="space-y-4">

        {history.map((order) => {
          let grand = 0

          return (
            <div
              key={order.id}
              className="
                bg-gray-800/70
                border border-gray-700
                rounded-2xl
                p-4
                shadow
              "
            >

              {/* HEADER */}
              <div className="
                flex justify-between mb-3
              ">
                <span className="font-bold text-indigo-400">
                  {order.date}
                </span>

                <span className="text-sm text-gray-400">
                  Runner: {order.runner}
                </span>
              </div>

              {/* USERS */}
              {Object.entries(order.finalized)
                .map(([user, items]: any) => {
                  let total = 0

                  return (
                    <div
                      key={user}
                      className="
                        mb-3
                        border-b border-gray-700
                        pb-2
                      "
                    >
                      <div className="
                        font-semibold text-orange-400
                      ">
                        {user}
                      </div>

                      {Object.values(items).map(
                        (it: any) => {
                          total +=
                            it.qty * it.price

                          return (
                            <div
                              key={it.id}
                              className="
                                flex justify-between
                                text-sm
                              "
                            >
                              <span>
                                {it.name} × {it.qty}
                              </span>

                              <span>
                                ₹{it.qty * it.price}
                              </span>
                            </div>
                          )
                        }
                      )}

                      <div className="
                        text-right text-yellow-300 font-bold
                      ">
                        ₹{total}
                      </div>

                      {(grand += total) && ""}
                    </div>
                  )
                })}

              {/* GRAND TOTAL */}
              <div className="
                text-right font-bold
                text-green-400 mt-2
              ">
                Grand Total ₹{grand}
              </div>

            </div>
          )
        })}

      </div>

      {/* BACK BUTTON */}
      <div className="mt-6">
        <a
          href="/menu"
          className="
            px-4 py-2
            bg-gray-700
            rounded-md
            text-sm
          "
        >
          ← Back to Menu
        </a>
      </div>

    </div>
  )
}
