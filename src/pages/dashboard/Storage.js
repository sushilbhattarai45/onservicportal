import { Container, Typography, Stack } from "@mui/material";
import Page from "../../components/Page";

const Storage = () => {
  return (
    <Page title="Storage">
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Storage
          </Typography>
        </Stack>
      </Container>
    </Page>
  );
};

export default Storage;
