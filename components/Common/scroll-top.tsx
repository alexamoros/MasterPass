"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <div className="fixed bottom-2 right-2">
      <button
        type="button"
        onClick={scrollToTop}
        className={cn(
          isVisible ? "opacity-100" : "opacity-0",
          "inline-flex items-center rounded-full bg-black p-3 text-white shadow-sm transition-opacity hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-gray-50 dark:text-black dark:focus:ring-slate-400"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-move-up size-6"
        >
          <path d="M8 6L12 2L16 6" />
          <path d="M12 2V22" />
        </svg>
      </button>
    </div>
  )
}
