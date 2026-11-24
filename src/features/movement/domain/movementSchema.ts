import { z } from "zod";
import { TYPES_OF_MOVEMENTS, PAYMENT_METHODS } from "../movement.constants";


export const movementSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    type: z.enum(TYPES_OF_MOVEMENTS, {
        error: "El tipo es requerido"
    }),
    amount: z.number().positive("the amount must be positive").min(0.01, "the amount must be greater than 0"),
    date: z.date({ error: "the date is required" }),
    description: z.string().min(3, "the description must be at least 3 characters").optional(),
    categoryId: z.string().min(1, "Category ID is required"),
    deferredPurchaseId: z.string().optional(),
    paymentMethod: z.enum(PAYMENT_METHODS, {
        error: "the payment method is required"
    }),
    cardId: z.string().optional(),
})

export type MovementFormData = z.infer<typeof movementSchema>
