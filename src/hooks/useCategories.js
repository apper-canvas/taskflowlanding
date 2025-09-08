import { useState, useEffect } from "react"
import categoryService from "@/services/api/categoryService"

const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadCategories = async () => {
    setLoading(true)
    setError("")
    
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      setError(err.message || "Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  const createCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData)
      setCategories(prev => [...prev, newCategory])
      return newCategory
    } catch (err) {
      throw err
    }
  }

  const updateCategory = async (id, updateData) => {
    try {
      const updatedCategory = await categoryService.update(id, updateData)
      setCategories(prev => prev.map(cat => 
        cat.Id === parseInt(id) ? updatedCategory : cat
      ))
      return updatedCategory
    } catch (err) {
      throw err
    }
  }

  const deleteCategory = async (id) => {
    try {
      await categoryService.delete(id)
      setCategories(prev => prev.filter(cat => cat.Id !== parseInt(id)))
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return {
    categories,
    loading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory
  }
}

export default useCategories