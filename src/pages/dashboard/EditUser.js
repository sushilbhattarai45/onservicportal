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

  const [disableButton, setDisableButton] = useState(true);

  const [imageLoading, setImageLoading] = useState(false);
  const handleFilesChange = async (event) => {
    const [file] = event.target.files;

    if (!file) {
      return;
    }

    setImageLoading(true);

    const formData = new FormData();
    formData.append("pic", file);

    try {
      const { data } = await axios.post("/v1/api/user/web/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { msg, imgUrl } = data;

      toast.success(msg);
      setDisableButton(false);
      setValues({
        ...values,
        user_profileImage: imgUrl,
      });
    } catch (err) {
      toast.error("Error uploading image");
    } finally {
      setImageLoading(false);
    }
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

        await getUserDetails();
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
          imageLoading={imageLoading}
        />
      </Container>
    </Page>
  );
}

export default EditProfile;
