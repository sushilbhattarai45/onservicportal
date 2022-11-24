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
    ads_status: "ACTIVE",
    ads_mediaLink:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=780",
  });

  const [tags, setTags] = useState([]);

  //   const [image, setImage] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const navigate = useNavigate();

  const handleFilesChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
  };

  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    if (
      (name == "ads_location" && value == "HOMETOP") ||
      (name == "ads_location" && value == "HOMEBOTTOM")
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
        console.log(data.data);
        // navigate(`/ads/edit/${_id}`);
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
        />
      </Container>
    </Page>
  );
}

export default AddAds;
