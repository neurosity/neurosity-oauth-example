import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ maxWidth = "xs", children }) {
  return (
    <Container
      className="container"
      maxWidth={maxWidth}
      sx={{
        px: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Header />
      <Box component="main" sx={{ width: "100%" }}>
        {children}
      </Box>
      <Footer />
    </Container>
  );
}
