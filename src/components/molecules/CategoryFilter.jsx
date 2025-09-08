import React from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory, taskCounts }) => {
  const allTasksCount = Object.values(taskCounts).reduce((sum, count) => sum + count, 0)

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Categories</h3>
      
      <div className="space-y-1">
        <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.15 }}>
          <Button
            variant={selectedCategory === "all" ? "primary" : "ghost"}
            size="sm"
            onClick={() => onSelectCategory("all")}
            className={cn(
              "w-full justify-between text-left px-3 py-2 rounded-lg",
              selectedCategory === "all" ? "shadow-md" : "hover:bg-gray-50"
            )}
          >
            <div className="flex items-center gap-2">
              <ApperIcon name="List" size={16} />
              <span>All Tasks</span>
            </div>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
              {allTasksCount}
            </span>
          </Button>
        </motion.div>

        {categories.map(category => (
          <motion.div 
            key={category.Id} 
            whileHover={{ x: 2 }} 
            transition={{ duration: 0.15 }}
          >
            <Button
              variant={selectedCategory === category.name ? "primary" : "ghost"}
              size="sm"
              onClick={() => onSelectCategory(category.name)}
              className={cn(
                "w-full justify-between text-left px-3 py-2 rounded-lg",
                selectedCategory === category.name ? "shadow-md" : "hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="capitalize">{category.name}</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {taskCounts[category.name] || 0}
              </span>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter