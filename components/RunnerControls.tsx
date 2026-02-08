"use client"

import { useState } from "react"
import Toast from "./Toast"

export default function RunnerControls({
  username,
  runner,
}: any) {
  const [toast, setToast] = useState("")
  const [showToast, setShowToast] = useState(false)

  const show = (msg: string) => {
    setToast(msg)
    setShowToast(true)
  }

  const callApi = async (
    url: string,
    body?: any,
    toastMsg?: string
  ) => {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (toastMsg) show(toastMsg)
  }

  const assignRunner = () =>
    callApi("/api/runner", {
      action: "assign",
      user: username,
    })

  const withdrawRunner = () =>
    callApi("/api/runner", {
      action: "withdraw",
      user: username,
    })

  const clearOrders = () =>
    callApi(
      "/api/reset",
      null,
      "All orders cleared"
    )

  const isRunner = runner === username
  const someoneElseRunner =
    runner && !isRunner

  return (
    <>
      <div
        className="
          grid
          grid-cols-1
          sm:flex
          gap-3
          w-full
        "
      >

        {/* ASSIGN BUTTON */}
        <button
          disabled={someoneElseRunner}
          onClick={assignRunner}
          title={
            someoneElseRunner
              ? `${runner} is getting the food`
              : ""
          }
          className={`
            w-full sm:w-auto
            px-5 py-3
            rounded-md
            font-semibold
            border
            shadow
            transition-all

            ${
              someoneElseRunner
                ? `
                  bg-gray-800
                  border-gray-700
                  text-gray-500
                  cursor-not-allowed
                `
                : `
                  bg-gradient-to-r
                  from-orange-500 to-amber-400
                  text-black
                  hover:scale-[1.02]
                `
            }
          `}
        >
          I Am Getting Food
        </button>

        {/* RUNNER CONTROLS */}
        {isRunner && (
          <>
            <button
              onClick={withdrawRunner}
              className="
                w-full sm:w-auto
                px-5 py-3
                rounded-md
                font-semibold
                bg-gradient-to-r
                from-red-600 to-rose-500
                shadow
                hover:scale-[1.02]
              "
            >
              Withdraw
            </button>

            <button
              onClick={clearOrders}
              className="
                w-full sm:w-auto
                px-5 py-3
                rounded-md
                font-semibold
                bg-gradient-to-r
                from-indigo-600 to-violet-500
                shadow
                hover:scale-[1.02]
              "
            >
              Clear Today’s Orders
            </button>
          </>
        )}

      </div>

      {/* TOAST */}
      <Toast
        message={toast}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  )
}
