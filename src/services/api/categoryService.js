import categoriesData from "@/services/mockData/categories.json"

class CategoryService {
  constructor() {
    this.categories = [...categoriesData]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    return [...this.categories]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 150))
    const category = this.categories.find(cat => cat.Id === parseInt(id))
    return category ? { ...category } : null
  }

  async create(categoryData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const maxId = this.categories.reduce((max, cat) => Math.max(max, cat.Id), 0)
    const newCategory = {
      Id: maxId + 1,
      ...categoryData,
      taskCount: 0
    }
    
    this.categories.push(newCategory)
    return { ...newCategory }
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Category not found")
    }
    
    this.categories[index] = {
      ...this.categories[index],
      ...updateData
    }
    
    return { ...this.categories[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Category not found")
    }
    
    const deletedCategory = { ...this.categories[index] }
    this.categories.splice(index, 1)
    return deletedCategory
  }

  async updateTaskCount(categoryName, count) {
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const index = this.categories.findIndex(cat => cat.name === categoryName)
    if (index !== -1) {
      this.categories[index].taskCount = count
      return { ...this.categories[index] }
    }
    return null
  }
}

export default new CategoryService()