import type { Card } from "../card.types";

export const calculateUsedBalance = (cards:Card[]) => {
    return cards.reduce((acc, card) => acc + card.usedBalance, 0)
}