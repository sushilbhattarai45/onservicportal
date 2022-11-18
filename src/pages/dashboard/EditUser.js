import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Container,
} from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useEffect } from "react";
import axios from "axios";

function EditProfile() {
  const id = window.location.pathname.split("/")[2];

  const [values, setValues] = useState({
    user_name: "",
    user_email: "",
    user_district: "",
    user_city: "",
    user_street: "",
    user_contact: "",
    user_gender: "",
    user_password: "",
    user_profileImage: "",
  });

  const [image, setImage] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const handleFilesChange = async (event) => {
    const file = event.target.files[0];

    console.log(file);

    if (!file) {
      return;
    }

    // setImage(file);
    console.log(URL.createObjectURL(file));

    let data = new FormData();
    data.append("file", file);

    console.log(data);

    try {
      const response = await axios.post("/v1/api/user/uploadImage", {
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response?.data);

      toast.success("Image uploaded successfully");

      setDisableButton(false);
    } catch (err) {
      console.log(err);
    }
    console.log(image);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    setDisableButton(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!disableButton) {
      const toastId = toast.loading("Updating...");
      console.log(values);

      try {
        await axios.post(`/v1/api/user/updateUser`, values);

        setDisableButton(true);
        toast.success("User updated successfully", {
          duration: 4000,
          position: "top-center",
        });
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    }
  };

  const getUserDetails = async () => {
    try {
      console.log(id);
      const { data } = await axios.post(`/v1/api/user/getOneUser`, {
        GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
        user_contact: id,
      });

      toast.success("User details fetched successfully");

      setValues(data.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Page title="Service providers">
      <Container>
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
              name="user_gender"
              type="text"
              label="Gender"
              onChange={handleInputChange}
              value={values?.user_gender}
            />
            <TextField
              fullWidth
              name="user_password"
              type="text"
              label="Password"
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
              Update
            </Button>
          </Stack>
        </form>
      </Container>
    </Page>
  );
}

export default EditProfile;
