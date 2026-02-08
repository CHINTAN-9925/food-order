"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
  const [name, setName] = useState("")
  const router = useRouter()

  const join = async () => {
    localStorage.setItem("username", name)

    await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: name }),
    })

    router.push("/menu")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-80">
        <h1 className="text-2xl font-bold mb-4 text-white text-center">
          🍽 Lunch Pre-Order
        </h1>

        <input
          className="border border-gray-600 bg-gray-900 text-white p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={join}
          className="bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-2 rounded-xl w-full font-semibold"
        >
          Join Session
        </button>
      </div>
    </div>
  )
}
