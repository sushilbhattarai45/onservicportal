import { Typography, Divider, Box } from "@mui/material";
import Iconify from "../Iconify";

function Section({ title, children, handleDeleteSection }) {
  return (
    <Box mb={5} mt={2}>
      <Divider
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Typography variant="body2" component="p">
          {title}
          <Iconify
            icon="la:times"
            onClick={handleDeleteSection}
            style={{ marginLeft: "5px", cursor: "pointer" }}
          />
        </Typography>
      </Divider>
      {children}
    </Box>
  );
}

export default Section;
