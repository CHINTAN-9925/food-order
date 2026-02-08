"use client"

export default function ActivityTimeline({
  timeline = [],
}: any) {
  if (!timeline.length) return null

  const getColor = (type: string) => {
    if (type === "runner")
      return "bg-green-500"
    if (type === "withdraw")
      return "bg-red-500"
    if (type === "placed")
      return "bg-yellow-400"
    return "bg-gray-500"
  }

  return (
    <div
      className="
        mt-6
        bg-gradient-to-b
        from-gray-900
        to-black
        border border-gray-800
        rounded-2xl
        p-4
        shadow-xl
      "
    >
      {/* Header */}
      <h2
        className="
          text-yellow-400
          font-bold
          text-lg
          mb-4
          flex items-center gap-2
        "
      >
        🕒 Activity Timeline
      </h2>

      <div className="relative">

        {/* Vertical line */}
        <div
          className="
            absolute left-3 top-0
            w-[2px] h-full
            bg-gray-700
          "
        />

        <div className="space-y-5">

          {timeline.map((t: any) => (
            <div
              key={t.id}
              className="
                flex items-start gap-4
                group
              "
            >

              {/* Dot */}
              <div
                className={`
                  w-6 h-6
                  rounded-full
                  ${getColor(t.type)}
                  border-4
                  border-gray-900
                  shadow-lg
                  group-hover:scale-110
                  transition
                `}
              />

              {/* Content */}
              <div
                className="
                  flex-1
                  bg-gray-800/60
                  px-4 py-3
                  rounded-xl
                  border border-gray-700
                  shadow
                  hover:bg-gray-800
                  transition
                "
              >

                <div
                  className="
                    flex justify-between
                    text-sm sm:text-base
                  "
                >
                  <span>
                    {t.text}
                  </span>

                  <span
                    className="
                      text-gray-400
                      text-xs sm:text-sm
                    "
                  >
                    {t.time}
                  </span>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  )
}
