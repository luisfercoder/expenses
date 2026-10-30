import type { DeferredPurchase } from "../deferredPurchase.types"

export const getDeferredPurchases = async (): Promise<DeferredPurchase[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))

    const mockPurchases: DeferredPurchase[] = [
        {
            userId: "1",
            description: "MacBook Pro",
            totalAmount: 24000,
            numberOfMonths: 12,
            dateOfPurchase: "2024-09-01",
            cardId: "1",
            currentMonth: 0,
            monthlyPayment: 0,
            pendingBalance: 0
        },
        {
            userId: "1",
            description: "iPhone",
            totalAmount: 15000,
            numberOfMonths: 6,
            dateOfPurchase: "2024-10-01",
            cardId: "2",
            currentMonth: 0,
            monthlyPayment: 0,
            pendingBalance: 0
        }
    ]

    return mockPurchases
}