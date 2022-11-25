import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
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

  const [image, setImage] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const id = window.location.pathname.split("/")[3];

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

    console.log(data);

    try {
      const response = await axios.post("/v1/api/user/uploadImage", {
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response?.data);

      toast.success("Image uploaded successfully");

      setDisableButton(false);
    } catch (err) {
      console.log(err);
    }
    console.log(image);
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
        await axios.post(`/v1/api/categories/updatecategory`, {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          ...values,
          id,
        });

        setDisableButton(true);
        toast.success("Category updated successfully", {
          duration: 4000,
          position: "top-center",
        });
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
      const { data } = await axios.post(`/v1/api/categories`, {
        GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
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
        />
      </Container>
    </Page>
  );
}

export default EditCategory;
