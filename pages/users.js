import {
  Grid,
  Link,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import BaseCard from "../src/components/baseCard/BaseCard";

import { useState } from "react";

const columns = [
  { id: "user_name", label: "Username", minWidth: 90 },
  { id: "user_email", label: "Email", minWidth: 120 },
  { id: "user_district", label: "District", minWidth: 75 },
  { id: "user_city", label: "City", minWidth: 60 },
  { id: "user_street", label: "Street", minWidth: 75 },
  { id: "user_contact", label: "Contact", minWidth: 75 },
  { id: "user_gender", label: "Gender", minWidth: 75 },
  {
    id: "user_profileImage",
    label: "Profile Image",
    minWidth: 95,
    align: "center",
  },
  {
    id: "user_status",
    label: "User Status",
    minWidth: 90,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 85,
    align: "center",
  },
];

const originalRows = [
  {
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
    __v: { $numberInt: "0" },
    user_status: "False",
  },
  {
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
    __v: { $numberInt: "0" },
  },
];

const Users = () => {
  const [rows, setRows] = useState(originalRows);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Users">
          <TableContainer sx={{ maxHeight: 550 }}>
            <Table stickyHeader aria-label="Users detail">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          if (column.id !== "action") {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} align="right">
                                <Button
                                  color="secondary"
                                  component={Link}
                                  to={`/edit-post/${row.id}`}
                                  startIcon={<EditIcon />}
                                  variant="contained"
                                  size="small"
                                  style={{ margin: "5px" }}
                                >
                                  Edit
                                </Button>
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[7, 15, 25]}
            component="div"
            count={rows ? rows.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default Users;
