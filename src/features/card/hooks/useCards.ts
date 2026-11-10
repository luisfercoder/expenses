import { useEffect } from "react"
import { getCards } from "../services/getCards"
import { calculateUsedBalance } from "../domain/calculateUsedBalance"
import { useCardStore } from "../../../stores/cardStore"

export const useCards = () => {
    const cards = useCardStore((store) => store.cards)
    const loading = useCardStore((store) => store.loading)
    const setCards = useCardStore((store) => store.setCards)
    const setLoading = useCardStore((store) => store.setLoading)
    const totalUsedBalance = calculateUsedBalance(cards)

    useEffect(() => {
        const loadCards = async () => {
            try {
                setLoading(true)
                // const response = await fetch('/api/cards')
                const data = await getCards()
                setCards(data)
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
