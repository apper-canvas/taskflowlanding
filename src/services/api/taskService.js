import tasksData from "@/services/mockData/tasks.json"

class TaskService {
  constructor() {
    this.tasks = [...tasksData]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.tasks]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const task = this.tasks.find(task => task.Id === parseInt(id))
    return task ? { ...task } : null
  }

  async create(taskData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const maxId = this.tasks.reduce((max, task) => Math.max(max, task.Id), 0)
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    this.tasks.push(newTask)
    return { ...newTask }
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 350))
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    
    this.tasks[index] = {
      ...this.tasks[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    return { ...this.tasks[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    
    const deletedTask = { ...this.tasks[index] }
    this.tasks.splice(index, 1)
    return deletedTask
  }

  async toggleComplete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    
    this.tasks[index] = {
      ...this.tasks[index],
      completed: !this.tasks[index].completed,
      updatedAt: new Date().toISOString()
    }
    
    return { ...this.tasks[index] }
  }

  async getByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    if (category === "all") {
      return [...this.tasks]
    }
    
    return this.tasks.filter(task => task.category === category).map(task => ({ ...task }))
  }

  async search(query) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const searchTerm = query.toLowerCase()
    return this.tasks
      .filter(task => 
        task.title.toLowerCase().includes(searchTerm) ||
        (task.description && task.description.toLowerCase().includes(searchTerm)) ||
        task.category.toLowerCase().includes(searchTerm)
      )
      .map(task => ({ ...task }))
  }
}

export default new TaskService()