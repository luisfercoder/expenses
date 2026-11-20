import { TextField as MuiTextField } from '@mui/material'

export const TextField = ({ ...props }: any) => {
    return <MuiTextField fullWidth size="small" {...props} />
}