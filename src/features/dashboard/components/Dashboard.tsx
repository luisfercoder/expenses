import { Grid, Typography, Container, Stack } from "@mui/material"
import { StatisticCard } from "../../../components/StatisticCard/StatisticCard"
import { useMovement } from "../../movement/hooks/useMovements"

import { CardsSection } from "./CardsSection"
import { PendingPaymentSection } from "./PendingPaymentSection"
import { ExpensesByCategorySection } from "./ExpensesByCategorySection"
import { lazy, Suspense, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Modal } from "../../../components/Modal/Modal"

const MovementFormLazy = lazy(() => import("../../movement/components/MovementForm").then(module => ({ default: module.MovementForm })))


export const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { loading, balance, totalExpenses, totalIncome, saving } = useMovement()

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleMovementSaved = () => {
        setIsModalOpen(false)
    }

    if (loading) {
        return <Typography>Cargando...</Typography>
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Stack direction="row" sx={{ mb: 3, justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">Dashboard</Typography>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    Agregar Movimiento
                </Button>
            </Stack>
            {/* <Typography variant="h4" gutterBottom>Dashboard</Typography> */}

            <Grid container spacing={3}>
                {/* Placeholder para Balance */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatisticCard
                        label="Balance del mes"
                        value={`$${balance}`}
                        icon="account_balance"
                        color="primary"
                    />
                </Grid>

                {/* Placeholder para Ingresos */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatisticCard
                        label="Ingresos"
                        value={`$${totalIncome}`}
                        icon="trending_up"
                        color="success"
                    />
                </Grid>

                {/* Placeholder para Gastos */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatisticCard
                        label="Gastos"
                        value={`$${totalExpenses}`}
                        icon="trending_down"
                        color="warning"
                    />
                </Grid>

                {/* Placeholder para Ahorro */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatisticCard
                        label="Ahorro"
                        value={`$${saving}`}
                        icon="savings"
                        color="info"
                    />
                </Grid>
            </Grid>
            <CardsSection />
            <PendingPaymentSection />
            <ExpensesByCategorySection />
            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                title="Agregar Movimiento"
                actions={null} // Acciones están dentro del formulario
            >
                <Suspense fallback={<Typography>Cargando...</Typography>}>
                    <MovementFormLazy
                        onSuccess={handleMovementSaved}
                        onCancel={handleModalClose}
                    />
                </Suspense>
            </Modal>
        </Container>
    )
}