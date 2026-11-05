import type { TMovement } from "../movement.types";

export const calculateTotalExpenses = (movements: TMovement[]) => {
    const today = new Date()
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const currentMonthMovements = movements.filter(movement => {
        const movementDate = new Date(movement.date)
        return movementDate.getMonth() === currentMonth && movementDate.getFullYear() === currentYear
    })

    const totalExpenses = currentMonthMovements
        .filter(movement => movement.type === 'expense')
        .reduce((total, movement) => total + movement.amount, 0);

    return totalExpenses

}