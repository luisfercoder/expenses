import { Card, CardContent, Icon, Typography } from "@mui/material"
import type { StatisticCardProps } from "./StatisticCard.types"

export const StatisticCard = ({ label, value, icon, color }: StatisticCardProps) => {
  return (
    <Card sx={{ width: 200 , border: `2px solid red` , borderRadius: 2}}>
      <CardContent>
        <Typography variant="body1">{label}</Typography>
        {icon && <Icon sx={{ fontSize: 32 }}>{icon}</Icon>}
        <Typography variant="body1" color={color}>{value}</Typography>
      </CardContent>
    </Card>
  )
}