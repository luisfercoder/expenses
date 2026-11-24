import { useForm } from "react-hook-form"
import { movementSchema } from "../domain/movementSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { MovementFormData } from "../domain/movementSchema";
import { saveMovements } from "../services/saveMovements";
import { PAYMENT_METHODS, TYPES_OF_MOVEMENTS } from "../movement.constants";
import { Box, Stack, Typography } from "@mui/material";
import { Select } from "../../../components/Select/Select";
import { TextField } from "../../../components/TextField/TextField";
import { Button } from "../../../components/Button/Button";


interface MovementFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    mode?: 'create' | 'edit';
}

export const MovementForm = ({ onSuccess, onCancel, mode = 'create' }: MovementFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MovementFormData>({
        resolver: zodResolver(movementSchema),
        defaultValues: {
            userId: "1",
            type: "income",
            amount: 0,
            date: new Date(),
            categoryId: "",
            paymentMethod: "cash"
        }
    })
    const onSubmit = async (data: MovementFormData) => {
        try {
            await saveMovements(data)
            onSuccess?.()
        } catch (error) {
            console.error("Error saving movement:", error)
        }
    }

    const typeOptions = TYPES_OF_MOVEMENTS.map(type => ({
        value: type,
        label: type.charAt(0).toUpperCase() + type.slice(1)
    }))
    const paymentMethodOptions = PAYMENT_METHODS.map(method => ({
        value: method,
        label: method.charAt(0).toUpperCase() + method.slice(1)
    }))

    //TODO- it should come from a service 
    const categoryOptions = [
        { value: "1", label: "Comida" },
        { value: "2", label: "Transporte" },
        { value: "3", label: "Vivienda" }
    ]
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
            <Stack spacing={2}>
                <Typography variant="h6">
                    {mode === 'edit' ? "Editar Movimiento" : "Agregar Movimiento"}
                </Typography>
                <Select
                    label="Tipo"
                    options={typeOptions}
                    {...register("type")}
                    error={!!errors.type}
                    helperText={errors.type?.message}
                />
                <TextField
                    label="Monto"
                    type="number"
                    {...register("amount", { valueAsNumber: true })}
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                />
                <TextField
                    label="Descripción"
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
                <Select
                    label="Categoría"
                    options={categoryOptions}
                    {...register("categoryId")}
                    error={!!errors.categoryId}
                    helperText={errors.categoryId?.message}
                />

                <Select
                    label="Método de Pago"
                    options={paymentMethodOptions}
                    {...register("paymentMethod")}
                    error={!!errors.paymentMethod}
                    helperText={errors.paymentMethod?.message}
                />
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Guardando..." : "Guardar"}
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}

