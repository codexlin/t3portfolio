"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Background() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const darkModeClass =
    "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]"
  const lightModeClass =
    "bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]"

  if (!mounted) {
    return null
  }

  return (
    <div
      className={`absolute inset-0 -z-10 bg-[size:14px_24px] ${
        theme === "dark" ? darkModeClass : lightModeClass
      }`}
    >
      {theme !== "dark" && (
        <div className="absolute inset-x-0 top-0 -z-10 m-auto size-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
      )}
    </div>
  )
}
