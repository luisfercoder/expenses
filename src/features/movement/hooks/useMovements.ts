import { useEffect, useState } from "react"
import type { TMovement } from "../movement.types"
import { getMovements } from "../services/getMovements"
import { calculateMonthlyBalance } from "../domain/calculateMonthlyBalance"

export const useMovement = () => {
    const [movements, setMovements] = useState<TMovement[]>([])
    const [loading, setLoading] = useState(true)
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        const loadMovements = async () => {
            try {
                const data = await getMovements()
                setMovements(data)
                const calculatedBalance = calculateMonthlyBalance(data)
                setBalance(calculatedBalance)
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
    }
}