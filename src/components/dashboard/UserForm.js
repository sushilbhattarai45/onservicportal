import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  MenuItem,
  Select,
} from "@mui/material";

const UserForm = ({
  values,
  handleFormSubmit,
  disableButton,
  handleFilesChange,
  handleInputChange,
  buttonText,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={2} direction="row" alignItems="center">
        <img
          src={values?.user_profileImage}
          alt="Error loading image"
          width="150"
        />
        <FormControl>
          <input
            id="outlined-adornment-amount"
            type="file"
            onChange={handleFilesChange}
            label="Upload Image"
            accept="image/*"
            name="user_profileImage"
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
        <FormControl fullWidth>
          <InputLabel htmlFor="district">District</InputLabel>
          <OutlinedInput
            id="district"
            name="user_district"
            type="text"
            label="district"
            onChange={handleInputChange}
            value={values?.user_district}
          />
        </FormControl>
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
            value={values.user_status}
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
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        my={2}
      >
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
