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
} from "@mui/material";

const SubCategoryForm = ({
  values,
  handleFormSubmit,
  disableButton,
  handleFilesChange,
  handleInputChange,
  buttonText,
  edit,
  imageLoading,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={2} direction="row" alignItems="center">
        {imageLoading ? (
          <CircularProgress />
        ) : (
          <img
            src={values?.subCat_photo}
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
            required
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
        <FormControl fullWidth>
          <InputLabel id="select-isSubcat">
            Is 2<sup>nd</sup> Sub Category?
          </InputLabel>
          <Select
            labelId="select-isSubcat"
            value={values?.subCat_isSecond}
            label="Is 2nd Sub Category?"
            onChange={handleInputChange}
            name="subCat_isSecond"
            required
            disabled={edit}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ my: 1 }} fullWidth>
          <InputLabel htmlFor="name">Name</InputLabel>
          <OutlinedInput
            id="name"
            name="subCat_name"
            type="text"
            label="name"
            onChange={handleInputChange}
            value={values?.subCat_name}
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="select-verified">
            {values.subCat_isSecond ? `Sub category` : `Category`}
          </InputLabel>
          <Select
            labelId="select-verified"
            value={values?.category_id}
            label={values.subCat_isSecond ? `Sub category` : `Category`}
            onChange={handleInputChange}
            name="category_id"
            required
          >
            {values?.categories.map((category) => (
              <MenuItem value={category._id} key={category._id}>
                {values.subCat_isSecond
                  ? category.subCat_name
                  : category.category_name}
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
          <InputLabel id="select-verified">Has Sub Category</InputLabel>
          <Select
            labelId="select-verified"
            value={values?.subCat_hassubCat}
            label="Has Sub Category"
            onChange={handleInputChange}
            name="subCat_hassubCat"
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          name="subCat_updatedby"
          type="text"
          label="Updated By"
          disabled={true}
          value={values?.subCat_updatedby}
        />

        <FormControl fullWidth>
          <InputLabel id="select-verified">Status</InputLabel>
          <Select
            labelId="select-verified"
            value={values?.subCat_status}
            label="Status"
            onChange={handleInputChange}
            name="subCat_status"
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

export default SubCategoryForm;
