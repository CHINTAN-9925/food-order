"use client"

import { useEffect, useState } from "react"
import FoodCard from "@/components/FoodCard"
import SharedPanel from "@/components/SharedPanel"
import RunnerControls from "@/components/RunnerControls"

export default function MenuPage() {
  const [data, setData] = useState<any>(null)
  const [username, setUsername] = useState("")
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "")
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/cart")
      setData(await res.json())
    }

    fetchData()
    const i = setInterval(fetchData, 2000)
    return () => clearInterval(i)
  }, [])

  if (!data) return null

  const notificationCount =
    Object.keys(data.finalized || {}).length

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-gray-900
        via-gray-950
        to-black
        text-white
        flex flex-col lg:flex-row
      "
    >

      {/* LEFT — MENU */}
      <div className="flex-1 px-3 py-4 sm:px-6">

        {/* HEADER */}
        <div
          className="
            sticky top-0 z-40
            backdrop-blur-md
            bg-gray-900/80
            border border-gray-800
            rounded-2xl
            p-3 sm:p-4
            shadow-xl
            mb-4
          "
        >

          <h1
            className="
              text-lg sm:text-2xl
              font-extrabold
              text-yellow-400
              mb-2
            "
          >
            🍽 Lunch Menu
          </h1>

          <RunnerControls
            username={username}
            runner={data.runner}
          />

        </div>

        {/* 🌟 MOBILE RUNNER BANNER */}
        {data.runner && (
          <div className="sm:hidden relative mb-4">

            <div className="
              absolute inset-0 rounded-2xl blur-xl opacity-70
              bg-gradient-to-r from-green-400 to-emerald-500
            " />

            <div className="
              relative overflow-hidden rounded-2xl p-3
              text-center shadow-2xl border animate-pulse
              bg-gradient-to-r
              from-green-600 via-emerald-500 to-green-600
            ">

              <div className="
                relative z-10 font-bold text-sm
              ">
                {data.runner} is getting the food
              </div>

            </div>
          </div>
        )}

        {/* FOOD GRID */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-3 sm:gap-5
          "
        >
          {data.menu.map((item: any) => (
            <FoodCard
              key={item.id}
              item={item}
              username={username}
            />
          ))}
        </div>

      </div>

      {/* DESKTOP PANEL */}
      <div className="hidden lg:block">
        <SharedPanel />
      </div>

      {/* 📱 FLOAT BUTTONS — HISTORY + ORDERS */}
      <div className="
        lg:hidden
        fixed bottom-4
        left-0 right-0
        px-4
        flex justify-between
        z-50
      ">

        {/* HISTORY BUTTON */}
        <a
          href="/history"
          className="
            bg-gradient-to-r
            from-indigo-600
            to-violet-500
            text-white
            font-bold
            px-6 py-3
            rounded-full
            shadow-2xl
            active:scale-95
            transition
          "
        >
          History
        </a>

        {/* ORDERS BUTTON */}
        <button
          onClick={() => setShowPanel(true)}
          className="
            relative
            bg-gradient-to-r
            from-orange-500
            to-yellow-400
            text-black
            font-bold
            px-6 py-3
            rounded-full
            shadow-2xl
            active:scale-95
            transition
          "
        >
          Orders

          {notificationCount > 0 && (
            <span
              className="
                absolute -top-2 -right-2
                bg-red-600 text-white
                text-xs font-bold
                w-6 h-6
                flex items-center justify-center
                rounded-full
                border-2 border-black
              "
            >
              {notificationCount}
            </span>
          )}
        </button>

      </div>

      {/* 📱 MOBILE DRAWER */}
      {showPanel && (
        <div
          className="
            fixed inset-0
            bg-black/60
            z-50
            flex items-end
          "
        >
          <div
            className="
              bg-gray-900
              w-full
              max-h-[85vh]
              rounded-t-2xl
              p-4
              overflow-y-auto
            "
          >

            <div className="flex justify-between mb-3">
              <h2 className="font-bold text-yellow-400">
                Orders
              </h2>

              <button
                onClick={() => setShowPanel(false)}
                className="text-red-400"
              >
                Close
              </button>
            </div>

            <SharedPanel />

          </div>
        </div>
      )}

    </div>
  )
}
