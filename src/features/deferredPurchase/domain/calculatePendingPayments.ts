import type { DeferredPurchase } from "../deferredPurchase.types";

export const calculatePendingPayments = (purchases: DeferredPurchase[]) => {
    return purchases.map(purchase => {
        const monthlyPayment = purchase.totalAmount / purchase.numberOfMonths
        const now = new Date()
        const purchaseDate = new Date(purchase.dateOfPurchase)

        const monthsElapsed = Math.floor((now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
        const currentMonth = monthsElapsed + 1
        const pendingBalance = purchase.totalAmount - (monthlyPayment * monthsElapsed)

        return {
            ...purchase,
            currentMonth,
            monthlyPayment,
            pendingBalance: Math.max(0, pendingBalance)
        }


    })
}