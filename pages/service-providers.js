import { Grid, IconButton } from "@mui/material";
import axios from "axios";
import BaseCard from "../src/components/baseCard/BaseCard";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { forwardRef } from "react";

import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import Link from "next/link";

const columns = [
  {
    field: "sp_profileImage",
    title: "Avatar",
    align: "center",
    render: (rowData) => (
      <img
        src={rowData.user_profileImage}
        style={{ width: 40, borderRadius: "50%" }}
      />
    ),
  },
  { field: "sp_name", title: "Name" },
  { field: "sp_bio", title: "Bio" },
  {
    field: "sp_skills",
    title: "Skills",
    render: (rowData) => rowData.sp_skills.join(", "),
  },
  { field: "sp_district", title: "District" },
  { field: "sp_city", title: "City" },
  { field: "sp_street", title: "Street" },
  { field: "sp_contact", title: "Contact" },
  { field: "sp_status", title: "Status" },
  { field: "sp_showReview", title: "Show on home" },
  {
    field: "sp_verified",
    title: "Verified",
    render: (rowData) => (rowData.sp_verified ? <Check /> : <Clear />),
  },
  {
    field: "edit",
    title: "Edit",
    align: "center",
    render: (rowData) => (
      <Link href={`/sp/${rowData.sp_contact}`}>
        <IconButton
          style={{
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
          }}
        >
          <Edit />
        </IconButton>
      </Link>
    ),
  },
];

const ServiceProviders = () => {
  const [rows, setRows] = useState([]);

  const getAllSps = async () => {
    try {
      const { data } = await axios.post(
        "http://172.104.188.69:3001/v1/api/sp/getAllSp",
        {
          GIVEN_API_KEY: "AXCF",
        }
      );

      setRows(data.data);
      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllSps();
  }, []);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Service Providers">
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              icons={tableIcons}
              columns={columns}
              data={rows}
              title="Service Providers"
            />
          </div>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

ServiceProviders.displayName = "ServiceProviders";

export default ServiceProviders;
