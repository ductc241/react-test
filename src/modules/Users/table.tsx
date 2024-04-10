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
  TablePagination,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { userColumns } from "./constants";
import IUser from "../../interfaces/user";
import userServices from "../../api/user";
import { UserContext } from "./context";
import { useNavigate } from "react-router-dom";
import { PATH_USER_ADD } from "../../routes/routes.path";

const UserTable = () => {
  const navigate = useNavigate();
  const { handleModal } = useContext<any>(UserContext);

  const [users, setUsers] = useState<IUser[]>([]);

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);

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
        onClick={() => navigate(PATH_USER_ADD)}
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
              {/* {users
                .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                .map((user) => {
                  return (
                    <TableRow hover key={user.id}>
                      {userColumns.map((column) => {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {user[column.id as keyof IUser]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={users.length}
          rowsPerPage={perPage}
          page={page}
          onPageChange={(e, newPage: number) => {
            console.log(newPage);
            setPage(newPage);
          }}
          onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPerPage(+event.target.value);
            setPage(0);
          }}
        />
      </Paper>
    </Box>
  );
};

export default UserTable;
