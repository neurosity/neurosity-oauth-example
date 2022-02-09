import { createTheme } from "@mui/material/styles";
export { ThemeProvider } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#000000"
    },
    secondary: {
      main: "#869bb5"
    },
    error: {
      main: "#ed143d"
    }
  },
  typography: {
    h4: {
      fontWeight: 400
    },
    fontFamily: ["Roboto Mono", "monospace"].join(", "),
    fontSize: 16,
    fontWeight: 700,
    button: {
      //fontWeight: 400,
      textTransform: "none",
      letterSpacing: 0
    }
  }
});
