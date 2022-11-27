import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

import axios from "axios";
import { CancelOutlined, Check, Edit } from "@mui/icons-material";
import { toast } from "react-hot-toast";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "sp_name", label: "Name" },
  { id: "sp_bio", label: "Bio" },
  { id: "sp_paid", label: "Paid" },
  {
    id: "sp_skills",
    label: "Skills",
  },
  { id: "sp_district", label: "District" },
  { id: "sp_city", label: "City" },
  { id: "sp_street", label: "Street" },
  { id: "sp_contact", label: "Contact" },
  { id: "sp_status", label: "Status" },
  { id: "sp_showReview", label: "Show on home" },
  {
    id: "sp_verified",
    label: "Verified",
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
      (_user) => _user.sp_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ServiceProviders() {
  const [SPs, setSPs] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("sp_name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = SPs.map((n) => n.sp_contact);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SPs.length) : 0;

  const filteredUsers = applySortFilter(
    SPs,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const getAllSPs = async () => {
    try {
      const { data } = await axios.post("/v1/api/sp/getAllSp", {
        GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
      });

      console.log(data.data);

      setSPs(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllSPs();
  }, []);

  const handleDelete = async () => {
    let deleteStatus = true;

    for (let i = 0; i < selected.length; i++) {
      console.log(selected[i]);
      try {
        await axios.post("/v1/api/sp/deletesp", {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
          sp_contact: selected[i],
        });
      } catch (err) {
        deleteStatus = false;
        console.log(err);
      }
    }

    if (deleteStatus) {
      toast.success("Deleted Successfully");
      await getAllSPs();
      setSelected([]);
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <Page title="Service providers">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Service providers
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="new"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New SP
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
                rowCount={SPs.length}
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
                      sp_name,
                      sp_bio,
                      sp_skills,
                      sp_district,
                      sp_city,
                      sp_street,
                      sp_contact,
                      sp_status,
                      sp_showReview,
                      sp_verified,
                      sp_profileImage,
                      sp_paid,
                    } = row;
                    const isItemSelected = selected.indexOf(sp_contact) !== -1;

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
                            onChange={(event) => handleClick(event, sp_contact)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Link
                            to={`edit/${sp_contact}`}
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
                              <Avatar alt={sp_name} src={sp_profileImage} />
                              <Typography variant="subtitle2" noWrap>
                                {sp_name}
                              </Typography>
                            </Stack>
                          </Link>
                        </TableCell>
                        <TableCell align="left">{sp_bio}</TableCell>
                        <TableCell align="center">
                          {sp_paid === false ? <CancelOutlined /> : <Check />}
                        </TableCell>
                        <TableCell align="left">{sp_skills}</TableCell>
                        <TableCell align="left">{sp_district}</TableCell>
                        <TableCell align="left">{sp_city}</TableCell>
                        <TableCell align="left">{sp_street}</TableCell>
                        <TableCell align="left">{sp_contact}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={
                              (sp_status === "ACTIVE" && "success") || "error"
                            }
                          >
                            {sentenceCase(sp_status)}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          {sp_showReview ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="left">
                          {sp_verified === false ? (
                            <CancelOutlined />
                          ) : (
                            <Check />
                          )}
                        </TableCell>

                        <TableCell align="right">
                          <Link to={`edit/${sp_contact}`}>
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
            count={SPs.length}
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
