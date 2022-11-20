import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState } from "react";
import axios from "axios";
import SPForm from "../../components/dashboard/SPForm";
import { useNavigate } from "react-router-dom";

function EditServiceProvider() {
  const [values, setValues] = useState({
    sp_name: "",
    sp_district: "",
    sp_city: "",
    sp_street: "",
    sp_contact: "",
    sp_gender: "",
    sp_skills: [],
    sp_profileImage: "",
    sp_verified: false,
    sp_status: "ACTIVE",
    sp_bio: "",
    sp_showReview: true,
  });

  const navigate = useNavigate();

  const [disableButton, setDisableButton] = useState(true);

  const handleFilesChange = async (event) => {};

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
      const toastId = toast.loading("Adding Service Provider...");

      try {
        const { data } = await axios.post(`/v1/api/sp/postSp`, {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          ...values,
        });

        if (data.sp) {
          setDisableButton(true);
          toast.success("Service Provider added successfully");
          const id = data.sp.sp_contact;
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
        />
      </Container>
    </Page>
  );
}

export default EditServiceProvider;
