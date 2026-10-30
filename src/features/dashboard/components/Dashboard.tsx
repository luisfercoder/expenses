import { Grid, Typography, Container } from "@mui/material"
import { StatisticCard } from "../../../components/StatisticCard/StatisticCard"
import { useMovement } from "../../movement/hooks/useMovements"

import { CardsSection } from "./CardsSection"
import { PendingPaymentSection } from "./PendingPaymentSection"
import { ExpensesByCategorySection } from "./ExpensesByCategorySection"


export const Dashboard = () => {
    const { loading, balance } = useMovement()
    if (loading) {
        return <Typography>Cargando...</Typography>
    }
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>

            <Grid container spacing={3}>
                {/* Placeholder para Balance */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatisticCard
                        label="Balance del mes"
                        value={`${balance}`}
                        icon="account_balance"
                        color="primary"
                    />
                </Grid>

                {/* Placeholder para Ingresos */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatisticCard
                        label="Ingresos"
                        value="$0"
                        icon="trending_up"
                        color="success"
                    />
                </Grid>

                {/* Placeholder para Gastos */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatisticCard
                        label="Gastos"
                        value="$0"
                        icon="trending_down"
                        color="warning"
                    />
                </Grid>

                {/* Placeholder para Ahorro */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatisticCard
                        label="Ahorro"
                        value="$0"
                        icon="savings"
                        color="info"
                    />
                </Grid>
            </Grid>
            <CardsSection />
            <PendingPaymentSection />
            <ExpensesByCategorySection />
        </Container>
    )
}