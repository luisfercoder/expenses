import { useState, useEffect } from "react"
import type { DeferredPurchase } from "../deferredPurchase.types"
import { getDeferredPurchases } from "../services/getDeferredPurchases"
import { calculatePendingPayments } from "../domain/calculatePendingPayments"

export const useGetDeferredPurchases = () => {
    const [purchases, setPurchases] = useState<DeferredPurchase[]>([])
    const [loading, setLoading] = useState(true)
    const [pendingPayments, setPendingPayments] = useState<any[]>([])

    useEffect(() => {
        const loadPurchases = async () => {
            try {
                const data = await getDeferredPurchases()
                setPurchases(data)
                const calculated = calculatePendingPayments(data)
                setPendingPayments(calculated)
            } catch (error) {
                console.error('Error getting deferred purchases:', error)
            } finally {
                setLoading(false)
            }

        }
        loadPurchases()
    }, [])
    return {
        purchases,
        loading,
        pendingPayments
    }
}