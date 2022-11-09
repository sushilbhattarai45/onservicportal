import { Grid } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";

export default function Index() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Home"></BaseCard>
      </Grid>
    </Grid>
  );
}
