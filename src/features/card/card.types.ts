export interface Card {
    userId: string;
    name: string;
    cutoffDate: string;
    paymentDate: string;
    creditLimit: number;
    // Calculated fields
    usedBalance: number;
}
