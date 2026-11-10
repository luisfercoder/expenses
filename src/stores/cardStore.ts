import { create } from "zustand"
import type { Card } from "../features/card/card.types"

interface CardStore {
    cards: Card[];
    loading: boolean;
    error: string | null;
    setCards: (cards: Card[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    addCard: (card: Card) => void;
    updateCard: (name: string, card: Partial<Card>) => void;
    deleteCard: (name: string) => void;

}
export const useCardStore = create<CardStore>((set) => ({
    cards: [],
    loading: false,
    error: null,
    setCards: (cards) => set({ cards }),
    setLoading: (loading) => set({ loading: loading }),
    setError: (error) => set({ error }),
    addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
    updateCard: (name, card) => set((state) => ({
        cards: state.cards.map((c) => c.name === name ? { ...c, ...card } : c)
    })),
    deleteCard: (name) => set((state) => ({
        cards: state.cards.filter((c) => c.name !== name)
    }))

}))