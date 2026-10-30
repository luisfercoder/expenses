import { useEffect, useState } from "react"
import { getCategories } from "../services/getCategories"
import { calculateExpensesByCategory } from "../../movement/domain/calculateExpensesByCategory"
import type { Category } from "../category.types"
import { getMovements } from "../../movement/services/getMovements"

export const useGetCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [expensesByCategory, setExpensesByCategory] = useState<Record<string, number>>({})

    useEffect(() => {

        const loadCategories = async () => {
            try {
                // const data = await getCategories()
                // setCategories(data)
                const [categoriesData, movementsData]= await Promise.all([getCategories(), getMovements()])
                setCategories(categoriesData)
                
                const calculated = calculateExpensesByCategory(movementsData)
                setExpensesByCategory(calculated)
            } catch (error) {
                console.error('Error fetching categories:', error)
            } finally {
                setLoading(false)
            }
        }
        loadCategories()

    }, [])

    return {
        categories,
        loading,
        expensesByCategory
    }
}