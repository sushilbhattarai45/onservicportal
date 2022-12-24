import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  MenuItem,
  Select,
  CircularProgress,
  Autocomplete,
} from "@mui/material";

import districts from "../../utils/districts";

const UserForm = ({
  values,
  handleFormSubmit,
  disableButton,
  handleFilesChange,
  handleInputChange,
  buttonText,
  imageLoading,
  contactError,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={2} direction="row" alignItems="center">
        {imageLoading ? (
          <CircularProgress />
        ) : (
          <img
            src={values?.user_profileImage}
            alt="Error loading image"
            width="150"
          />
        )}
        <FormControl>
          <input
            id="outlined-adornment-amount"
            type="file"
            onChange={handleFilesChange}
            label="Upload Image"
            accept="image/*"
            name="user_profileImage"
            required={values?.user_profileImage ? false : true}
          />
        </FormControl>
      </Stack>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        my={2}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
      >
        <FormControl sx={{ my: 1 }} fullWidth>
          <InputLabel htmlFor="name">Name</InputLabel>
          <OutlinedInput
            id="name"
            name="user_name"
            type="text"
            label="name"
            onChange={handleInputChange}
            value={values?.user_name}
            required
          />
        </FormControl>

        <TextField
          fullWidth
          name="user_email"
          type="email"
          label="Email"
          onChange={handleInputChange}
          value={values?.user_email}
          required
        />

        <FormControl fullWidth>
          <InputLabel id="select-gender">Gender</InputLabel>
          <Select
            labelId="select-gender"
            value={values.user_gender}
            label="Gender"
            onChange={handleInputChange}
            name="user_gender"
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
        alignItems="center"
        justifyContent="space-between"
        my={2}
      >
        <Autocomplete
          fullWidth
          id="district-select"
          options={districts}
          name="user_district"
          value={values?.user_district}
          onChange={(_, value) => {
            handleInputChange({
              target: {
                name: "user_district",
                value,
              },
            });
          }}
          renderInput={(params) => <TextField {...params} label="District" />}
        />

        <FormControl sx={{ mx: 2 }} fullWidth>
          <InputLabel htmlFor="city">City</InputLabel>
          <OutlinedInput
            id="city"
            name="user_city"
            type="text"
            label="city"
            onChange={handleInputChange}
            value={values?.user_city}
          />
        </FormControl>
        <TextField
          fullWidth
          name="user_street"
          type="text"
          label="Street"
          onChange={handleInputChange}
          value={values?.user_street}
        />
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
        alignItems="center"
        justifyContent="space-between"
        my={2}
      >
        <FormControl fullWidth>
          <InputLabel id="select-status">Status</InputLabel>

          <Select
            labelId="select-status"
            value={values?.user_status}
            label="Status"
            onChange={handleInputChange}
            name="user_status"
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            <MenuItem value="SUSPENDED">SUSPENDED</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          name="user_contact"
          type="number"
          label="Contact"
          onChange={handleInputChange}
          value={values?.user_contact}
          disabled={buttonText === "Update" ? true : false}
          required
          error={contactError}
          helperText={contactError}
        />
        <TextField
          fullWidth
          name="user_password"
          type="text"
          label="Password"
          disabled="true"
          onChange={handleInputChange}
          value={values?.user_password}
        />
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
        alignItems="center"
        justifyContent="space-between"
        my={2}
      >
        {values?.user_toc && (
          <TextField
            sx={{
              minWidth: 200,
            }}
            name="toc"
            type="text"
            label="Date of creation"
            disabled={true}
            value={values?.user_toc.date + " " + values?.user_toc.time}
          />
        )}

        {values?.user_updatedBy && (
          <TextField
            sx={{
              minWidth: 200,
            }}
            name="updatedBy"
            type="text"
            label="Updated by"
            disabled={true}
            value={values?.user_updatedBy}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={disableButton}
        >
          {buttonText}
        </Button>
      </Stack>
    </form>
  );
};

export default UserForm;
