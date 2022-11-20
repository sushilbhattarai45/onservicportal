import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Select,
  MenuItem,
  Box,
  Chip,
} from "@mui/material";

const skills = [
  "House Plumbing",
  "Office Plumbing",
  "School Plumbing",
  "Electrician",
  "Carpenter",
  "Painter",
  "Mason",
  "Programmer",
  "Teacher",
  "Doctor",
  "Lawyer",
];

const SPForm = ({
  values,
  handleInputChange,
  handleFilesChange,
  handleFormSubmit,
  disableButton,
  setValues,
  setDisableButton,
  buttonText,
}) => {
  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setValues({
      ...values,
      sp_skills: typeof value === "string" ? value.split(",") : value,
    });

    setDisableButton(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={2} direction="row" alignItems="center">
        {values?.sp_profileImage && (
          <img
            src={values.sp_profileImage}
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
            name="sp_name"
            type="text"
            label="name"
            onChange={handleInputChange}
            value={values.sp_name}
            required
          />
        </FormControl>

        <TextField
          fullWidth
          name="sp_bio"
          type="text"
          label="Bio"
          multiline
          onChange={handleInputChange}
          value={values.sp_bio}
          required
        />

        <FormControl fullWidth>
          <InputLabel id="multiple-skills-label">Skills</InputLabel>
          <Select
            labelId="multiple-skills-label"
            id="multiple-skills-label"
            multiple
            value={values.sp_skills}
            onChange={handleSkillsChange}
            input={<OutlinedInput id="select-multiple-chip" label="Skills" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {skills.map((skill) => (
              <MenuItem key={skill} value={skill}>
                {skill}
              </MenuItem>
            ))}
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
            name="sp_district"
            type="text"
            label="district"
            onChange={handleInputChange}
            value={values.sp_district}
          />
        </FormControl>
        <FormControl sx={{ mx: 2 }} fullWidth>
          <InputLabel htmlFor="city">City</InputLabel>
          <OutlinedInput
            id="city"
            name="sp_city"
            type="text"
            label="city"
            onChange={handleInputChange}
            value={values.sp_city}
          />
        </FormControl>
        <TextField
          fullWidth
          name="sp_street"
          type="text"
          label="Street"
          onChange={handleInputChange}
          value={values.sp_street}
        />
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
        alignItems="center"
        justifyContent="space-between"
        my={2}
      >
        <TextField
          fullWidth
          name="sp_contact"
          type="number"
          label="Contact"
          onChange={handleInputChange}
          value={values.sp_contact}
        />
        <TextField
          fullWidth
          name="sp_gender"
          type="text"
          label="Gender"
          onChange={handleInputChange}
          value={values.sp_gender}
        />
        <TextField
          fullWidth
          name="user_password"
          type="text"
          label="Status"
          onChange={handleInputChange}
          value={values.sp_status}
        />
        <FormControl fullWidth>
          <InputLabel id="select-verified">Verified</InputLabel>
          <Select
            labelId="select-verified"
            value={values.sp_verified}
            label="Verified"
            onChange={handleInputChange}
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
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
          color="success"
          type="submit"
          disabled={disableButton}
        >
          {buttonText}
        </Button>
      </Stack>
    </form>
  );
};

export default SPForm;
