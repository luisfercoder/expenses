import { Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material"
import type { ModalProps } from "./Modal.types"

export const Modal = ({ open, onClose, title, children, actions, ...props }: ModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth {...props}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>{children}</DialogContent>
            {actions && <DialogActions>{actions}</DialogActions>}
        </Dialog>
    )
}