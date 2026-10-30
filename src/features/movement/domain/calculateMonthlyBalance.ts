import type { TMovement } from "../movement.types"

export const calculateMonthlyBalance = (movements: TMovement[]): number => {
    const now = new Date()

    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const currentMonthMovements = movements.filter(movement => {
        const movementDate = new Date(movement.date)
        return (
            movementDate.getMonth() === currentMonth &&
            movementDate.getFullYear() === currentYear
        )
    })

    const income = currentMonthMovements
        .filter(m => m.type === 'income')
        .reduce((acc, m) => acc + m.amount, 0)
    const expense = currentMonthMovements
        .filter(m => m.type === 'expense')
        .reduce((acc, m) => acc + m.amount, 0)

    return income - expense
}