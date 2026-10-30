import type { TMovement } from "../movement.types"

export const calculateExpensesByCategory = ( movements: TMovement[]) => {
    const expensesByCategory = movements.reduce((acc, movement) => {
        if (movement.type === 'expense') {
            acc[movement.categoryId] = (acc[movement.categoryId] || 0) + movement.amount
        }
        return acc
    }, {} as Record<string, number>)

    return expensesByCategory
}