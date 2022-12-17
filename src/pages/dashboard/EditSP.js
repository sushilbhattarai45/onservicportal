import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SPForm from "../../components/dashboard/SPForm";
import Bill from "../../components/dashboard/Bill";
import { ContextProvider } from "../../Context";

function EditServiceProvider() {
  const id = window.location.pathname.split("/")[3];

  const { login } = useContext(ContextProvider);
  const [account] = login;

  const [bill, setBill] = useState({});

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
    sp_updatedBy: account.displayName,
  });

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
      setContactError("Invalide contact ");
      return;
    }

    if (!disableButton) {
      const toastId = toast.loading("Updating Service Provider...");

      try {
        await axios.post(`/v1/api/sp/updateSp`, {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          ...values,
          sp_updatedBy: account.displayName,
        });

        setDisableButton(true);
        toast.success("Service Provider updated successfully");

        getSpDetails();
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
      setBill(data.data);
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
          imageLoading={imageLoading}
          contactError={contactError}
        />

        {bill?.sp_billid && (
          <Bill
            image={bill?.sp_profileImage}
            name={bill.sp_name}
            contact={bill.sp_contact}
            billId={bill?.sp_billid}
            date={bill?.sp_toc.date}
            address={`${bill?.sp_street}, ${bill.sp_city}, ${bill.sp_district}`}
          />
        )}
      </Container>
    </Page>
  );
}

export default EditServiceProvider;
