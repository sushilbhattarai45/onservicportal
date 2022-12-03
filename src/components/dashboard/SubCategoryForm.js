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

import { useState, useEffect } from "react";

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
  const [defaultValue, setDefaultValue] = useState([]);

  // get the value to be displayed in the category select
  const getValues = () => {
    const { categories, category_id } = values;
    if (category_id) {
      const category = categories.find(
        (category) => category._id === category_id
      );

      setDefaultValue(category);
    }
  };

  useEffect(() => {
    getValues();
  }, [values]);

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
            required={values?.subCat_photo ? false : true}
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

        <Autocomplete
          fullWidth
          value={defaultValue}
          onChange={(_, newValue) => {
            if (!newValue) {
              return;
            }
            handleInputChange({
              target: {
                name: "category_id",
                value: newValue._id,
              },
            });
          }}
          id="category-select"
          options={values?.categories}
          getOptionLabel={(option) =>
            values.subCat_isSecond ? option.subCat_name : option.category_name
          }
          renderOption={(props, value) => (
            <li {...props}>
              {values.subCat_isSecond ? value.subCat_name : value.category_name}
            </li>
          )}
          isOptionEqualToValue={(option, value) => option._id == value._id}
          renderInput={(params) => (
            <TextField
              {...params}
              label={values.subCat_isSecond ? `Subcategory ` : `Category`}
            />
          )}
        />
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
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
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
