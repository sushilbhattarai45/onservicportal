// @mui
import {
  Grid,
  Container,
  Typography,
  Stack,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
// components
import Page from "../../components/Page";
import { ContextProvider } from "../../Context";

import { useContext, useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DashboardApp() {
  const { login } = useContext(ContextProvider);
  const [user] = login;

  const [limit, setLimit] = useState(0);
  const [totallimit, setTotalLimit] = useState(0);
  const navigate = useNavigate();

  const getEmployeeDetails = async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "/v1/api/employee/getOne",
        data: {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          employee_contact: user.contact,
        },
      });

      setLimit(data.data.employee_limit);
      setTotalLimit(data.data.employee_totallimit);
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

        <Grid container spacing={2} marginBottom={3}>
          <Grid item xs={12} lg={4}>
            <Typography variant="h5">
              You are logged in as{" "}
              {user.post == "ADMIN" ? "an admin" : "an office staff"}.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h5">
              Contact number: {user.contact}!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h5">
              Remaining limit: {limit} {totallimit && `out of ${totallimit}`}!
            </Typography>
          </Grid>
        </Grid>

        <Stack
          alignItems="center"
          justifyContent="space-between"
          my={2}
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 1 }}
          flexWrap="wrap"
        >
          <Card sx={{ maxWidth: 340, minWidth: 250, my: 3 }}>
            <CardActionArea onClick={() => navigate("/user")}>
              <CardMedia
                component="img"
                height="140"
                image="/static/illustrations/users.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create, edit, delete all users and their details.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {user.post == "ADMIN" && (
            <Card sx={{ maxWidth: 340, minWidth: 250, my: 3 }}>
              <CardActionArea onClick={() => navigate("/employees")}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/illustrations/employees.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Employees
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Create, edit, delete employees and their details.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}

          <Card sx={{ maxWidth: 340, minWidth: 250, my: 3 }}>
            <CardActionArea onClick={() => navigate("/sp")}>
              <CardMedia
                component="img"
                height="140"
                image="/static/illustrations/sp.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Service Providers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create, edit, delete Service Providers and their details.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ maxWidth: 340, minWidth: 250, my: 3 }}>
            <CardActionArea onClick={() => navigate("/categories")}>
              <CardMedia
                component="img"
                height="140"
                image="/static/illustrations/categories.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Categories
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create, edit, delete categories and their details.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ maxWidth: 340, minWidth: 250, my: 3 }}>
            <CardActionArea onClick={() => navigate("/sub-category")}>
              <CardMedia
                component="img"
                height="140"
                image="/static/illustrations/sub-cat.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sub Categories
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create, edit, delete sub-categories and their details.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {user.post == "ADMIN" && (
            <Card sx={{ maxWidth: 340, minWidth: 250, my: 3 }}>
              <CardActionArea onClick={() => navigate("/ads")}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/illustrations/ads.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Ads
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Create, edit, delete Advertisements and their details.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
        </Stack>
      </Container>
    </Page>
  );
}
