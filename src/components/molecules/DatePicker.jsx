import React from "react"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"
import { format } from "date-fns"

const DatePicker = ({ value, onChange, className }) => {
  const handleChange = (e) => {
    const dateString = e.target.value
    if (dateString) {
      onChange(new Date(dateString))
    } else {
      onChange(null)
    }
  }

  const formatValue = () => {
    if (!value) return ""
    return format(value, "yyyy-MM-dd")
  }

  return (
    <div className={cn("relative", className)}>
      <ApperIcon 
        name="Calendar" 
        size={18} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
      />
      <Input
        type="date"
        value={formatValue()}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  )
}

export default DatePicker