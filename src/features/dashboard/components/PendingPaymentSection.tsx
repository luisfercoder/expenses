import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useGetDeferredPurchases } from "../../deferredPurchase/hooks/useGetDeferredPurchases"

export const PendingPaymentSection = () => {

    const { pendingPayments, loading } = useGetDeferredPurchases()

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>Próximos Pagos</Typography>

                <Grid container spacing={2}>
                    {pendingPayments.map((payment: any) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={payment.description}>
                            <Card variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="subtitle1">{payment.description}</Typography>
                                <Typography variant="body2">
                                    Pago mensual: ${payment.monthlyPayment?.toFixed(2)}
                                </Typography>
                                <Typography variant="body2">
                                    Mes {payment.currentMonth} / {payment.numberOfMonths}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Saldo pendiente: ${payment.pendingBalance?.toFixed(2)}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>

    )
}