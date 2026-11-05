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
        date: new Date(),  // Mes actual
        description: "Salario",
        categoryId: "1",
        paymentMethod: "transfer"
    },
    {
        userId: "1",
        type: "income",
        amount: 2000,
        date: new Date(),  // Mes actual
        description: "Freelance",
        categoryId: "1",
        paymentMethod: "transfer"
    },
    {
        userId: "1",
        type: "expense",
        amount: 1500,
        date: new Date(),  // Mes actual
        description: "Alquiler",
        categoryId: "3",
        paymentMethod: "transfer"
    },
    {
        userId: "1",
        type: "expense",
        amount: 800,
        date: new Date(),  // Mes actual
        description: "Compras supermercado",
        categoryId: "1",
        paymentMethod: "card"
    },
    {
        userId: "1",
        type: "expense",
        amount: 500,
        date: new Date(),  // Mes actual
        description: "Transporte",
        categoryId: "2",
        paymentMethod: "cash"
    }
]
  
  return mockMovements
}