import { create } from "zustand"
import type { TMovement } from "../features/movement/movement.types"

interface MovementStore {
    movements: TMovement[] ;
    loading: boolean
    error: string | null;
    setMovements: (movements: TMovement[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    addMovement: (movement: TMovement) => void;
    updateMovement: (categoryId: string, movement: Partial<TMovement>) => void;
    deleteMovement: (categoryId: string) => void;
}
export const useMovementStore = create<MovementStore>((set) => ({
    movements: [],
    loading: false,
    error: null,
    setMovements: (movements) => set({ movements }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    addMovement: (movement) => set((state) => ({ movements: [...state.movements, movement] })),
    updateMovement: (categoryId, movement) => set((state) => ({
        movements: state.movements.map((m) => m.categoryId === categoryId ? { ...m, ...movement } : m)
    })),
    deleteMovement: (categoryId) => set((state) => ({
        movements: state.movements.filter((m) => m.categoryId !== categoryId)
    }))
}))