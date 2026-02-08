"use client"

import { useState } from "react"
import Toast from "./Toast"

export default function RunnerControls({
  username,
  runner,
}: any) {
  const [toast, setToast] = useState("")
  const [showToast, setShowToast] =
    useState(false)

  const show = (msg: string) => {
    setToast(msg)
    setShowToast(true)
  }

  const callApi = async (
    url: string,
    body?: any,
    msg?: string
  ) => {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: body
        ? JSON.stringify(body)
        : undefined,
    })

    if (msg) show(msg)
  }

  // Assign runner
  const assignRunner = () =>
    callApi("/api/runner", {
      action: "assign",
      user: username,
    })

  // Withdraw runner
  const withdrawRunner = () =>
    callApi("/api/runner", {
      action: "withdraw",
      user: username,
    })

  // ✅ PLACE ORDER — FIXED API
  const placeOrder = () =>
    callApi(
      "/api/order", // ← Correct endpoint
      null,
      "Order placed"
    )

  // Clear orders
  const clearOrders = () =>
    callApi(
      "/api/reset",
      null,
      "Orders cleared"
    )

  const isRunner =
    runner === username
  const someoneElseRunner =
    runner && !isRunner

  return (
    <>
      <div
        className="
          grid grid-cols-1
          sm:flex gap-3 w-full
        "
      >

        {/* I AM GETTING FOOD */}
        <button
          disabled={someoneElseRunner}
          onClick={assignRunner}
          className={`
            w-full sm:w-auto
            px-5 py-3
            rounded-md
            font-semibold
            transition

            ${
              someoneElseRunner
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-yellow-400 text-black"
            }
          `}
        >
          I Am Getting Food
        </button>

        {/* RUNNER CONTROLS */}
        {isRunner && (
          <>
            {/* Withdraw */}
            <button
              onClick={withdrawRunner}
              className="
                w-full sm:w-auto
                px-5 py-3
                rounded-md
                font-semibold
                bg-red-600
              "
            >
              Withdraw
            </button>

            {/* Place Order */}
            <button
              onClick={placeOrder}
              className="
                w-full sm:w-auto
                px-5 py-3
                rounded-md
                font-semibold
                bg-green-600
              "
            >
              Place Order
            </button>

            {/* Clear Orders */}
            <button
              onClick={clearOrders}
              className="
                w-full sm:w-auto
                px-5 py-3
                rounded-md
                font-semibold
                bg-indigo-600
              "
            >
              Clear Today’s Orders
            </button>
          </>
        )}
      </div>

      {/* Toast */}
      <Toast
        message={toast}
        show={showToast}
        onClose={() =>
          setShowToast(false)
        }
      />
    </>
  )
}
