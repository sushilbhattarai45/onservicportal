import React from "react";
import { useState } from "react";
import EditProduct from "../../components/dashboard/EditProduct";
import Page from "../../components/Page";

function AddProduct() {
  const [dataSources, setDataSources] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newFeatureName, setNewFeatureName] = useState("");
  const [featureList, setFeatureList] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    description: "",
    originalPrice: 100,
    newPrice: 0,
    discount: 0,
  });

  const addNewProduct = () => {
    //This is a final object according to schema and ready to be saved
    const product = {
      ...details,
      features: {
        ...featureList,
      },
    };
    console.log(product);
  };

  return (
    <Page title="Add New Product">
      <EditProduct
        title="Add new product"
        dataSources={dataSources}
        setDataSources={setDataSources}
        openModal={openModal}
        setOpenModal={setOpenModal}
        newFeatureName={newFeatureName}
        setNewFeatureName={setNewFeatureName}
        featureList={featureList}
        setFeatureList={setFeatureList}
        details={details}
        setDetails={setDetails}
        handleSubmit={addNewProduct}
      />
    </Page>
  );
}

export default AddProduct;
