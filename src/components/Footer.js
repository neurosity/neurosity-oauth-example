import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const variant = "caption";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: 8,
        pt: 4
      }}
    >
      <LegalNav />
      <Copyright sx={{ pt: 2 }} />
    </Box>
  );
}

function LegalNav() {
  return (
    <Box
      sx={{
        typography: "body1",
        "& > :not(style) + :not(style)": {
          ml: 2
        }
      }}
    >
      <Link
        variant={variant}
        color="text.secondary"
        target="_blank"
        rel="noopener noreferrer"
        href="https://neurosity.co/privacy-policy"
      >
        Privacy
      </Link>
      <Link
        variant={variant}
        color="text.secondary"
        target="_blank"
        rel="noopener noreferrer"
        href="https://neurosity.co/terms-of-service"
      >
        Terms
      </Link>
    </Box>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant={variant}
      color="text.secondary"
      align="center"
      {...props}
    >
      &copy; {new Date().getFullYear()}{" "}
      <Link
        variant={variant}
        color="inherit"
        target="_blank"
        rel="noopener noreferrer"
        href="https://neurosity.co"
      >
        ACME Neuro, Inc
      </Link>
    </Typography>
  );
}
