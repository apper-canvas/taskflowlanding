import React from "react"
import { cn } from "@/utils/cn"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    high: "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-200",
    medium: "bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800 border border-accent-200",
    low: "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-200",
    completed: "bg-gradient-to-r from-success to-green-600 text-white",
    overdue: "bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})

Badge.displayName = "Badge"

export default Badge