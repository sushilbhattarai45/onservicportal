import { Link as RouterLink } from "react-router-dom";
import Iconify from "../../components/Iconify";

// @mui
import { styled } from "@mui/material/styles";
import { Button, Container, Typography, Stack } from "@mui/material";
// components
import Page from "../../components/Page";

// sections
import { RegisterForm } from "../../sections/auth/register";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <Page title="Register new user">
      <RootStyle>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h4" gutterBottom>
              Add new User
            </Typography>

            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/user"
              color="error"
              startIcon={<Iconify icon="iconoir:cancel" />}
            >
              Cancel
            </Button>
          </Stack>
          <div style={{ backgroundColor: "white", padding: "10px" }}>
            <ContentStyle>
              <Typography variant="h4" gutterBottom>
                Register
              </Typography>

              <Typography sx={{ color: "text.secondary", mb: 5 }}>
                Enter details of new user.
              </Typography>

              <RegisterForm />
            </ContentStyle>
          </div>
        </Container>
      </RootStyle>
    </Page>
  );
}
