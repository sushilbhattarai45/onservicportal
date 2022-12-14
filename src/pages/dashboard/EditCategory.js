import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useEffect, useContext } from "react";

import axios from "../../utils/axiosInstance";
import upload from "../../utils/axiosInstanceUpload";

import CategoryForm from "../../components/dashboard/CategoryForm";
import { ContextProvider } from "../../Context";

function EditCategory() {
  const { login } = useContext(ContextProvider);
  const [account] = login;

  const [values, setValues] = useState({
    category_name: "",
    category_status: true,
    category_showonhome: false,
    category_photo: "",
    category_updatedby: account.displayName,
  });

  const [disableButton, setDisableButton] = useState(true);

  const id = window.location.pathname.split("/")[3];

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
        category_photo: imgUrl,
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
      const toastId = toast.loading("Saving...");

      try {
        const { data } = await axios({
          method: "POST",
          url: `/v1/api/categories/updatecategory`,
          data: {
            GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
            ...values,
            id,
            category_updatedby: account.displayName,
          },
        });

        if (data.statuscode === 400) {
          toast.error(data.error);
        }

        setDisableButton(true);
        toast.success("Category updated successfully", {
          duration: 4000,
          position: "top-center",
        });

        await getCategoryDetails();
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    }
  };

  const getCategoryDetails = async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `/v1/api/categories`,
        data: {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
        },
      });

      const category = data.find((category) => category._id === id);

      setValues(category);
      toast.success("Details fetched successfully");
    } catch (error) {
      toast.error("Error fetching details");
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryDetails();
  }, []);

  return (
    <Page title="Edit category">
      <Container>
        <CategoryForm
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

export default EditCategory;
