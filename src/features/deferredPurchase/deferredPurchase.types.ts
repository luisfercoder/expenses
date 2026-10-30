export interface DeferredPurchase {
    userId: string;
    description: string;
    totalAmount: number;
    numberOfMonths: number;
    dateOfPurchase: string;
    cardId: string;
    // Calculated fields
    currentMonth: number;
    monthlyPayment: number;
    pendingBalance: number;
}

