import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import axios from "axios";
import UserForm from "../../components/dashboard/UserForm";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ContextProvider } from "../../Context";

function AddUser() {
  const { login } = useContext(ContextProvider);
  const [account] = login;

  const [values, setValues] = useState({
    user_name: "",
    user_email: "",
    user_district: "",
    user_city: "",
    user_street: "",
    user_contact: "",
    user_gender: "Male",
    sp_platform: "WEB",
    employee_contact: account.contact,
    user_password: "123456",
    user_profileImage: `https://ui-avatars.com/api/?size=128&background=random&rounded=true&name=${account.displayName}`,
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

    const serverUrl = "http://172.104.188.69:3001/v1/api/user/uploadImage";
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

    if (values.user_profileImage.includes("https://ui-avatars.com/api/")) {
      setValues({
        ...values,
        user_profileImage: `https://ui-avatars.com/api/?size=128&background=random&rounded=true&name=${values.user_name}`,
        [name]: value,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }

    if (name === "user_contact") {
      if (value.length !== 10) {
        setContactError("Contact number must be 10 digits");
      } else {
        setContactError("");
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

    if (
      values.user_name === "" ||
      values.user_email === "" ||
      values.user_district === "" ||
      values.user_city === "" ||
      values.user_street === "" ||
      values.user_contact === ""
    ) {
      toast.error("Please fill all the fields");
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

          navigate(`/user/edit/${data.user.user_contact}`);
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
