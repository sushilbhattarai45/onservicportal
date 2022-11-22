import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useEffect } from "react";
import axios from "axios";
import SPForm from "../../components/dashboard/SPForm";

function EditServiceProvider() {
  const id = window.location.pathname.split("/")[3];

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
    sp_paid: true,
    sp_location: "",
    sp_tiktok: "",
    sp_officeNumber: "",
  });

  // const [image, setImage] = useState("");
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
      const toastId = toast.loading("Updating Service Provider...");

      try {
        await axios.post(`/v1/api/sp/updateSp`, {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          ...values,
        });

        setDisableButton(true);
        toast.success("Service Provider updated successfully");
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    }
  };

  const getSpDetails = async () => {
    try {
      const { data } = await axios.post(`/v1/api/sp/getOneSp`, {
        GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
        sp_contact: id,
      });

      setValues(data.data);
      toast.success("Details fetched successfully");
    } catch (error) {
      toast.error("Error fetching details");
      console.log(error);
    }
  };

  useEffect(() => {
    getSpDetails();
  }, []);

  return (
    <Page title="Edit Service Provider">
      <Container>
        <SPForm
          values={values}
          setValues={setValues}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          handleFilesChange={handleFilesChange}
          disableButton={disableButton}
          setDisableButton={setDisableButton}
          buttonText="Update"
        />
      </Container>
    </Page>
  );
}

export default EditServiceProvider;
