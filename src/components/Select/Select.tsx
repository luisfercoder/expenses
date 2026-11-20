import { FormControl, InputLabel, MenuItem, Select as MuiSelect, Typography } from "@mui/material"
import type { SelectProps } from "./Select.types"

export const Select = ({ label, options, error, helperText, ...props }: SelectProps) => {
    return (
        <FormControl fullWidth error={error} size="small">
            {label && <InputLabel>{label}</InputLabel>}
            <MuiSelect
                label={label}
                {...props}
            >{options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}</MuiSelect>
            {helperText && (
                <Typography
                    variant="caption"
                    sx={{ color: error ? "error.main" : "text.secondary", mt: 0.5 }}
                >
                    {helperText}
                </Typography>
            )}        </FormControl>
    )
}