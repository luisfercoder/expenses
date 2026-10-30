import { TYPES_OF_MOVEMENTS, PAYMENT_METHODS } from "./movement.constants";

export type TMovementType = typeof TYPES_OF_MOVEMENTS[number];
export type TPaymentMethod = typeof PAYMENT_METHODS[number];

export type TMovement ={
  userId: string;
  type: TMovementType;
  amount: number;
  date: Date;
  description?: string;
  categoryId:string;
  deferredPurchaseId?:string;
  paymentMethod: TPaymentMethod;
  cardId?:string;
};
