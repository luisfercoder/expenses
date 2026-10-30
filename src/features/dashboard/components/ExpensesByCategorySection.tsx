import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useGetCategories } from "../../category/hooks/useGetCategories"

export const ExpensesByCategorySection = () => {
    const { categories, expensesByCategory , loading} = useGetCategories()
    if (loading) {
        return <div>Cargando...</div>
    }
    return (
       <Card sx={{ mt: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>Gastos por Categoría</Typography>
                
                <Grid container spacing={2}>
                    {categories.map(category => {
                        const amount = expensesByCategory[category.id] || 0
                        return (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
                                <Card variant="outlined" sx={{ p: 2 }}>
                                    <Typography variant="subtitle1">{category.name}</Typography>
                                    <Typography variant="body2">
                                        Gastos: ${amount.toFixed(2)}
                                    </Typography>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </CardContent>
        </Card>
    )
}