import React from "react"
import { cn } from "@/utils/cn"

const Button = React.forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-md hover:shadow-lg focus:ring-primary-500 active:scale-98",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white shadow-md hover:shadow-lg focus:ring-secondary-500 active:scale-98",
    outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 active:scale-98",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500 active:scale-98",
    danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg focus:ring-red-500 active:scale-98"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg"
  }
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button