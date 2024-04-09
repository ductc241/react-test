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
import { IColumn } from "../interfaces/column";

interface ITableProps {
  columns: IColumn[];
  data: any[];
  page: number;
  perPage: number;
  onPageChange: () => void;
  onRowsPerPageChange: () => void;
}

const TableCustom = ({
  columns,
  data,
  page,
  perPage,
  onPageChange,
  onRowsPerPageChange,
}: ITableProps) => {
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
  </Paper>;
};

export default TableCustom;
