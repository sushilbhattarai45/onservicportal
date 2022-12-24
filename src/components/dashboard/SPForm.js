import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import districts from "../../utils/districts";

const SPForm = ({
  values,
  handleInputChange,
  handleFilesChange,
  handleFormSubmit,
  disableButton,
  setValues,
  setDisableButton,
  buttonText,
  email,
  imageLoading,
  contactError,
}) => {
  const [skills, setSkills] = useState([]);
  const handleSkillsChange = (event, value) => {
    setValues({
      ...values,
      sp_skills: typeof value === "string" ? value.split(",") : value,
    });

    setDisableButton(false);
  };

  const getSkills = async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "/v1/api/subcategories/getmixedsubcategory",
        data: {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
        },
      });

      console.log(data.data);
      const s = data.data.map((skill) => skill.subCat_name);
      console.log(s);
      setSkills(s);
    } catch (error) {
      console.log(error);
      toast();
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={2} direction="row" alignItems="center">
        {imageLoading ? (
          <CircularProgress />
        ) : (
          <img
            src={values?.sp_profileImage}
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
            required={values?.sp_profileImage ? false : true}
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
        />

        <Autocomplete
          fullWidth
          multiple
          value={values?.sp_skills}
          onChange={handleSkillsChange}
          id="controllable-states-demo"
          options={skills}
          renderInput={(params) => <TextField {...params} label="Skills" />}
        />
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
        alignItems="center"
        justifyContent="space-between"
        my={2}
      >
        {email && (
          <TextField
            fullWidth
            name="email"
            type="email"
            label="Email"
            required
            onChange={handleInputChange}
            value={values.email}
          />
        )}

        <FormControl fullWidth>
          <InputLabel id="select-paid">Paid</InputLabel>
          <Select
            labelId="select-paid"
            value={values.sp_paid}
            label="Paid"
            onChange={handleInputChange}
            name="sp_paid"
            required
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          name="sp_location"
          type="url"
          label="Map Location"
          onChange={handleInputChange}
          value={values?.sp_location}
        />

        <TextField
          fullWidth
          name="sp_tiktok"
          type="text"
          label="Tiktok Link"
          onChange={handleInputChange}
          value={values.sp_tiktok}
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
          name="sp_officeNumber"
          type="number"
          label="Office Number"
          onChange={handleInputChange}
          value={values.sp_officeNumber}
        />

        <Autocomplete
          fullWidth
          id="district-select"
          options={districts}
          name="sp_district"
          value={values?.sp_district}
          onChange={(_, value) => {
            handleInputChange({
              target: {
                name: "sp_district",
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
          required
          disabled={buttonText === "Update" ? true : false}
          error={contactError}
          helperText={contactError}
        />

        <FormControl fullWidth>
          <InputLabel id="select-gender">Gender</InputLabel>
          <Select
            labelId="select-gender"
            value={values.sp_gender}
            label="Gender"
            onChange={handleInputChange}
            name="sp_gender"
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
            <MenuItem value="Company">Company</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="select-status">Status</InputLabel>
          <Select
            labelId="select-status"
            value={values.sp_status}
            label="Status"
            onChange={handleInputChange}
            name="sp_status"
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            <MenuItem value="SUSPENDED">SUSPENDED</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="select-verified">Verified</InputLabel>
          <Select
            labelId="select-verified"
            value={values.sp_verified}
            label="Verified"
            onChange={handleInputChange}
            name="sp_verified"
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="select-review">Show Review</InputLabel>
          <Select
            labelId="select-review"
            value={values.sp_showReview}
            label="Show Review"
            onChange={handleInputChange}
            name="sp_showReview"
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
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
        {values?.sp_toc && (
          <TextField
            sx={{
              minWidth: 200,
            }}
            name="toc"
            type="text"
            label="Date of creation"
            disabled={true}
            value={values?.sp_toc.date + " " + values?.sp_toc.time}
          />
        )}

        {values?.sp_createdBy && (
          <TextField
            sx={{
              minWidth: 200,
            }}
            name="sp_createdBy"
            type="text"
            label="Created By"
            disabled={true}
            value={values?.sp_createdBy}
          />
        )}

        {values?.sp_updatedBy && (
          <TextField
            sx={{
              minWidth: 200,
            }}
            name="updatedBy"
            type="text"
            label="Updated by"
            disabled={true}
            value={values?.sp_updatedBy}
          />
        )}

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
