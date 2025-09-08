import React from "react"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const PrioritySelector = ({ value, onChange, className }) => {
  const priorities = [
    { value: "low", label: "Low Priority", color: "text-green-600" },
    { value: "medium", label: "Medium Priority", color: "text-accent-600" },
    { value: "high", label: "High Priority", color: "text-red-600" }
  ]

  return (
    <div className={cn("relative", className)}>
      <ApperIcon 
        name="Flag" 
        size={18} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
      />
      <Select
        value={value}
        onChange={onChange}
        className="pl-10 appearance-none"
      >
        <option value="">Select Priority</option>
        {priorities.map(priority => (
          <option key={priority.value} value={priority.value}>
            {priority.label}
          </option>
        ))}
      </Select>
    </div>
  )
}

export default PrioritySelector