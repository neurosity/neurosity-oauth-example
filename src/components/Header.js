import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function Header() {
  return (
    <Box
      component="header"
      sx={{
        marginTop: 8,
        marginBottom: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Logo />
    </Box>
  );
}

function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography variant="h1" align="center">
        🧠
      </Typography>
      <Typography
        component="h1"
        variant="h3"
        align="center"
        textTransform="uppercase"
      >
        ACME Neuro
      </Typography>
    </Box>
  );
}
