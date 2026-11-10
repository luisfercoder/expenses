import { useEffect, useState } from "react"
import { getCategories } from "../services/getCategories"
import { calculateExpensesByCategory } from "../../movement/domain/calculateExpensesByCategory"
import { getMovements } from "../../movement/services/getMovements"
import { useCategoryStore } from "../../../stores/categoryStore"

export const useGetCategories = () => {
    const categories = useCategoryStore((state) => state.categories)
    const setCategories = useCategoryStore((state) => state.setCategories)
    const loading = useCategoryStore((state) => state.loading)
    const setLoading = useCategoryStore((state) => state.setLoading)

    const [expensesByCategory, setExpensesByCategory] = useState<Record<string, number>>({})


    useEffect(() => {

        const loadCategories = async () => {
            try {
                setLoading(true)
                const [categoriesData, movementsData] = await Promise.all([getCategories(), getMovements()])
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