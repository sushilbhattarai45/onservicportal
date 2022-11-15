import FeatherIcon from "feather-icons-react";
import { Link, Box, Typography } from "@mui/material";

const LogoIcon = () => {
  return (
    <Link href="/" className="logoLink">
      <Box px={1} display="flex" alignItems="center">
        <FeatherIcon icon="menu" width="20" height="20" />
        <Typography variant="h3" sx={{ ml: 2 }}>
          App
        </Typography>
      </Box>
    </Link>
  );
};

LogoIcon.displayName = "LogoIcon";
export default LogoIcon;
