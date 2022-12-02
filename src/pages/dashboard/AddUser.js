import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState } from "react";
import axios from "axios";
import UserForm from "../../components/dashboard/UserForm";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [values, setValues] = useState({
    user_name: "",
    user_email: "",
    user_district: "",
    user_city: "",
    user_street: "",
    user_contact: "",
    user_gender: "Male",
    user_password: "1234",
    user_profileImage: "",
    user_status: "ACTIVE",
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [contactError, setContactError] = useState("");

  const navigate = useNavigate();

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

    if (name === "user_contact") {
      if (value.length !== 10) {
        setContactError("Contact number must be 10 digits");
        setDisableButton(true);
      } else {
        setContactError("");
        setDisableButton(false);
      }
    }
    setDisableButton(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (values?.user_contact?.length !== 10) {
      setContactError("Invalid contact number");
      return;
    }

    if (!disableButton) {
      const toastId = toast.loading("Saving...");
      console.log(values);

      try {
        const { data } = await axios.post(`/v1/api/user/register`, values);

        if (data.statuscode == 600) {
          toast.error(data.message);
        } else {
          setDisableButton(true);
          toast.success("User added successfully", {
            duration: 4000,
            position: "top-center",
          });

          navigate(`/users/edit/${data.data.user_contact}`);
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    }
  };

  return (
    <Page title="Add new user">
      <Container>
        <UserForm
          imageLoading={imageLoading}
          values={values}
          handleFormSubmit={handleFormSubmit}
          disableButton={disableButton}
          handleFilesChange={handleFilesChange}
          handleInputChange={handleInputChange}
          buttonText="Save"
          contactError={contactError}
        />
      </Container>
    </Page>
  );
}

export default AddUser;
