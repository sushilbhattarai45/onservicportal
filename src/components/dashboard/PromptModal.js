import React from "react";
import {
  Modal,
  Button,
  Box,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import Iconify from "../Iconify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  maxWidth: "95%",
};

function PromptModal({
  title,
  openModal,
  setOpenModal,
  text,
  handleText,
  onSubmit,
}) {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="add-feature-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <form id="add-feature-form" sx={{ mt: 2 }} onSubmit={onSubmit}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            my={2}
          >
            <TextField
              autoFocus
              value={text}
              onChange={(e) => handleText(e.target.value)}
              sx={{ mr: 1 }}
              fullWidth
            />
            <Button
              variant="contained"
              size="large"
              startIcon={<Iconify icon="charm:tick" />}
              type="submit"
            >
              Done
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}

export default PromptModal;
