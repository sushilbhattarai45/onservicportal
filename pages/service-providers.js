import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";

const ServiceProviders = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Service Providers">
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">Services</Typography>
          </Box>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default ServiceProviders;
