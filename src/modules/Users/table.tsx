import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { userColumns } from "./constants";
import IUser from "../../interfaces/user";
import userServices from "../../api/user";
import { UserContext } from "./context";

const UserTable = () => {
  const { handleModal } = useContext<any>(UserContext);

  const [users, setUsers] = useState<IUser[]>([]);

  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);

  useEffect(() => {
    userServices
      .list()
      .then((rs) => setUsers(rs.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box>
      <Button
        component='label'
        variant='contained'
        tabIndex={-1}
        startIcon={<AddIcon />}
        onClick={() => handleModal("modal")}
      >
        Add new
      </Button>

      <Paper sx={{ width: "100%", overflow: "hidden", my: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {userColumns.map((column) => (
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
              {users
                .slice(page * perPage, page * perPage + perPage)
                .map((user) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={user.id}>
                      {userColumns.map((column) => {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {user[column.id as keyof IUser]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UserTable;
