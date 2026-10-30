import { useEffect, useState } from "react"
import type { Card } from "../card.types"
import { getCards } from "../services/getCards"
import { calculateUsedBalance } from "../domain/calculateUsedBalance"

export const useCards = () => {
    const [cards, setCards] = useState<Card[]>([])
    const [loading, setLoading] = useState(true)
    const [totalUsedBalance, setTotalUsedBalance] = useState(0)

    useEffect(() => {
        const loadCards = async () => {
            try {
                // const response = await fetch('/api/cards')
                const data = await getCards()
                setCards(data)
                const calculated = calculateUsedBalance(data)
                setTotalUsedBalance(calculated)
            } catch (error) {
                console.error('Error loading cards:', error)
            }
            finally {
                setLoading(false)
            }
        }
        loadCards()
    }, [])

    return {
        cards,
        loading,
        totalUsedBalance
    }
}
