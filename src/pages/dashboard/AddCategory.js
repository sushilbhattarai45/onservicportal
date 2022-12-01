import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useContext } from "react";
import axios from "axios";
import CategoryForm from "../../components/dashboard/CategoryForm";

import { useNavigate } from "react-router-dom";
import { ContextProvider } from "../../Context";

function AddCategory() {
  const { login } = useContext(ContextProvider);
  const [account] = login;

  const [values, setValues] = useState({
    category_name: "",
    category_status: true,
    category_showonhome: false,
    category_photo: "",
    category_updatedby: account.displayName,
    category_photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=780",
  });

  const [image, setImage] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const navigate = useNavigate();

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
      console.log(values);

      try {
        const { data } = await axios.post(`/v1/api/categories/postcategory`, {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          ...values,
        });

        setDisableButton(true);
        toast.success("Category added successfully", {
          duration: 4000,
          position: "top-center",
        });

        // redirect to the edit page
        const { _id } = data.postcategory;
        navigate(`/categories/edit/${_id}`);
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    }
  };

  return (
    <Page title="Add new category">
      <Container>
        <CategoryForm
          values={values}
          handleFormSubmit={handleFormSubmit}
          disableButton={disableButton}
          handleFilesChange={handleFilesChange}
          handleInputChange={handleInputChange}
          buttonText="Save"
          imageLoading={imageLoading}
        />
      </Container>
    </Page>
  );
}

export default AddCategory;
