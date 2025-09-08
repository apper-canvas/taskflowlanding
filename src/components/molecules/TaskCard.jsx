import React, { useState } from "react"
import { motion } from "framer-motion"
import { format, isAfter, isBefore, startOfDay } from "date-fns"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  isDragging = false,
  dragHandleProps = {},
  className 
}) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleToggleComplete = () => {
    if (!task.completed) {
      setIsCompleting(true)
      setTimeout(() => {
        onToggleComplete(task.Id)
        setIsCompleting(false)
      }, 300)
    } else {
      onToggleComplete(task.Id)
    }
  }

  const getPriorityBadge = () => {
    if (!task.priority) return null
    return <Badge variant={task.priority}>{task.priority}</Badge>
  }

  const getDueDateBadge = () => {
    if (!task.dueDate) return null
    
    const today = startOfDay(new Date())
    const dueDate = startOfDay(new Date(task.dueDate))
    
    if (isBefore(dueDate, today) && !task.completed) {
      return <Badge variant="overdue">Overdue</Badge>
    }
    
    return (
      <span className="text-xs text-gray-500 flex items-center gap-1">
        <ApperIcon name="Calendar" size={12} />
        {format(new Date(task.dueDate), "MMM dd")}
      </span>
    )
  }

  const getCategoryBadge = () => {
    if (!task.category || task.category === "personal") return null
    return (
      <span className="text-xs text-secondary-600 bg-secondary-50 px-2 py-1 rounded-full">
        {task.category}
      </span>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: isCompleting ? 0 : 1, 
        y: isCompleting ? -20 : 0,
        scale: isDragging ? 1.02 : 1
      }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "task-card group bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200",
        task.completed && "bg-gray-50 opacity-75",
        isDragging && "task-dragging",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-medium text-gray-900 truncate",
                task.completed && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={cn(
                  "text-sm text-gray-600 mt-1 line-clamp-2",
                  task.completed && "text-gray-400"
                )}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {getPriorityBadge()}
                {getDueDateBadge()}
                {getCategoryBadge()}
              </div>
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div 
                {...dragHandleProps}
                className="drag-handle p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <ApperIcon name="GripVertical" size={16} />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="p-1 h-auto text-gray-400 hover:text-primary-600"
              >
                <ApperIcon name="Edit2" size={16} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.Id)}
                className="p-1 h-auto text-gray-400 hover:text-red-600"
              >
                <ApperIcon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard