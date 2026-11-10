import { useEffect } from "react"
import { getDeferredPurchases } from "../services/getDeferredPurchases"
import { calculatePendingPayments } from "../domain/calculatePendingPayments"
import { useDeferredPurchaseStore } from "../../../stores/deferredPurchaseStore"

export const useGetDeferredPurchases = () => {
    const purchases = useDeferredPurchaseStore((store) => store.purchases)
    const loading = useDeferredPurchaseStore((store) => store.loading)
    const setPurchases = useDeferredPurchaseStore((store) => store.setPurchases)
    const setLoading = useDeferredPurchaseStore((store) => store.setLoading)
    const pendingPayments = calculatePendingPayments(purchases)

    useEffect(() => {
        const loadPurchases = async () => {
            try {
                setLoading(true)
                const data = await getDeferredPurchases()
                setPurchases(data)

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