import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useContext } from "react";

import axios from "../../utils/axiosInstance";
import upload from "../../utils/axiosInstanceUpload";

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
    sp_profileImage: `https://ui-avatars.com/api/?size=128&background=random&rounded=true&name=${account.displayName}`,
    sp_verified: false,
    sp_status: "ACTIVE",
    sp_bio: "Onservic Service Provider",
    sp_showReview: true,
    email: "",
    sp_paid: true,
    sp_location: "",
    sp_tiktok: "",
    sp_officeNumber: "",
    sp_verified: true,
    sp_createdBy: account.displayName,
    sp_platform: "WEB",
    employee_contact: account.contact,
    sp_updatedBy: account.displayName,
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
      const { data } = await upload({
        method: "POST",
        url: "/v1/api/user/web/upload",
        data: formData,
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

    if (values.sp_profileImage.includes("https://ui-avatars.com/api/")) {
      setValues({
        ...values,
        sp_profileImage: `https://ui-avatars.com/api/?size=128&background=random&rounded=true&name=${values.sp_name}`,
        [name]: value,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }

    if (name === "sp_contact") {
      if (value.length !== 10) {
        setContactError("Contact number must be 10 digits");
      } else {
        setContactError("");
      }
    }
    setDisableButton(false);

    console.log(name + " " + value);
    console.log(values);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (values.sp_contact.length !== 10) {
      setContactError("Invalide contact");
      return;
    }

    if (values.sp_name === "") {
      toast.error("Name is required");
      return;
    } else if (values.sp_district === "") {
      toast.error("District is required");
      return;
    } else if (values.sp_city === "") {
      toast.error("City is required");
      return;
    } else if (values.sp_contact === "") {
      toast.error("Contact is required");
      return;
    } else if (values.sp_skills.length === 0) {
      toast.error("Skills is required");
      return;
    } else if (values.sp_bio === "") {
      toast.error("Bio is required");
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
          employee_contact: account.contact,
          user_city: values.sp_city,
          user_street: values.sp_street,
          user_contact: values.sp_contact,
          user_gender: values.sp_gender,
          user_password: "12345678",
          sp_platform: "WEB",
          user_profileImage: values.sp_profileImage,
        };

        const { data } = await axios({
          method: "POST",
          url: "/v1/api/user/register",
          data: userData,
        });

        if (data.statuscode == 600) {
          toast.error(data.message);
        } else if (data.user) {
          setDisableButton(true);

          const spData = {
            ...values,
            user_id: data.user._id,
          };

          // save the service provider
          const { data: sp_data } = await axios({
            method: "POST",
            url: `/v1/api/sp/postSp`,
            data: {
              GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
              ...spData,
            },
          });

          toast.success("Service Provider added successfully");
          const id = sp_data.sp.sp_contact;
          navigate(`/sp/edit/${id}`);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        if (error.response.data.statusCode === 500) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Something went wrong");
          console.log(error);
        }
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
