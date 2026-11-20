import { Container, Typography, Box, Stack } from "@mui/material"
import { Button } from "./Button/Button"
import { Select } from "./Select/Select"
import { Modal } from "./Modal/Modal"
import { useState } from "react"
import { TextField } from "./TextField/TextField"

export const DesignSystemShowcase = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState("")

    const options = [
        { value: "1", label: "Opción 1" },
        { value: "2", label: "Opción 2" },
        { value: "3", label: "Opción 3" }
    ]

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Design System Showcase</Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>Buttons</Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="danger">Danger</Button>
                </Stack>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>Inputs</Typography>
                <Stack spacing={2}>
                    <TextField label="Nombre" placeholder="Escribe tu nombre" />
                    <TextField label="Email" type="email" placeholder="email@ejemplo.com" />
                    <TextField label="Monto" type="number" placeholder="0.00" />
                </Stack>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>Select</Typography>
                <Select
                    label="Selecciona una opción"
                    options={options}
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value as string)}
                />
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>Modal</Typography>
                <Button onClick={() => setIsModalOpen(true)}>Abrir Modal</Button>

                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Modal de Prueba"
                    actions={
                        <>
                            <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                            <Button variant="primary" onClick={() => setIsModalOpen(false)}>Aceptar</Button>
                        </>
                    }
                >
                    <Typography>Este es un modal de prueba para el Design System.</Typography>
                    <TextField label="Ejemplo" sx={{ mt: 2 }} />
                </Modal>
            </Box>
        </Container>
    )
}