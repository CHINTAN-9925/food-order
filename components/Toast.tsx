"use client"

import { useEffect } from "react"

export default function Toast({
  message,
  show,
  onClose,
}: any) {
  useEffect(() => {
    if (!show) return

    const t = setTimeout(() => {
      onClose()
    }, 2500)

    return () => clearTimeout(t)
  }, [show])

  if (!show) return null

  return (
    <div
      className="
        fixed bottom-6 left-1/2
        -translate-x-1/2
        bg-gray-900
        text-white
        px-6 py-3
        rounded-lg
        shadow-2xl
        border border-gray-700
        animate-slideUp
        z-[999]
      "
    >
      {message}
    </div>
  )
}
