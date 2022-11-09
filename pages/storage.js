import { Grid } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";

const Images = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="App's storage"></BaseCard>
      </Grid>
    </Grid>
  );
};

export default Images;
