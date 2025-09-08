import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = React.forwardRef(({ className, checked, onChange, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={cn(
          "peer h-5 w-5 rounded border-2 border-gray-300 bg-white checked:bg-gradient-to-r checked:from-primary-500 checked:to-primary-600 checked:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 cursor-pointer transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
      {checked && (
        <ApperIcon 
          name="Check" 
          size={14} 
          className="absolute top-0.5 left-0.5 text-white pointer-events-none animate-scale-up" 
        />
      )}
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox