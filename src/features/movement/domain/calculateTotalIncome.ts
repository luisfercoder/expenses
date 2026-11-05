import type { TMovement } from "../movement.types";

export const calculateTotalIncome = (movements: TMovement[]) => {
    const today = new Date()
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const currentMonthMovements = movements.filter(movement => {
        const movementDate = new Date(movement.date)
        return movementDate.getMonth() === currentMonth && movementDate.getFullYear() === currentYear
    })

    const totalIncome = currentMonthMovements
        .filter(movement => movement.type === 'income')
        .reduce((total, movement) => total + movement.amount, 0);

    return totalIncome

}