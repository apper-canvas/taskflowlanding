import React from "react"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const SearchBar = ({ value, onChange, placeholder = "Search tasks...", className }) => {
  return (
    <div className={cn("relative", className)}>
      <ApperIcon 
        name="Search" 
        size={18} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
      />
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 focus:bg-white"
      />
    </div>
  )
}

export default SearchBar