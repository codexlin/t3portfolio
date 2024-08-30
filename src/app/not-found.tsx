"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  // Calculate the position of the white circle within the parent circle
  const parentCircleRadius = 50 // Adjust this based on your design

  // Check if window is defined before accessing mousePosition
  const deltaX = typeof window !== "undefined" ? mousePosition.x - window.innerWidth / 2 : 0
  const deltaY = typeof window !== "undefined" ? mousePosition.y - window.innerHeight / 2 : 0

  const angle = Math.atan2(deltaY, deltaX)
  const whiteCircleX = typeof window !== "undefined" ? Math.cos(angle) * parentCircleRadius : 0
  const whiteCircleY = typeof window !== "undefined" ? Math.sin(angle) * parentCircleRadius : 0
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-5 text-[#e85444]">
        <span className="text-[200px]">4</span>
        <span className="relative flex items-center justify-center">
          <span
            className="rounded-full bg-[#e85444] p-20"
            style={{
              top: `calc(50% - 10px)`,
              left: `calc(50% - 10px)`,
            }}
          >
            <span
              className="absolute rounded-full bg-[black] p-3"
              style={{
                top: `calc(50% - 15px + ${whiteCircleY}px)`,
                left: `calc(50% - 15px + ${whiteCircleX}px)`,
              }}
            >
              <span className="absolute rounded-full p-1"></span>
            </span>
          </span>
        </span>
        <span className="text-[200px]">4</span>
      </div>
      <h2 className="text-3xl font-semibold text-black dark:text-white">
        This Page does not exist
      </h2>
      <Link
        href="/"
        className="underline transition-colors duration-300 dark:text-white dark:hover:text-slate-300"
      >
        Return Home
      </Link>
    </div>
  )
}
