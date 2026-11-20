import { Typography } from "@mui/material"
import type { FormLabelProps } from "./FormLabel.types"

export const FormLabel = ({ required, children, ...props }: FormLabelProps) => {

    return (
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }} {...props}>
            {children}
            {required && <span style={{ color: "red" }}> *</span>}
        </Typography>
    )
}