import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useEffect } from "react";
import axios from "axios";
import SubCategoryForm from "../../components/dashboard/SubCategoryForm";

function EditSubCategory() {
  const [values, setValues] = useState({
    subCat_name: "",
    subCat_hassubCat: true,
    subCat_status: false,
    subCat_photo: "",
    subCat_updatedby: "",
    categories: [],
    category_id: "",
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

      const formatedData = {
        subCategory_photo: values.subCat_photo,
        subCategory_status: values.subCat_status,
        subCategory_updatedby: values.subCat_updatedby,
        subCategory_name: values.subCat_name,
        category_id: values.category_id,
      };

      try {
        await axios.post(`/v1/api/subcategories/updatesubcategory`, {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          ...formatedData,
          subCategory_id: id,
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

  const getSubCategoryDetails = async () => {
    try {
      const { data } = await axios.post(
        `/v1/api/subcategories/getallsubcategory`,
        {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
        }
      );

      console.log(data);

      const sub_category = data.data.find(
        (sub_category) => sub_category._id === id
      );

      return sub_category;
    } catch (error) {
      toast.error("Error fetching details");
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.post("/v1/api/categories", {
        GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
      });

      console.log(data);

      const newValues = await getSubCategoryDetails();

      toast.success("Details fetched successfully");

      setValues({
        ...newValues,
        categories: data,
      });

      console.log(values);
      console.log({
        ...newValues,
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
    <Page title="Edit category">
      <Container>
        <SubCategoryForm
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

export default EditSubCategory;
