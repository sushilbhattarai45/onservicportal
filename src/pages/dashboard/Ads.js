import { filter } from "lodash";
import { useState, useEffect, useContext } from "react";
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
import { ContextProvider } from "../../Context";

import axios from "../../utils/axiosInstance";
import { Edit } from "@mui/icons-material";
import { toast } from "react-hot-toast";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "ads_name", label: "Name" },
  { id: "ads_givenEmail", label: "Email" },
  { id: "ads_link", label: "Link" },
  { id: "ads_location", label: "Location" },
  { id: "ads_type", label: "Type" },
  { id: "ads_status", label: "Status" },
  { id: "ads_tag", label: "Tags" },
  { id: "ads_updatedby", label: "Updated by" },
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
        _user.ads_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Ads() {
  const [Ads, setAds] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("ads_name");
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
      const newSelecteds = Ads.map((n) => n._id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Ads.length) : 0;

  const filteredUsers = applySortFilter(
    Ads,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const getAllAds = async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "/v1/api/ads/getAllAds",
        data: {
          GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
        },
      });

      console.log(data);

      const refinedData = Object.values(data)
        .map((item) => {
          return item;
        })
        .flatMap((item) => {
          return item;
        })
        .filter((item) => {
          if (item._id) {
            return item;
          }
        });

      setAds(refinedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllAds();
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
          url: "/v1/api/ads/delete",
          data: {
            GIVEN_API_KEY: process.env.REACT_APP_API_KEY,
            _id: selected[i],
          },
        });
      } catch (err) {
        deleteStatus = false;
        console.log(err);
      }
    }

    if (deleteStatus) {
      toast.success("Deleted Successfully");
      await getAllAds();
      setSelected([]);
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <Page title="Ads">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Ads
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="new"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Ad
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
                rowCount={Ads.length}
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
                      ads_name,
                      ads_givenEmail,
                      ads_mediaLink,
                      ads_link,
                      ads_location,
                      ads_type,
                      ads_status,
                      ads_updatedBy,
                      ads_tag,
                    } = row;
                    const isItemSelected = selected.indexOf(_id) !== -1;

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
                            onChange={(event) => handleClick(event, _id)}
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
                              <Avatar alt={ads_name} src={ads_mediaLink} />
                              <Typography variant="subtitle2" noWrap>
                                {ads_name}
                              </Typography>
                            </Stack>
                          </Link>
                        </TableCell>
                        <TableCell align="left">{ads_givenEmail}</TableCell>
                        <TableCell align="left">
                          <a href={ads_link} title="Open the link">
                            {ads_link}
                          </a>
                        </TableCell>
                        <TableCell align="left">
                          {ads_location == "CATAD"
                            ? `Category Ad`
                            : ads_location == "BMAD"
                            ? `Bookmark Ad`
                            : ads_location}
                        </TableCell>
                        <TableCell align="left">{ads_type}</TableCell>
                        <TableCell align="left">
                          {ads_status === "true" ? (
                            <Label variant="ghost" color="success">
                              Active
                            </Label>
                          ) : (
                            <Label variant="ghost" color="error">
                              Inactive
                            </Label>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {ads_tag.length !== 0
                            ? ads_tag.map((item) => {
                                return (
                                  <Label variant="ghost" color="info">
                                    {item}
                                  </Label>
                                );
                              })
                            : `Null`}
                        </TableCell>
                        <TableCell align="left">{ads_updatedBy}</TableCell>

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
            count={Ads.length}
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
