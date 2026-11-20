import type { SelectProps as MuiSelectPropsType } from '@mui/material'

export interface SelectOption {
    value: string | number
    label: string
}

export interface SelectProps extends Omit<MuiSelectPropsType, "children"> {
    label?: string
    options: SelectOption[]
    error?: boolean
    helperText?: string
}
