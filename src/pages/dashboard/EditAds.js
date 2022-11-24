import { Container } from "@mui/material";
import Page from "../../components/Page";
import toast from "react-hot-toast";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ContextProvider } from "../../Context";
import AdsForm from "../../components/dashboard/AdsForm";

function EditAds() {
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
    ads_mediaLink: "",
  });

  const [tags, setTags] = useState([]);

  //   const [image, setImage] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const id = window.location.pathname.split("/")[3];

  const handleFilesChange = async (event) => {
    const file = event.target.files[0];
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
      console.log(values);

      try {
        await axios.post(`/v1/api/ads/updateAds`, {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          ...values,
          _id: id,
        });

        setDisableButton(true);
        toast.success("Ad updated successfully", {
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

  const getAdDetails = async () => {
    try {
      const { data } = await axios.post(`/v1/api/ads/getAllAds`, {
        GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
      });

      console.log(data);

      const ad = data.data.find((ad) => ad._id === id);

      setValues(ad);
      toast.success("Details fetched successfully");
    } catch (error) {
      toast.error("Error fetching details");
      console.log(error);
    }
  };

  useEffect(() => {
    getAdDetails();
  }, []);

  return (
    <Page title="Edit Ad">
      <Container>
        <AdsForm
          values={values}
          handleFormSubmit={handleFormSubmit}
          disableButton={disableButton}
          handleFilesChange={handleFilesChange}
          handleInputChange={handleInputChange}
          buttonText="Update"
          setValues={setValues}
          setDisableButton={setDisableButton}
          tags={tags}
        />
      </Container>
    </Page>
  );
}

export default EditAds;
