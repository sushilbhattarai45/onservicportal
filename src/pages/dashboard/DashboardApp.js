// @mui
import { Grid, Container, Typography } from "@mui/material";
// components
import Page from "../../components/Page";

import { useContext, useState, useEffect } from "react";
import { ContextProvider } from "../../Context";
import axios from "axios";
import toast from "react-hot-toast";

export default function DashboardApp() {
  const { login } = useContext(ContextProvider);
  const [user] = login;

  const [limit, setLimit] = useState(0);

  const getEmployeeDetails = async () => {
    try {
      const { data } = await axios.post(`/v1/api/employee/getOne`, {
        GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
        employee_contact: user.contact,
      });

      setLimit(data.data.employee_limit);
    } catch (error) {
      toast.error("Something went wrong getting limit");
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          sx={{
            mb: 5,
          }}
        >
          Welcome, {user.displayName}!
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">
              You are logged in as{" "}
              {user.post == "ADMIN" ? "an admin" : "an office staff"}.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              Contact number: {user.contact}!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Remaining limit: {limit}!</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}></Grid>
      </Container>
    </Page>
  );
}
