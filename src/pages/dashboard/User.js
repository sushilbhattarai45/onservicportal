import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ContextProvider } from "../../Context";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Page from "../../components/Page";
import Label from "../../components/Label";
import Iconify from "../../components/Iconify";
import SearchNotFound from "../../components/SearchNotFound";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";

import axios from "../../utils/axiosInstance";
import { Edit } from "@mui/icons-material";
import { toast } from "react-hot-toast";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "user_name", label: "Username" },
  { id: "user_email", label: "Email" },
  { id: "user_district", label: "District" },
  { id: "user_city", label: "City" },
  { id: "user_street", label: "Street" },
  { id: "user_contact", label: "Contact" },
  { id: "user_gender", label: "Gender" },
  {
    id: "user_status",
    label: "User Status",
    align: "center",
  },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function User() {
  const [USERLIST, setUSERLIST] = useState([]);
  const [searchBy, setSearchBy] = useState("user_name");

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("user_name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { login } = useContext(ContextProvider);
  const [account] = login;

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    if (query) {
      return filter(array, (_user) => {
        return (
          _user[searchBy].toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      });
    }

    return stabilizedThis?.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST?.map((n) => n.user_contact);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const getAllUsers = async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "/v1/api/user/getAllUser",
        data: {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
        },
      });

      setUSERLIST(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async () => {
    //check the permission
    if (account.post !== "ADMIN") {
      toast.error("You don't have permission to delete");
      return;
    }

    let deleteStatus = true;

    for (let i = 0; i < selected.length; i++) {
      console.log(selected[i]);
      try {
        await axios({
          method: "POST",
          url: "/v1/api/user/deleteuser",
          data: {
            GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
            user_contact: selected[i],
          },
        });
      } catch (err) {
        deleteStatus = false;
        console.log(err);
      }
    }

    if (deleteStatus) {
      toast.success("Deleted Successfully");
      await getAllUsers();
      setSelected([]);
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <Page title="User">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="new"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            name="user_name"
            contact="user_contact"
            select={true}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleDelete={handleDelete}
            searchBy={searchBy}
            setSearchBy={setSearchBy}
          />

          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={USERLIST.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      _id,
                      user_name,
                      user_email,
                      user_district,
                      user_city,
                      user_street,
                      user_contact,
                      user_gender,
                      user_status,
                      user_profileImage,
                    } = row;
                    const isItemSelected =
                      selected.indexOf(user_contact) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) =>
                              handleClick(event, user_contact)
                            }
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Link
                            to={`edit/${user_contact}`}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={user_name} src={user_profileImage} />
                              <Typography variant="subtitle2" noWrap>
                                {user_name}
                              </Typography>
                            </Stack>
                          </Link>
                        </TableCell>
                        <TableCell align="left">{user_email}</TableCell>
                        <TableCell align="left">{user_district}</TableCell>
                        <TableCell align="left">{user_city}</TableCell>
                        <TableCell align="left">{user_street}</TableCell>
                        <TableCell align="left">{user_contact}</TableCell>
                        <TableCell align="left">{user_gender}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={
                              (user_status === "ACTIVE" && "success") || "error"
                            }
                          >
                            {user_status && sentenceCase(user_status)}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <Link to={`edit/${user_contact}`}>
                            <Edit />
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
