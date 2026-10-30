import type { Card } from "../card.types"

export const getCards = async (): Promise<Card[]> => {
    
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockCards: Card[] = [
        {
            userId: "1",
            name: "BBVA Oro",
            cutoffDate: "15",
            paymentDate: "20",
            creditLimit: 50000,
            usedBalance: 15000
        },
        {
            userId: "1",
            name: "Banamex",
            cutoffDate: "10",
            paymentDate: "5",
            creditLimit: 30000,
            usedBalance: 8000
        }
    ]
    return mockCards
}