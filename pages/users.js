import { Grid, IconButton } from "@mui/material";

import axios from "axios";

import BaseCard from "../src/components/baseCard/BaseCard";
import MaterialTable from "material-table";

import { useEffect, useState } from "react";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const columns = [
  {
    field: "user_profileImage",
    title: "Avatar",
    align: "center",
    render: (rowData) => (
      <img
        src={rowData.user_profileImage}
        style={{ width: 40, borderRadius: "50%" }}
      />
    ),
  },
  { field: "user_name", title: "Username" },
  { field: "user_email", title: "Email" },
  { field: "user_district", title: "District" },
  { field: "user_city", title: "City" },
  { field: "user_street", title: "Street" },
  { field: "user_contact", title: "Contact" },
  { field: "user_gender", title: "Gender" },
  {
    field: "user_status",
    title: "User Status",
    align: "center",
  },
  {
    field: "edit",
    title: "Edit",
    align: "center",
    render: (rowData) => (
      <div>
        <IconButton
          style={{
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
          }}
          onClick={() => {
            console.log(rowData._id);
          }}
        >
          <Edit />
        </IconButton>
      </div>
    ),
  },
];

const originalRows = [
  {
    _id: "63575c4ee05ce8d0bee1dda8",
    user_name: "Ram nam",
    user_email: "a@g.c",
    user_district: "Achham",
    user_city: "Kalagaun",
    user_street: "Golpark",
    user_contact: "9846761072",
    user_gender: "Female",
    user_password: "0000",
    user_profileImage:
      "http://172.105.253.132:3001/uploads/6e150223-d75b-4c16-84d9-b416aebfa7ac9485ccad-1a49-4f8c-90ec-958a8b817589.jpeg",
    user_toc: { date: "Oct 25, 2022", time: "9:48 AM" },
    user_status: "False",
  },
  {
    _id: "63575e5ce05ce8d0bee1ddb5",
    user_name: "Saroj neupane",
    user_email: "A@b.c",
    user_district: "Achham",
    user_city: "Chaurpati",
    user_street: "Okokokok",
    user_contact: "9846761696",
    user_gender: "Male",
    user_password: "9876",
    user_profileImage:
      "http://192.168.100.11:3001/uploads/2ab58f6a-72e3-49fa-863a-17897268dd4fc4f61c94-0701-4cbe-a7a9-95f35d71e212.jpeg",
    user_toc: { date: "Oct 25, 2022", time: "9:48 AM" },
    user_status: "False",
  },
];

//GIVEN_API_KEY=AXCF

const Users = () => {
  const [rows, setRows] = useState(originalRows);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const getAllUsers = async () => {
    try {
      const { data } = axios.post(
        "http://172.104.188.69:3001/v1/api/user/getAllUser",
        {
          GIVEN_API_KEY: "AXCF",
        }
      );

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getAllUsers();
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
        <BaseCard title="Users">
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              icons={tableIcons}
              columns={columns}
              data={rows}
              title="All of the users"
            />
          </div>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default Users;
