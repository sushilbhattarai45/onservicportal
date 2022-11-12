import {
  Grid,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import toast from "../../src/components/Toast/index.js";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const EditProfile = () => {
  const router = useRouter();
  const { id } = router.query;

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

  const handleFilesChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    setImage(file);
    setDisableButton(false);
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
      console.log(values);

      try {
        const { data } = await axios.post(
          `http://172.104.188.69:3001/v1/api/user/updateUser`,
          {
            ...values,
          }
        );

        setDisableButton(true);
        toast({
          type: "success",
          message: "User updated successfully",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUserDetails = async () => {
    try {
      const { data } = await axios.post(
        `http://172.104.188.69:3001/v1/api/user/getOneUser`,
        {
          GIVEN_API_KEY: "AXCF",
          user_contact: id,
        }
      );

      setValues(data.data);

      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="User edit">
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={2} direction="row" alignItems="center">
              <img
                src={values.user_profileImage}
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
                  value={values.user_name}
                  required
                />
              </FormControl>

              <TextField
                fullWidth
                name="user_email"
                type="email"
                label="Email"
                onChange={handleInputChange}
                value={values.user_email}
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
                  value={values.user_district}
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
                  value={values.user_city}
                />
              </FormControl>
              <TextField
                fullWidth
                name="user_street"
                type="text"
                label="Street"
                onChange={handleInputChange}
                value={values.user_street}
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
                value={values.user_contact}
              />
              <TextField
                fullWidth
                name="user_gender"
                type="text"
                label="Gender"
                onChange={handleInputChange}
                value={values.user_gender}
              />
              <TextField
                fullWidth
                name="user_password"
                type="text"
                label="Password"
                onChange={handleInputChange}
                value={values.user_password}
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
                color="success"
                type="submit"
                disabled={disableButton}
              >
                Update
              </Button>
            </Stack>
          </form>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
