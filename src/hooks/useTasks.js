import { useState, useEffect } from "react"
import taskService from "@/services/api/taskService"
import { toast } from "react-toastify"

const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadTasks = async () => {
    setLoading(true)
    setError("")
    
    try {
      const data = await taskService.getAll()
      setTasks(data)
    } catch (err) {
      setError(err.message || "Failed to load tasks")
      toast.error("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [...prev, newTask])
      toast.success("Task created successfully!")
      return newTask
    } catch (err) {
      toast.error("Failed to create task")
      throw err
    }
  }

  const updateTask = async (id, updateData) => {
    try {
      const updatedTask = await taskService.update(id, updateData)
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
      toast.success("Task updated successfully!")
      return updatedTask
    } catch (err) {
      toast.error("Failed to update task")
      throw err
    }
  }

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id)
      setTasks(prev => prev.filter(task => task.Id !== parseInt(id)))
      toast.success("Task deleted successfully!")
    } catch (err) {
      toast.error("Failed to delete task")
      throw err
    }
  }

  const toggleTaskComplete = async (id) => {
    try {
      const updatedTask = await taskService.toggleComplete(id)
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
      
      if (updatedTask.completed) {
        toast.success("🎉 Task completed! Great work!")
      } else {
        toast.info("Task marked as incomplete")
      }
      
      return updatedTask
    } catch (err) {
      toast.error("Failed to update task")
      throw err
    }
  }

  const searchTasks = async (query) => {
    if (!query.trim()) {
      return await loadTasks()
    }
    
    setLoading(true)
    setError("")
    
    try {
      const data = await taskService.search(query)
      setTasks(data)
    } catch (err) {
      setError(err.message || "Failed to search tasks")
      toast.error("Failed to search tasks")
    } finally {
      setLoading(false)
    }
  }

  const getTasksByCategory = async (category) => {
    setLoading(true)
    setError("")
    
    try {
      const data = await taskService.getByCategory(category)
      setTasks(data)
    } catch (err) {
      setError(err.message || "Failed to load tasks")
      toast.error("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    searchTasks,
    getTasksByCategory
  }
}

export default useTasks