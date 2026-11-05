import { useEffect, useState } from "react"
import type { TMovement } from "../movement.types"
import { getMovements } from "../services/getMovements"
import { calculateMonthlyBalance } from "../domain/calculateMonthlyBalance"
import { calculateTotalExpenses } from "../domain/calculateTotalExpenses"
import { calculateTotalIncome } from "../domain/calculateTotalIncome"

export const useMovement = () => {
    const [movements, setMovements] = useState<TMovement[]>([])
    const [loading, setLoading] = useState(true)
    const [balance, setBalance] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)

    useEffect(() => {
        const loadMovements = async () => {
            try {
                const data = await getMovements()
                setMovements(data)
                const calculatedBalance = calculateMonthlyBalance(data)
                setBalance(calculatedBalance)
                const calculatedTotalExpenses = calculateTotalExpenses(data)
                setTotalExpenses(calculatedTotalExpenses)
                const calculatedTotalIncome = calculateTotalIncome(data)
                setTotalIncome(calculatedTotalIncome)
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
    }
}