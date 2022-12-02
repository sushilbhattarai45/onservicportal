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
  CircularProgress,
} from "@mui/material";

const AdsForm = ({
  values,
  setValues,
  handleFormSubmit,
  disableButton,
  handleFilesChange,
  handleInputChange,
  buttonText,
  setDisableButton,
  tags,
  imageLoading,
}) => {
  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setValues({
      ...values,
      ads_tag: typeof value === "string" ? value.split(",") : value,
    });

    setDisableButton(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={2} direction="row" alignItems="center">
        {imageLoading ? (
          <CircularProgress />
        ) : (
          <img
            src={values?.ads_mediaLink}
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
            name="ads_mediaLink"
            required={values?.ads_mediaLink ? false : true}
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
            name="ads_name"
            type="text"
            label="name"
            onChange={handleInputChange}
            value={values?.ads_name}
            required
          />
        </FormControl>
        <FormControl sx={{ my: 1 }} fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            name="ads_givenEmail"
            type="email"
            label="email"
            onChange={handleInputChange}
            value={values?.ads_givenEmail}
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="select-verified">Type</InputLabel>
          <Select
            labelId="select-verified"
            value={values?.ads_type}
            label="Type"
            onChange={handleInputChange}
            name="ads_type"
          >
            <MenuItem value="IMAGE">Image</MenuItem>
            <MenuItem value="VIDEO">Video</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack
        alignItems="center"
        justifyContent="space-between"
        my={2}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
      >
        <FormControl fullWidth>
          <InputLabel id="multiple-tags-label">Tags</InputLabel>
          <Select
            labelId="multiple-tags-label"
            id="multiple-tags-label"
            multiple
            value={values.ads_tag}
            onChange={handleTagChange}
            input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Stack
        alignItems="center"
        justifyContent="space-between"
        my={2}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
      >
        <FormControl fullWidth>
          <InputLabel id="select-verified">Location</InputLabel>
          <Select
            labelId="select-verified"
            value={values?.ads_location}
            label="Location"
            onChange={handleInputChange}
            name="ads_location"
          >
            <MenuItem value="HOMETOP">Home Top</MenuItem>
            <MenuItem value="HOMEBOTTOM">Home Bottom</MenuItem>
            <MenuItem value="HOMEVIDEO">Home Video</MenuItem>
            <MenuItem value="BMAD">Bookmark Ad</MenuItem>
            <MenuItem value="CATAD">Category ad</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          name="ads_updatedBy"
          type="text"
          label="Updated By"
          disabled={true}
          value={values?.ads_updatedBy}
        />

        <TextField
          fullWidth
          name="ads_link"
          type="url"
          label="Link"
          onChange={handleInputChange}
          value={values?.ads_link}
        />

        <FormControl fullWidth>
          <InputLabel id="select-verified">Status</InputLabel>
          <Select
            labelId="select-verified"
            value={values?.ads_status}
            label="Status"
            onChange={handleInputChange}
            name="ads_status"
          >
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
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

export default AdsForm;
