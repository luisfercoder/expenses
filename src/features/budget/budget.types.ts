export interface Budget {
    userId: string;
    name: string;
    limit: number;
    // Calculated fields
    spent: number;
    available: number;
}