import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "@/components/molecules/TaskCard"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask, 
  onAddTask,
  title = "Tasks" 
}) => {
  const [draggedTaskId, setDraggedTaskId] = useState(null)

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/html", e.target.outerHTML)
  }

  const handleDragEnd = () => {
    setDraggedTaskId(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDraggedTaskId(null)
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 px-4 text-center"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6">
          <ApperIcon name="CheckSquare" size={32} className="text-primary-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No tasks yet
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-md">
          Start your productivity journey by creating your first task. Break down your goals into manageable steps and watch your progress grow.
        </p>
        
        <Button onClick={onAddTask} size="lg" className="shadow-lg hover:shadow-xl">
          <ApperIcon name="Plus" size={18} className="mr-2" />
          Create Your First Task
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-gray-600 mt-1">
            {tasks.filter(task => !task.completed).length} active, {tasks.filter(task => task.completed).length} completed
          </p>
        </div>
        
        <Button onClick={onAddTask} className="shadow-md hover:shadow-lg">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Task
        </Button>
      </div>

      <div 
        className="space-y-3"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <AnimatePresence>
          {tasks.map(task => (
            <div
              key={task.Id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.Id)}
              onDragEnd={handleDragEnd}
            >
              <TaskCard
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                isDragging={draggedTaskId === task.Id}
                dragHandleProps={{
                  onMouseDown: (e) => e.preventDefault()
                }}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default TaskList