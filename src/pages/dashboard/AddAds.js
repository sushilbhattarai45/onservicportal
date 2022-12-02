import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useContext } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import AdsForm from "../../components/dashboard/AdsForm";
import { ContextProvider } from "../../Context";

function AddAds() {
  const { login } = useContext(ContextProvider);
  const [account] = login;

  const [values, setValues] = useState({
    ads_name: "",
    ads_link: "",
    ads_givenEmail: "",
    ads_tag: [],
    ads_updatedBy: account.displayName,
    ads_location: "HOMETOP",
    ads_type: "IMAGE",
    ads_status: "true",
    ads_mediaLink: "",
  });

  const [tags, setTags] = useState([]);

  //   const [image, setImage] = useState("");
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
        ads_mediaLink: imgUrl,
      });
    } catch (err) {
      toast.error("Error uploading image");
    } finally {
      setImageLoading(false);
    }
  };

  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    if (
      (name == "ads_location" && value == "HOMETOP") ||
      (name == "ads_location" && value == "HOMEBOTTOM") ||
      (name == "ads_location" && value == "BMAD")
    ) {
      setValues((prevValues) => ({
        ...prevValues,
        ads_type: "IMAGE",
      }));
      setTags([]);
    } else if (name == "ads_location" && value == "HOMEVIDEO") {
      setValues((prevValues) => ({
        ...prevValues,
        ads_type: "VIDEO",
      }));
      setTags([]);
    } else if (name == "ads_location" && value == "CATAD") {
      setValues((prevValues) => ({
        ...prevValues,
        ads_type: "IMAGE",
      }));
      await getAllTags();
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setDisableButton(false);
  };

  const getAllTags = async () => {
    console.log("get all tags");
    try {
      const { data: categories } = await axios.post("/v1/api/categories", {
        GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
      });

      const { data: subcategories } = await axios.post(
        "/v1/api/subcategories/getallsubcategory",
        {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
        }
      );

      console.log(categories);

      const category_tags = categories.map(
        (category) => category.category_name
      );

      console.log(category_tags);
      const subcategory_tags = subcategories.data.map(
        (subcategory) => subcategory.subCat_name
      );

      console.log(subcategory_tags);

      setTags([...category_tags, ...subcategory_tags]);

      console.log(tags);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!disableButton) {
      const toastId = toast.loading("Saving...");

      try {
        const { data } = await axios.post(`/v1/api/ads/post`, {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          ...values,
        });

        setDisableButton(true);
        toast.success("Ad added successfully", {
          duration: 4000,
          position: "top-center",
        });

        // redirect to the edit page
        const { _id } = data.data;
        navigate(`/ads/edit/${_id}`);
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    }
  };

  return (
    <Page title="Add new ad">
      <Container>
        <AdsForm
          values={values}
          setValues={setValues}
          handleFormSubmit={handleFormSubmit}
          disableButton={disableButton}
          handleFilesChange={handleFilesChange}
          handleInputChange={handleInputChange}
          buttonText="Save"
          setDisableButton={setDisableButton}
          tags={tags}
          imageLoading={imageLoading}
        />
      </Container>
    </Page>
  );
}

export default AddAds;
