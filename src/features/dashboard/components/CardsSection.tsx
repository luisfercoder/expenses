import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useCards } from "../../card/hooks/useCards"

export const CardsSection = () => {
    const { cards, loading, totalUsedBalance } = useCards()

    if (loading) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>Tarjetas</Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="body1">
                            Total saldo utilizado: ${totalUsedBalance}
                        </Typography>
                    </Grid>

                    {cards.map(card => (
                        <Grid size={{ xs: 12, sm: 6 }} key={card.name}>
                            <Card variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="subtitle1">{card.name}</Typography>
                                <Typography variant="body2">
                                    Saldo: ${card.usedBalance} / ${card.creditLimit}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Corte: {card.cutoffDate} | Pago: {card.paymentDate}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
}