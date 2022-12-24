import { filter } from "lodash";
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
import toast from "react-hot-toast";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "category_name", label: "Name" },
  { id: "category_status", label: "Status" },
  { id: "category_showonhome", label: "Show on home" },
  { id: "category_updatedby", label: "Updated by" },
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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.category_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Categories() {
  const [Categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("category_name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { login } = useContext(ContextProvider);
  const [account] = login;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Categories.map((n) => n.category_id);
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

  const handleDelete = async () => {
    //check the permission
    if (account.role !== "ADMIN") {
      toast.error("You don't have permission to delete");
      return;
    }

    let deleteStatus = true;

    for (let i = 0; i < selected.length; i++) {
      console.log(selected[i]);
      try {
        await axios({
          method: "POST",
          url: "/v1/api/categories/deleteonecategory",
          data: {
            GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
            id: selected[i],
          },
        });
      } catch (err) {
        deleteStatus = false;
        console.log(err);
      }
    }

    if (deleteStatus) {
      toast.success("Deleted Successfully");
      await getAllCategories();
      setSelected([]);
    } else {
      toast.error("Failed to delete");
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Categories.length) : 0;

  const filteredUsers = applySortFilter(
    Categories,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const getAllCategories = async () => {
    try {
      const { data } = axios({
        method: "POST",
        url: "/v1/api/categories",
        data: {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
        },
      });

      console.log(data);
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Page title="Categories">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Categories
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="new"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Category
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleDelete={handleDelete}
          />

          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={Categories.length}
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
                      category_photo,
                      category_name,
                      category_status,
                      category_showonhome,
                      category_updatedby,
                      category_id,
                    } = row;
                    const isItemSelected = selected.indexOf(category_id) !== -1;

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
                              handleClick(event, category_id)
                            }
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Link
                            to={`edit/${_id}`}
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
                              <Avatar
                                alt={category_name}
                                src={category_photo}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {category_name}
                              </Typography>
                            </Stack>
                          </Link>
                        </TableCell>
                        <TableCell align="left">
                          {category_status === true ? (
                            <Label variant="ghost" color="success">
                              Active
                            </Label>
                          ) : (
                            <Label variant="ghost" color="error">
                              Inactive
                            </Label>
                          )}
                        </TableCell>
                        {/* <TableCell align="left">{category_doc}</TableCell>
                        <TableCell align="left">{category_dou}</TableCell> */}
                        <TableCell align="left">
                          {(category_showonhome === false && "No") || "Yes"}
                        </TableCell>
                        <TableCell align="left">{category_updatedby}</TableCell>

                        <TableCell align="right">
                          <Link to={`edit/${_id}`}>
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
            count={Categories.length}
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
