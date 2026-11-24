import { useMovementStore } from "../../../stores/movementStore"

import type { MovementFormData } from "../domain/movementSchema"

export const saveMovements = async(movementData: MovementFormData) => {
    await new Promise(resolve => setTimeout(resolve, 500))

    // En una app real, aquí harías un POST a la API
    // const response = await fetch('/api/movements', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(movementData)
    // })
    const addMovement = useMovementStore.getState().addMovement
    
    const movementWithId = {
        ...movementData,
        categoryId: movementData.categoryId 
    }
    addMovement(movementWithId)
    
    return movementWithId
}
