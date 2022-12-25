import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Select,
  CircularProgress,
  MenuItem,
} from "@mui/material";

const CategoryForm = ({
  values,
  handleFormSubmit,
  disableButton,
  handleFilesChange,
  handleInputChange,
  buttonText,
  imageLoading,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={2} direction="row" alignItems="center">
        {imageLoading ? (
          <CircularProgress />
        ) : (
          <img
            src={values?.category_photo}
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
            name="category_photo"
            required={values?.category_photo ? false : true}
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
            name="category_name"
            type="text"
            label="name"
            onChange={handleInputChange}
            value={values?.category_name}
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="select-verified">Show on home</InputLabel>
          <Select
            labelId="select-verified"
            value={values?.category_showonhome}
            label="Show on home"
            onChange={handleInputChange}
            name="category_showonhome"
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          name="category_updatedby"
          type="text"
          label="Updated By"
          disabled={true}
          value={values?.category_updatedby}
        />

        <FormControl fullWidth>
          <InputLabel id="select-verified">Status</InputLabel>
          <Select
            labelId="select-verified"
            value={values?.category_status}
            label="Status"
            onChange={handleInputChange}
            name="category_status"
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
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
        {values?.category_doc && (
          <TextField
            sx={{
              minWidth: 200,
            }}
            name="toc"
            type="text"
            label="Date of creation"
            disabled={true}
            value={values?.category_doc.date + " " + values?.category_doc.time}
          />
        )}
        {values?.category_dou && (
          <TextField
            sx={{
              minWidth: 200,
            }}
            name="toc"
            type="text"
            label="Date of updation"
            disabled={true}
            value={values?.category_dou.date + " " + values?.category_dou.time}
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

export default CategoryForm;
