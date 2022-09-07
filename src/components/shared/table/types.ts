import {
  Column,
  ColumnInterface,
  TableInstance,
  UsePaginationInstanceProps,
  UsePaginationState,
  UseSortByInstanceProps,
} from 'react-table';

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
UsePaginationInstanceProps<T> &
UseSortByInstanceProps<T> & {
  state: UsePaginationState<T>;
};

export type TableProps = {
  columns: Array<Column<object>>;
  data: Array<object>;
  children: React.ReactNode
  editAction?: (row?:any, data?:any) => void;
  deleteAction?: (row?:any) => void;
};

export interface ColumnType extends ColumnInterface {
  Header: string;
  accessor: string;
}
