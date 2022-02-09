import { useState, useCallback } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import axios from "axios";

import { Layout } from "../components/Layout";
import { useNotion } from "../services/notion";

export function SignInWithNerosity() {
  const { oAuthError } = useNotion();
  const [status, setStatus] = useState("ready");
  const [error, setError] = useState("");

  const signIn = useCallback(async () => {
    setStatus("loading");

    axios
      .get(`/.netlify/functions/get-neurosity-oauth-url`)
      .then(({ data }) => {
        if (data?.url) {
          window.location.href = data.url;
        } else {
          setError(`Did not get url`);
        }
      })
      .catch((error) => {
        setStatus("error");
        setError(
          `${error.message}: ${JSON.parse(error.response?.data ?? {})?.error}`
        );
      });
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography component="h2" variant="h6">
          Connect your Neurosity account to this app.
        </Typography>
        <Box sx={{ mt: 3 }}>
          {error ? (
            <Grid item xs={12}>
              <Alert variant="filled" severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            </Grid>
          ) : null}
          {oAuthError ? (
            <Grid item xs={12}>
              <Alert variant="filled" severity="error">
                <AlertTitle>Error</AlertTitle>
                {oAuthError}
              </Alert>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <LoadingButton
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              sx={{ mt: 2, mb: 2 }}
              loading={status === "loading"}
              disabled={status === "loading"}
              onClick={signIn}
            >
              Connect Neurosity Account
            </LoadingButton>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}
