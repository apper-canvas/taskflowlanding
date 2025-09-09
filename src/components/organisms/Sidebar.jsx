import React from "react"
import { motion } from "framer-motion"
import CategoryFilter from "@/components/molecules/CategoryFilter"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const Sidebar = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  taskCounts,
  sortBy,
  onSortChange,
  isOpen = true,
  onClose,
  isMobile = false
 }) => {
  const sortOptions = [
    { value: "created", label: "Date Created", icon: "Calendar" },
    { value: "priority", label: "Priority", icon: "Flag" },
    { value: "dueDate", label: "Due Date", icon: "Clock" },
    { value: "title", label: "Alphabetical", icon: "AlphabeticalSort" }
  ]

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <ApperIcon name="CheckSquare" size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
Taskflow pro
          </h1>
        </div>
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 h-auto lg:hidden"
          >
            <ApperIcon name="X" size={20} />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          taskCounts={taskCounts}
        />

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Sort By
          </h3>
          <div className="space-y-1">
            {sortOptions.map(option => (
              <motion.div 
                key={option.value} 
                whileHover={{ x: 2 }} 
                transition={{ duration: 0.15 }}
              >
                <Button
                  variant={sortBy === option.value ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => onSortChange(option.value)}
                  className={cn(
                    "w-full justify-start text-left px-3 py-2 rounded-lg",
                    sortBy === option.value ? "shadow-md" : "hover:bg-gray-50"
                  )}
                >
                  <ApperIcon name={option.icon} size={16} className="mr-2" />
                  {option.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Quick Stats
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-lg border border-primary-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-600 text-sm font-medium">Total Tasks</p>
                  <p className="text-2xl font-bold text-primary-700">
                    {Object.values(taskCounts).reduce((sum, count) => sum + count, 0)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-primary-200 rounded-lg flex items-center justify-center">
                  <ApperIcon name="List" size={20} className="text-primary-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Mobile overlay sidebar
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? 0 : "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50 lg:hidden"
        >
          {sidebarContent}
        </motion.aside>
      </>
    )
  }

  // Desktop static sidebar
  return (
    <aside className="hidden lg:flex w-80 bg-white border-r border-gray-200 flex-shrink-0">
      {sidebarContent}
    </aside>
  )
}

export default Sidebar