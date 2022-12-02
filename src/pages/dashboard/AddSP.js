import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useContext } from "react";
import axios from "axios";
import SPForm from "../../components/dashboard/SPForm";
import { useNavigate } from "react-router-dom";
import { ContextProvider } from "../../Context";

function EditServiceProvider() {
  const { login } = useContext(ContextProvider);
  const [account] = login;

  const [values, setValues] = useState({
    sp_name: "",
    sp_district: "",
    sp_city: "",
    sp_street: "",
    sp_contact: "",
    sp_gender: "Male",
    sp_skills: [],
    sp_profileImage: "",
    sp_verified: false,
    sp_status: "ACTIVE",
    sp_bio: "",
    sp_showReview: true,
    email: "",
    sp_paid: true,
    sp_location: "",
    sp_tiktok: "",
    sp_officeNumber: "",
    sp_verified: true,
    sp_createdBy: account.displayName,
    sp_platform: "web",
    employee_contact: account.contact,
  });

  const navigate = useNavigate();

  const [disableButton, setDisableButton] = useState(true);
  const [contactError, setContactError] = useState("");

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
        sp_profileImage: imgUrl,
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

    if (name === "sp_contact") {
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

    if (values.sp_contact.length !== 10) {
      setContactError("Invalide contact");
      return;
    }

    if (!disableButton) {
      const toastId = toast.loading("Adding Service Provider...");

      try {
        // save the service provider as a user

        const userData = {
          user_name: values.sp_name,
          user_email: values.email,
          user_district: values.sp_district,
          user_city: values.sp_city,
          user_street: values.sp_street,
          user_contact: values.sp_contact,
          user_gender: values.sp_gender,
          user_password: "1234",
          user_profileImage: values.sp_profileImage,
        };

        console.log(userData);
        const { data } = await axios.post(`/v1/api/user/register`, userData);

        if (data.statuscode == 600) {
          toast.error("User already exists");
        } else if (data.user) {
          setDisableButton(true);

          const spData = {
            ...values,
            user_id: data.user._id,
          };

          // save the service provider
          const { data: sp_data } = await axios.post(`/v1/api/sp/postSp`, {
            GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
            ...spData,
          });

          toast.success("Service Provider added successfully");
          const id = sp_data.sp.sp_contact;
          navigate(`/sp/edit/${id}`);
        } else {
          toast.error(data.message);
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
    <Page title="Add Service Provider">
      <Container>
        <SPForm
          values={values}
          setValues={setValues}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          handleFilesChange={handleFilesChange}
          disableButton={disableButton}
          setDisableButton={setDisableButton}
          buttonText="Save"
          email={true}
          imageLoading={imageLoading}
          contactError={contactError}
        />
      </Container>
    </Page>
  );
}

export default EditServiceProvider;
