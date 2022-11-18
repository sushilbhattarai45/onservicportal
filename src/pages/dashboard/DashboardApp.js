// @mui
import { Grid, Container, Typography } from "@mui/material";
// components
import Page from "../../components/Page";

export default function DashboardApp() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}></Grid>
      </Container>
    </Page>
  );
}
