import React from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Container,
  Stack,
  Typography,
  Button,
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
// components
import Iconify from "../Iconify";
import PromptModal from "./PromptModal";
import NewFeatureSection from "./NewFeatureSection";
import { RMIUploader } from "react-multiple-image-uploader";

function EditProduct(props) {
  const {
    dataSources,
    title,
    setDataSources,
    openModal,
    setOpenModal,
    newFeatureName,
    setNewFeatureName,
    featureList,
    setFeatureList,
    details,
    setDetails,
    handleSubmit,
  } = props;

  const handleDetails = (e) => {
    const { name, value } = e.target;

    if (name == "newPrice") {
      const discount =
        ((details.originalPrice - value) / details.originalPrice) * 100;

      setDetails({
        ...details,
        newPrice: value,
        discount,
      });
    } else if (name == "discount") {
      const newPrice =
        details.originalPrice - (details.originalPrice / 100) * value;

      setDetails({
        ...details,
        discount: value,
        newPrice,
      });
    } else {
      setDetails({
        ...details,
        [name]: value,
      });
    }
  };

  const handleFeatureSubmit = (e) => {
    e.preventDefault();
    setOpenModal(false);

    setFeatureList({ ...featureList, [newFeatureName]: {} });

    setNewFeatureName("");
  };

  const handleDeleteSection = (name) => {
    delete featureList[name];
    setFeatureList({ ...featureList });
  };

  // image uploader functions
  const [visible, setVisible] = useState(false);
  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    setDataSources([
      ...dataSources,
      {
        dataURL: data.dataURL,
      },
    ]);
    console.log("Upload files", data);
  };
  const onSelect = (data) => {
    console.log("Select files", data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);
  };

  return (
    <Container
      style={{
        backgroundColor: "#fff",
        paddingTop: "25px",
        paddingBottom: "50px",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>

        <Button
          variant="contained"
          component={RouterLink}
          to="/dashboard/products"
          color="error"
          startIcon={<Iconify icon="iconoir:cancel" />}
        >
          Cancel
        </Button>
      </Stack>

      <TextField
        fullWidth
        id="product-name"
        label="Name"
        margin="normal"
        name="name"
        value={details.name}
        onChange={handleDetails}
      />

      <TextField
        fullWidth
        minRows={4}
        maxRows={15}
        label="Description"
        margin="normal"
        name="description"
        value={details.description}
        onChange={handleDetails}
        multiline
        placeholder="Tell something about the product…"
      />

      <RMIUploader
        isOpen={visible}
        hideModal={hideModal}
        onSelect={onSelect}
        onUpload={onUpload}
        onRemove={onRemove}
        dataSources={dataSources}
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        my={2}
      >
        <FormControl sx={{ my: 1 }} fullWidth>
          <InputLabel htmlFor="product-original-price">
            Original Price
          </InputLabel>
          <OutlinedInput
            id="product-original-price"
            name="originalPrice"
            value={details.originalPrice}
            onChange={handleDetails}
            type="number"
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            label="originalPrice"
          />
        </FormControl>
        <FormControl sx={{ mx: 2 }} fullWidth>
          <InputLabel htmlFor="product-new-price">New Price</InputLabel>
          <OutlinedInput
            id="product-new-price"
            name="newPrice"
            type="number"
            value={details.newPrice}
            onChange={handleDetails}
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            label="newPrice"
          />
        </FormControl>
        <TextField
          fullWidth
          name="discount"
          type="number"
          onChange={handleDetails}
          label="Discount percentage"
          value={details.discount}
        />
      </Stack>

      {Object.keys(featureList).map((f, i) => (
        <NewFeatureSection
          key={i}
          handleDeleteSection={() => handleDeleteSection(f)}
          setFeatureList={setFeatureList}
          featureList={featureList}
          title={f}
        />
      ))}

      <PromptModal
        title="Add new Feature"
        openModal={openModal}
        setOpenModal={setOpenModal}
        text={newFeatureName}
        handleText={setNewFeatureName}
        onSubmit={handleFeatureSubmit}
      />

      <Button
        variant="contained"
        size="medium"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={() => setOpenModal(true)}
      >
        Add new feature section
      </Button>

      <Button
        variant="contained"
        startIcon={<Iconify icon="ant-design:save-filled" />}
        size="large"
        fullWidth
        style={{ marginTop: "25px" }}
        onClick={handleSubmit}
      >
        Save Product
      </Button>
    </Container>
  );
}

export default EditProduct;
