import { Grid, Pagination } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";

const Categories = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Categories"></BaseCard>
      </Grid>
    </Grid>
  );
};

export default Categories;
