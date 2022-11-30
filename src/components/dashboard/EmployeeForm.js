import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const EmployeeForm = ({
  values,
  handleFormSubmit,
  disableButton,
  handleInputChange,
  buttonText,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
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
            name="employee_name"
            type="text"
            label="name"
            onChange={handleInputChange}
            value={values?.employee_name}
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="select-post">Post</InputLabel>
          <Select
            labelId="select-post"
            value={values?.employee_post}
            label="Post"
            onChange={handleInputChange}
            name="employee_post"
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="E1">Office Staff</MenuItem>
            <MenuItem value="E2">Outside staff</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="select-status">Status</InputLabel>
          <Select
            labelId="select-status"
            value={values?.employee_status}
            label="Status"
            onChange={handleInputChange}
            name="employee_status"
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ my: 1 }} fullWidth>
          <InputLabel htmlFor="contact">Contact</InputLabel>
          <OutlinedInput
            id="contact"
            name="employee_contact"
            type="number"
            label="Contact"
            onChange={handleInputChange}
            value={values?.employee_contact}
            required
          />
        </FormControl>
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

export default EmployeeForm;
