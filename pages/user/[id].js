import {
  Grid,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

const EditProfile = () => {
  const handleFilesChange = (files) => {
    // Do something...
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="User edit">
          <form>
            <Stack spacing={2} direction="row" alignItems="center">
              <img src="https://via.placeholder.com/150" alt="user" />
              <FormControl>
                <input
                  id="outlined-adornment-amount"
                  type="file"
                  onChange={handleFilesChange}
                  label="Upload Image"
                  accept="image/*"
                />
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              my={2}
            >
              <FormControl sx={{ my: 1, mr: 2 }} fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <OutlinedInput id="name" name="name" type="text" label="name" />
              </FormControl>

              <TextField fullWidth name="email" type="text" label="Email" />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              my={2}
            >
              <FormControl sx={{ my: 1 }} fullWidth>
                <InputLabel htmlFor="district">District</InputLabel>
                <OutlinedInput
                  id="district"
                  name="district"
                  type="text"
                  label="district"
                />
              </FormControl>
              <FormControl sx={{ mx: 2 }} fullWidth>
                <InputLabel htmlFor="city">City</InputLabel>
                <OutlinedInput id="city" name="city" type="text" label="city" />
              </FormControl>
              <TextField fullWidth name="street" type="text" label="Street" />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              my={2}
            >
              <TextField
                fullWidth
                name="contact"
                type="number"
                label="Contact"
              />
              <TextField
                fullWidth
                name="gender"
                type="text"
                label="Gender"
                sx={{ mx: 2 }}
              />
              <TextField
                fullWidth
                name="password"
                type="text"
                label="Password"
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              my={2}
            >
              <Button variant="contained" color="success">
                Update
              </Button>
            </Stack>
          </form>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
