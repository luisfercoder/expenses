import { useEffect } from "react"
import { getMovements } from "../services/getMovements"
import { calculateMonthlyBalance } from "../domain/calculateMonthlyBalance"
import { calculateTotalExpenses } from "../domain/calculateTotalExpenses"
import { calculateTotalIncome } from "../domain/calculateTotalIncome"
import { useMovementStore } from "../../../stores/movementStore"

export const useMovement = () => {
    const movements = useMovementStore((state) => state.movements)
    const loading = useMovementStore((state) => state.loading)
    const setMovements = useMovementStore((state) => state.setMovements)
    const setLoading = useMovementStore((state) => state.setLoading)

    const balance = calculateMonthlyBalance(movements)
    const totalExpenses = calculateTotalExpenses(movements)
    const totalIncome = calculateTotalIncome(movements)
    const saving = totalIncome - totalExpenses

    useEffect(() => {
        const loadMovements = async () => {
            try {
                setLoading(true)
                const data = await getMovements()
                setMovements(data)

            } catch (error) {
                console.log("Error loading movements:", error)
            } finally {
                setLoading(false)
            }
        }
        loadMovements()
    }, [])

    return {
        movements,
        loading,
        balance,
        totalExpenses,
        totalIncome,
        saving,
    }
}