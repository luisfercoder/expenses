import { Button as MuiButton } from '@mui/material'
import type { ButtonProps } from './Button.types'
import { DEFAULT_VARIANT } from './Button.constants'


export const Button = ({ variant = DEFAULT_VARIANT, children, ...props }: ButtonProps) => {
    const getVariantColor = () => {
        switch (variant) {
            case "primary":
                return "contained"
            case "secondary":
                return "outlined"
            case "danger":
                return "contained"
            default:
                return "contained"
        }
    }

    const getColor = () => {
        switch (variant) {
            case "primary":
                return "primary"
            case "secondary":
                return "primary"
            case "danger":
                return "error"
            default:
                return "primary"
        }
    }
    return (
        <MuiButton {...props} variant={getVariantColor()} color={getColor()}>
            {children}
        </MuiButton>
    )
}