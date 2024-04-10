import { ReactNode } from "react";

export interface ITableProps {
  columns: IColumn[];
  data: any[];
  page: number;
  perPage: number;
  onPageChange: () => void;
  onRowsPerPageChange: () => void;
}

export interface IColumn {
  id: any;
  label: string;
  dataIndex: string;
  minWidth?: number;
  align?: "left" | "right";
  renderCell?: (record: any) => ReactNode;
}
