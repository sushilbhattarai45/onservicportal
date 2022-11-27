import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../../components/dashboard/UserForm";

function EditProfile() {
  const id = window.location.pathname.split("/")[3];

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
    <Page title="Edit user">
      <Container>
        <UserForm
          values={values}
          handleFormSubmit={handleFormSubmit}
          disableButton={disableButton}
          handleFilesChange={handleFilesChange}
          handleInputChange={handleInputChange}
          buttonText="Update"
        />
      </Container>
    </Page>
  );
}

export default EditProfile;
