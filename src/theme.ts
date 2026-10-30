import { createTheme } from "@mui/material/styles";
import { red, blue, green, orange } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: { main: red[500] },
    success: { main: green[500] },
    warning: { main: orange[500] },
    info: { main: blue[500] },
  }
})