import React from "react"
import { motion } from "framer-motion"
import SearchBar from "@/components/molecules/SearchBar"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Header = ({ 
  searchQuery, 
  onSearchChange, 
  onToggleSidebar,
  selectedCategory = "all" 
}) => {
  const getCategoryTitle = () => {
    if (selectedCategory === "all") return "All Tasks"
    return selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 lg:p-6 sticky top-0 z-30"
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="p-2 h-auto lg:hidden"
        >
          <ApperIcon name="Menu" size={20} />
        </Button>

        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="flex items-center gap-3 min-w-0">
            <div className="lg:hidden flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <ApperIcon name="CheckSquare" size={18} className="text-white" />
              </div>
<h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Taskflow pro
              </h1>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder={`Search ${getCategoryTitle().toLowerCase()}...`}
            />
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header