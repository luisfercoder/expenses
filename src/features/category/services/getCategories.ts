import type { Category } from "../category.types"

export const getCategories = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))

    const mockCategories: Category[] = [
         {
        id: "1",            
        userId: "1",
        name: "Comida",
        parentId: null
    },
    {
        id: "2",            
        userId: "1",
        name: "Transporte",
        parentId: null
    },
    {
        id: "3",            
        userId: "1",
        name: "Vivienda",
        parentId: null
    }
    ]
    return mockCategories
}