import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Select,
  MenuItem,
  Autocomplete,
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
  const handleTagChange = (_, value) => {
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
        ) : values?.ads_type === "IMAGE" ? (
          <img
            src={values?.ads_mediaLink}
            alt="Error loading image"
            width="300"
          />
        ) : (
          <video
            src={values?.ads_mediaLink}
            alt="Error loading video"
            controls
            width="300"
          />
        )}
        <FormControl>
          <input
            id="outlined-adornment-amount"
            type="file"
            onChange={handleFilesChange}
            label="Upload Image"
            accept={values?.ads_type === "IMAGE" ? "image/*" : "video/*"}
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
        {values?.ads_location == "CATAD" && (
          <Autocomplete
            fullWidth
            multiple
            value={values?.ads_tag}
            onChange={handleTagChange}
            id="tags-select"
            options={tags}
            renderInput={(params) => <TextField {...params} label="Tags" />}
          />
        )}
      </Stack>

      <Stack
        alignItems="center"
        justifyContent="space-between"
        my={2}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
      >
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
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
        alignItems="center"
        justifyContent="space-between"
        my={2}
      >
        {values?.ads_toc && (
          <TextField
            sx={{
              minWidth: 200,
            }}
            name="toc"
            type="text"
            label="Date of creation"
            disabled={true}
            value={values?.ads_toc.date + " " + values?.ads_toc.time}
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

export default AdsForm;
