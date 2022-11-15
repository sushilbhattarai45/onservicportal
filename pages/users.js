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
      <Link href={`/user/${rowData.user_contact}`}>
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

function Users() {
  const [rows, setRows] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.post(
        "http://172.104.188.69:3001/v1/api/user/getAllUser",
        {
          GIVEN_API_KEY: "AXCF",
        }
      );

      setRows(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const Add = forwardRef(function (props, ref) {
    return <AddBox {...props} ref={ref} />;
  });

  Add.displayName = "Add";

  const Check = forwardRef(function (props, ref) {
    return <Check {...props} ref={ref} />;
  });

  Check.displayName = "Check";

  const Clear = forwardRef(function (props, ref) {
    return <Clear {...props} ref={ref} />;
  });

  Clear.displayName = "Clear";

  const Delete = forwardRef(function (props, ref) {
    return <DeleteOutline {...props} ref={ref} />;
  });

  Delete.displayName = "Delete";

  const DetailPanel = forwardRef(function (props, ref) {
    return <ChevronRight {...props} ref={ref} />;
  });

  DetailPanel.displayName = "DetailPanel";

  const Edit = forwardRef(function (props, ref) {
    return <Edit {...props} ref={ref} />;
  });

  Edit.displayName = "Edit";

  const Export = forwardRef(function (props, ref) {
    return <SaveAlt {...props} ref={ref} />;
  });

  Export.displayName = "Export";

  const Filter = forwardRef(function (props, ref) {
    return <FilterList {...props} ref={ref} />;
  });

  Filter.displayName = "Filter";

  const FirstPage = forwardRef(function (props, ref) {
    return <FirstPage {...props} ref={ref} />;
  });

  FirstPage.displayName = "FirstPage";

  const LastPage = forwardRef(function (props, ref) {
    return <LastPage {...props} ref={ref} />;
  });

  LastPage.displayName = "LastPage";

  const NextPage = forwardRef(function (props, ref) {
    return <ChevronRight {...props} ref={ref} />;
  });

  NextPage.displayName = "NextPage";

  const PreviousPage = forwardRef(function (props, ref) {
    return <ChevronLeft {...props} ref={ref} />;
  });

  PreviousPage.displayName = "PreviousPage";

  const ResetSearch = forwardRef(function (props, ref) {
    return <Clear {...props} ref={ref} />;
  });

  ResetSearch.displayName = "ResetSearch";

  const Search = forwardRef(function (props, ref) {
    return <Search {...props} ref={ref} />;
  });

  Search.displayName = "Search";

  const SortArrow = forwardRef(function (props, ref) {
    return <ArrowDownward {...props} ref={ref} />;
  });

  SortArrow.displayName = "SortArrow";

  const ThirdStateCheck = forwardRef(function (props, ref) {
    return <Remove {...props} ref={ref} />;
  });

  ThirdStateCheck.displayName = "ThirdStateCheck";

  const ViewColumn = forwardRef(function (props, ref) {
    return <ViewColumn {...props} ref={ref} />;
  });

  ViewColumn.displayName = "ViewColumn";

  const tableIcons = {
    Add: Add,
    Check: Check,
    Clear: Clear,
    Delete: Delete,
    DetailPanel: DetailPanel,
    Edit: Edit,
    Export: Export,
    Filter: Filter,
    FirstPage: FirstPage,
    LastPage: LastPage,
    NextPage: NextPage,
    PreviousPage: PreviousPage,
    ResetSearch: ResetSearch,
    Search: Search,
    SortArrow: SortArrow,
    ThirdStateCheck: ThirdStateCheck,
    ViewColumn: ViewColumn,
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
}

Users.displayName = "Users";

export default Users;
