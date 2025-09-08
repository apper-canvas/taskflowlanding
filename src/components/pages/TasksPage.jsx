import React, { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import TaskList from "@/components/organisms/TaskList"
import TaskModal from "@/components/organisms/TaskModal"
import Sidebar from "@/components/organisms/Sidebar"
import Header from "@/components/organisms/Header"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import useTasks from "@/hooks/useTasks"
import useCategories from "@/hooks/useCategories"

const TasksPage = () => {
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    searchTasks,
    getTasksByCategory
  } = useTasks()

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError
  } = useCategories()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("created")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query)) ||
        task.category.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(task => task.category === selectedCategory)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
        
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        
        case "title":
          return a.title.localeCompare(b.title)
        
        case "created":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

    return filtered
  }, [tasks, searchQuery, selectedCategory, sortBy])

  // Calculate task counts for categories
  const taskCounts = useMemo(() => {
    const counts = { personal: 0 }
    
    categories.forEach(category => {
      counts[category.name] = 0
    })

    tasks.forEach(task => {
      if (counts.hasOwnProperty(task.category)) {
        counts[task.category]++
      } else {
        counts[task.category] = (counts[task.category] || 0) + 1
      }
    })

    return counts
  }, [tasks, categories])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category)
    setSearchQuery("")
    
    if (category === "all") {
      await loadTasks()
    } else {
      await getTasksByCategory(category)
    }
  }

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption)
  }

  const handleAddTask = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId)
    }
  }

  const handleModalSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.Id, taskData)
      } else {
        await createTask(taskData)
      }
      setIsModalOpen(false)
      setEditingTask(null)
    } catch (err) {
      // Error handled in hooks
    }
  }

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  if (tasksLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            taskCounts={taskCounts}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            isOpen={false}
            onClose={handleCloseSidebar}
            isMobile={false}
          />
          <div className="flex-1">
            <Header
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onToggleSidebar={handleToggleSidebar}
              selectedCategory={selectedCategory}
            />
            <Loading />
          </div>
        </div>
      </div>
    )
  }

  if (tasksError || categoriesError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            taskCounts={taskCounts}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            isOpen={false}
            onClose={handleCloseSidebar}
            isMobile={false}
          />
          <div className="flex-1">
            <Header
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onToggleSidebar={handleToggleSidebar}
              selectedCategory={selectedCategory}
            />
            <Error
              message={tasksError || categoriesError}
              onRetry={loadTasks}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          taskCounts={taskCounts}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          isOpen={false}
          onClose={handleCloseSidebar}
          isMobile={false}
        />

        {/* Mobile Sidebar */}
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          taskCounts={taskCounts}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
          isMobile={true}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Header
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onToggleSidebar={handleToggleSidebar}
            selectedCategory={selectedCategory}
          />

          <main className="flex-1 p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto"
            >
              {filteredAndSortedTasks.length === 0 && !searchQuery ? (
                <Empty
                  title="No tasks yet"
                  message="Start your productivity journey by creating your first task. Break down your goals into manageable steps and watch your progress grow."
                  actionLabel="Create Your First Task"
                  onAction={handleAddTask}
                  icon="CheckSquare"
                />
              ) : filteredAndSortedTasks.length === 0 && searchQuery ? (
                <Empty
                  title="No tasks found"
                  message={`No tasks match your search for "${searchQuery}". Try adjusting your search terms or create a new task.`}
                  actionLabel="Create Task"
                  onAction={handleAddTask}
                  icon="Search"
                />
              ) : (
                <TaskList
                  tasks={filteredAndSortedTasks}
                  onToggleComplete={toggleTaskComplete}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onAddTask={handleAddTask}
                  title={selectedCategory === "all" ? "All Tasks" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tasks`}
                />
              )}
            </motion.div>
          </main>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTask(null)
        }}
        onSubmit={handleModalSubmit}
        task={editingTask}
        categories={categories}
      />
    </div>
  )
}

export default TasksPage