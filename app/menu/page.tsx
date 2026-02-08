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
        flex flex-col
        bg-gradient-to-br
        from-gray-900
        via-gray-950
        to-black
        text-white
      "
    >

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col lg:flex-row">

        {/* LEFT */}
        <div
          className="
            flex-1
            px-3 py-4 sm:px-6
            pb-32
            overflow-y-auto
          "
        >

          {/* HEADER */}
          <div className="
            sticky top-0 z-40
            backdrop-blur-md
            bg-gray-900/80
            border border-gray-800
            rounded-2xl
            p-3 sm:p-4
            shadow-xl
            mb-6
          ">
            <h1 className="
              text-lg sm:text-2xl
              font-extrabold
              text-yellow-400
              mb-2
            ">
              🍽 Lunch Menu
            </h1>

            <RunnerControls
              username={username}
              runner={data.runner}
            />
          </div>

          {/* RUNNER */}
          {data.runner && (
            <div className="relative mb-8">

              <div className="
                absolute inset-0
                rounded-2xl blur-xl
                opacity-70
                bg-gradient-to-r
                from-green-400
                to-emerald-500
              " />

              <div className="
                relative rounded-2xl
                p-3 text-center
                shadow-2xl border
                animate-pulse
                bg-gradient-to-r
                from-green-600
                via-emerald-500
                to-green-600
              ">
                🚴 {data.runner} is getting the food
              </div>

            </div>
          )}

          {/* TIMELINE */}
          {data.timeline?.length > 0 && (
            <div className="
              mt-10
              bg-gradient-to-b
              from-gray-900
              to-black
              border border-gray-800
              rounded-2xl
              p-5
              shadow-xl
              mb-6
            ">

              <h2 className="
                text-yellow-400
                font-bold text-lg
                mb-6
              ">
                🕒 Activity Timeline
              </h2>

              <div className="relative">

                <div className="
                  absolute left-[9px] top-0
                  w-[2px] h-full
                  bg-gray-700
                " />

                <div className="space-y-6">

                  {data.timeline.map((t: any) => {

                    const dotColor =
                      t.type === "withdraw"
                        ? "bg-red-500"
                        : "bg-white"

                    return (
                      <div
                        key={t.id}
                        className="flex items-start gap-4"
                      >

                        <div className={`
                          relative z-10
                          w-5 h-5 mt-2
                          rounded-full
                          ${dotColor}
                          border-2 border-gray-900
                        `} />

                        <div className="
                          flex-1
                          bg-gray-800/60
                          px-4 py-3
                          rounded-xl
                          border border-gray-700
                        ">
                          <div className="
                            flex justify-between
                            text-sm sm:text-base
                          ">
                            <span>{t.text}</span>
                            <span className="
                              text-gray-400
                              text-xs sm:text-sm
                            ">
                              {t.time}
                            </span>
                          </div>
                        </div>

                      </div>
                    )
                  })}

                </div>

              </div>
            </div>
          )}

          {/* FOOD GRID */}
          <div className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-3 sm:gap-5
          ">
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

      </div>

      {/* 🌙 STICKY FOOTER */}
      <footer
        className="
          border-t border-gray-800
          bg-gradient-to-r
          from-gray-900
          via-gray-950
          to-black
          text-center
          py-6
          text-sm
          text-gray-400
        "
      >
        <div className="
          font-medium
          tracking-wide
          flex items-center
          justify-center
          gap-1
        ">
          Vibe coded with

          <span className="
            text-red-500
            animate-pulse
          ">
            ❤️
          </span>

          by

          <span className="
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-orange-400
            to-yellow-300
            font-semibold
          ">
            Chintan
          </span>
        </div>

        <div className="text-xs mt-1 opacity-60">
          Collaborative Lunch Pre-Ordering App
        </div>
      </footer>

    </div>
  )
}
