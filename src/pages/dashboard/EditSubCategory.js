import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SubCategoryForm from "../../components/dashboard/SubCategoryForm";
import { ContextProvider } from "../../Context";

function EditSubCategory() {
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
    subCat_isSecond: false,
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
        subCat_photo: imgUrl,
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

      const formatedData = {
        subCategory_photo: values.subCat_photo,
        subCategory_status: values.subCat_status,
        subCategory_name: values.subCat_name,
        category_id: values.category_id,
        subCategory_updatedby: account.displayName,
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
    let data;

    try {
      const newValues = await getSubCategoryDetails();

      if (newValues.subCat_isSecond) {
        //get all sub categories
        const { data: subcategories } = await axios.post(
          "/v1/api/subcategories/getallsubcategory",
          {
            GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          }
        );

        console.log(subcategories);
        data = subcategories.data;
      } else {
        //get all categories
        const { data: categories } = await axios.post("/v1/api/categories", {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
        });

        console.log(categories);
        data = categories;
      }

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
          edit={true}
          imageLoading={imageLoading}
        />
      </Container>
    </Page>
  );
}

export default EditSubCategory;
