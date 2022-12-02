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
    subCat_photo: "",
    subCat_isSecond: false,
  });

  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);

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

    if (name == "subCat_isSecond" && value == true) {
      setValues({
        ...values,
        categories: subCategories,
        [name]: value,
        category_id: "",
      });
    } else if (name == "subCat_isSecond" && value == false) {
      setValues({
        ...values,
        categories: categories,
        [name]: value,
        category_id: "",
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
    setDisableButton(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!disableButton) {
      const toastId = toast.loading("Saving...");
      console.log(values);

      try {
        let id;

        if (values.subCat_isSecond) {
          const { data } = await axios.post(
            `/v1/api/subcategories/postsecond`,
            {
              GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
              ...values,
            }
          );

          setDisableButton(true);
          toast.success("Second Sub Category added successfully", {
            duration: 4000,
            position: "top-center",
          });

          id = data.data._id;
        } else {
          const { data } = await axios.post(
            `/v1/api/subcategories/postsubcategory`,
            {
              GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
              ...values,
            }
          );

          if (data.statuscode == 600) {
            toast.error(data.error, {
              duration: 4000,
              position: "top-center",
            });
            return;
          }

          setDisableButton(true);
          toast.success("Sub Category added successfully", {
            duration: 4000,
            position: "top-center",
          });

          id = data.data._id;
        }

        // redirect to the edit page
        navigate(`/sub-category/edit/${id}`);
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
      setCategories(data);

      setValues({
        ...values,
        categories: data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getAllSubCategories = async () => {
    try {
      const { data } = await axios.post(
        "/v1/api/subcategories/getallsubcategory",
        {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
        }
      );

      console.log(data);
      setSubCategories(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllSubCategories();
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
          imageLoading={imageLoading}
        />
      </Container>
    </Page>
  );
}

export default AddSubCategory;
