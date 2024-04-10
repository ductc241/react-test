import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ITableProps } from "../interfaces/column";

const TableCustom = ({
  columns,
  data,
  page,
  perPage,
  onPageChange,
  onRowsPerPageChange,
}: ITableProps) => {
  const renderRow = (record: any) => {
    return (
      <TableRow hover key={record.id}>
        {}
      </TableRow>
    );
  };

  const renderBody = (data: any[]) => {
    if (data.length === 0) {
      return (
        <TableRow sx={{ height: "300px" }}>
          <TableCell colSpan={columns.length} align='center'>
            No Data
          </TableCell>
        </TableRow>
      );
    }

    return data.map((record: any) => renderRow(record));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", my: 2 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align}
                  style={{ minWidth: col.minWidth }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
              .map((user) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={user.id}>
                    {data.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {user[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={data.length}
        rowsPerPage={perPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

export default TableCustom;
