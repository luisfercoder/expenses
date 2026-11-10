import { create } from "zustand"
import type { DeferredPurchase } from "../features/deferredPurchase/deferredPurchase.types"

interface DeferredPurchaseStore {
    purchases: DeferredPurchase[]
    loading: boolean
    error: string | null
    setPurchases: (purchases: DeferredPurchase[]) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    addPurchase: (purchase: DeferredPurchase) => void
    updatePurchase: (description: string, purchase: Partial<DeferredPurchase>) => void
    deletePurchase: (description: string) => void

}
export const useDeferredPurchaseStore = create<DeferredPurchaseStore>((set) => ({
    purchases: [],
    loading: false,
    error: null,
    setPurchases: (purchases) => set({ purchases }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    addPurchase: (purchase) => set((state) => ({ purchases: [...state.purchases, purchase] })),
    updatePurchase: (description, purchase) => set((state) => ({ purchases: state.purchases.map((p) => p.description === description ? { ...p, ...purchase } : p) })),
    deletePurchase: (description) => set((state) => ({ purchases: state.purchases.filter((p) => p.description !== description) })),

}))