import type { TMovement } from "../movement.types"

export const getMovements = async (): Promise<TMovement[]> => {
    // TODO: Implementar llamada a API real
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Datos mock que respetan los tipos
  const mockMovements: TMovement[] = [
    {
      userId: "1",
      type: "income",
      amount: 5000,
      date: new Date(),
      description: "Salario",
      categoryId: "1",
      paymentMethod: "transfer"
    },
    {
      userId: "1",
      type: "expense",
      amount: 1500,
      date: new Date(),
      description: "Alquiler",
      categoryId: "3",
      paymentMethod: "transfer"
    }
  ]
  
  return mockMovements
}