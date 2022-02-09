import { useState } from "react";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Grid from "@mui/material/Grid";

import { Layout } from "../components/Layout";
import { notion, useNotion } from "../services/notion";

export function Account() {
  const { user, devices } = useNotion();
  const [loggingOut, setLoggingOut] = useState(false);
  const [removingAccess, setRemovingAccess] = useState(false);
  const [error, setError] = useState("");

  async function logout() {
    setError("");
    setLoggingOut(true);

    await notion.logout().catch((error) => {
      setError(error?.message ?? error);
    });

    setLoggingOut(false);
  }

  async function removeAccess() {
    setError("");
    setRemovingAccess(true);

    await notion.removeOAuthAccess().catch((error) => {
      setError(error?.message);
    });

    setRemovingAccess(false);
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography component="h2" variant="h4">
          My Account
        </Typography>
        <Typography component="p" variant="body2" sx={{ mt: 3, mb: 3 }}>
          Welcome, {user.email}!
        </Typography>
        {devices.length ? (
          <>
            <Typography component="h3">My devices</Typography>
            {devices.map((device) => (
              <Typography key={device.deviceId} component="p" variant="body2">
                {device.deviceNickname} (id: {device.deviceId})
              </Typography>
            ))}
          </>
        ) : (
          <Typography component="p" variant="body2">
            No devices in this account
          </Typography>
        )}

        {error ? (
          <Grid item xs={12}>
            <Alert variant="filled" severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          </Grid>
        ) : null}
        <LoadingButton
          variant="outlined"
          type="button"
          fullWidth
          size="large"
          sx={{ mt: 4, mb: 2 }}
          loading={removingAccess}
          disabled={removingAccess}
          onClick={removeAccess}
        >
          Disconnect Neurosity Account
        </LoadingButton>
        <LoadingButton
          variant="contained"
          type="button"
          fullWidth
          size="large"
          sx={{ mb: 2 }}
          loading={loggingOut}
          disabled={loggingOut}
          onClick={logout}
        >
          Log out
        </LoadingButton>
      </Box>
    </Layout>
  );
}
