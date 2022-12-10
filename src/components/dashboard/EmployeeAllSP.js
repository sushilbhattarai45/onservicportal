import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import Label from "../Label";
import { Link } from "react-router-dom";

export default function EmployeeAllSP({ sps }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>District</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sps.map((row) => {
            const {
              _id,
              sp_name,
              sp_bio,
              sp_district,
              sp_city,
              sp_street,
              sp_contact,
              sp_status,
              sp_verified,
              sp_profileImage,
              sp_paid,
            } = row;

            return (
              <TableRow
                key={_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link
                    to={`/sp/edit/${sp_contact}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar alt={sp_name} src={sp_profileImage} />
                      <Typography variant="subtitle2" noWrap>
                        {sp_name}
                      </Typography>
                    </Stack>
                  </Link>
                </TableCell>

                <TableCell>
                  {sp_paid ? (
                    <Label color="success">Paid</Label>
                  ) : (
                    <Label color="error">Not Paid</Label>
                  )}
                </TableCell>
                <TableCell>{sp_contact}</TableCell>
                <TableCell>{sp_district}</TableCell>
                <TableCell>{sp_city}</TableCell>
                <TableCell>
                  <Label
                    variant="ghost"
                    color={(sp_status === "ACTIVE" && "success") || "error"}
                  >
                    {sp_status}
                  </Label>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
