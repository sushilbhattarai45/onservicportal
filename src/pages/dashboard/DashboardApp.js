// @mui
import { Grid, Container, Typography } from "@mui/material";
// components
import Page from "../../components/Page";

import { useContext } from "react";
import { ContextProvider } from "../../Context";

export default function DashboardApp() {
  const { login } = useContext(ContextProvider);
  const [user] = login;

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi {user.displayName}!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 5 }}>
              You are logged in as{" "}
              {user.post == "ADMIN" ? "an admin" : "an office staff"}.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 5 }}>
              Your contact number is {user.contact}!
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}></Grid>
      </Container>
    </Page>
  );
}
