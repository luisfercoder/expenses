import type { TMovement } from "../features/movement/movement.types";

const currentMonth = new Date();
const nextMonth = new Date(currentMonth);
nextMonth.setMonth(nextMonth.getMonth() + 1);
const previousMonth = new Date(currentMonth);
previousMonth.setMonth(previousMonth.getMonth() - 1);

export const mocks: TMovement[] = [{
  userId: '1',
  type: 'income',
  amount: 100,
  date: currentMonth,
  description: 'Example of description',
  categoryId: '1',
  deferredPurchaseId: undefined,
  paymentMethod: 'cash',
  cardId: undefined,
}, {
  userId: '2',
  type: 'expense',
  amount: 200,
  date: nextMonth,
  description: 'Example of description 2',
  categoryId: '2',
  deferredPurchaseId: '1',
  paymentMethod: 'card',
  cardId: '1',
}, {
  userId: '3',
  type: 'income',
  amount: 300,
  date: previousMonth,
  description: 'Example of description 3',
  categoryId: '2',
  deferredPurchaseId: undefined,
  paymentMethod: 'cash',
  cardId: undefined,
}, {
  userId: '4',
  type: 'expense',
  amount: 400,
  date: nextMonth,
  description: 'Example of description 4',
  categoryId: '2',
  deferredPurchaseId: '2',
  paymentMethod: 'card',
  cardId: '2',
}, {
  userId: '5',
  type: 'income',
  amount: 600,
  date: previousMonth,
  description: 'Example of description 5',
  categoryId: '2',
  deferredPurchaseId: undefined,
  paymentMethod: 'cash',
  cardId: undefined,
}];