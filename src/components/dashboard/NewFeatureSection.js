import { useState } from "react";
import Section from "./Section";
import Iconify from "../Iconify";

// material
import { Stack, Button, TextField, IconButton } from "@mui/material";
import PromptModal from "./PromptModal";

function NewFeatureSection({
  title,
  handleDeleteSection,
  featureList,
  setFeatureList,
}) {
  const thisFeature = featureList[title];

  const [openModal, setOpenModal] = useState(false);
  // const [fields, setFields] = useState({});
  const [newFieldName, setNewFieldName] = useState([]);

  const handleFieldSubmit = (e) => {
    e.preventDefault();

    const fields = {
      ...thisFeature,
      [newFieldName]: "",
    };

    setFeatureList({ ...featureList, [title]: fields });

    // setFields({ ...fields, [newFieldName]: "" });

    setOpenModal(false);
    setNewFieldName("");
  };

  const handleFieldValue = (e) => {
    const { name, value } = e.target;

    const fields = {
      ...thisFeature,
      [name]: value,
    };

    setFeatureList({ ...featureList, [title]: fields });
  };

  const handleDeleteField = (name) => {
    delete thisFeature[name];
    setFeatureList({ ...featureList, [title]: thisFeature });
  };

  return (
    <Section title={title} handleDeleteSection={handleDeleteSection}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mt={2}
      >
        {Object.keys(thisFeature).map((f, i) => (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            width={250}
          >
            <TextField
              fullWidth
              label={f}
              value={thisFeature[f]}
              name={f}
              onChange={handleFieldValue}
            />

            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteField(f)}
              style={{ marginLeft: "5px" }}
            >
              <Iconify icon="ant-design:delete-outlined" />
            </IconButton>
          </Stack>
        ))}

        <PromptModal
          title="Add new Field"
          openModal={openModal}
          setOpenModal={setOpenModal}
          text={newFieldName}
          handleText={setNewFieldName}
          onSubmit={handleFieldSubmit}
        />

        <Button
          variant="contained"
          size="medium"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpenModal(true)}
        >
          New field
        </Button>
      </Stack>
    </Section>
  );
}

export default NewFeatureSection;
