import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import SubCategoryForm from "../../components/dashboard/SubCategoryForm";
import { ContextProvider } from "../../Context";

function AddSubCategory() {
  const { login } = useContext(ContextProvider);
  const [account] = login;

  const [values, setValues] = useState({
    subCat_name: "",
    subCat_hassubCat: true,
    subCat_status: false,
    subCat_photo: "",
    subCat_updatedby: account.displayName,
    categories: [],
    category_id: "",
    subCat_photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=780",
  });

  const [image, setImage] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const navigate = useNavigate();

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
        const { data } = await axios.post(
          `/v1/api/subcategories/postsubcategory`,
          {
            GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
            ...values,
          }
        );

        setDisableButton(true);
        toast.success("Sub Category added successfully", {
          duration: 4000,
          position: "top-center",
        });

        // redirect to the edit page
        const { _id } = data.data;
        navigate(`/sub-category/edit/${_id}`);
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.post("/v1/api/categories", {
        GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
      });

      console.log(data);
      setValues({
        ...values,
        categories: data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Page title="Add new category">
      <Container>
        <SubCategoryForm
          values={values}
          handleFormSubmit={handleFormSubmit}
          disableButton={disableButton}
          handleFilesChange={handleFilesChange}
          handleInputChange={handleInputChange}
          buttonText="Save"
        />
      </Container>
    </Page>
  );
}

export default AddSubCategory;
