import React, { useState } from 'react';
import {
  useFlexLayout,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import {
  RiArrowLeftSLine, RiArrowRightSLine, RiPencilLine, RiDeleteBin7Line,
} from 'react-icons/ri';
import { IconContext } from 'react-icons';
import PaginationButton from '../../../shared/buttons/PaginationButton';
import { TableInstanceWithHooks, TableProps } from './types';

function Table({
  columns, data, children, editAction,
}: TableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    nextPage,
    previousPage,
    setPageSize,
    canPreviousPage,
    pageOptions,
    canNextPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useFlexLayout,
    useSortBy,
    usePagination,
  ) as TableInstanceWithHooks<Object>;

  const firstRowNumberOnPage = React.useMemo(() => {
    const result = (pageIndex * pageSize) + 1;
    return result;
  }, [pageIndex, pageSize]);

  const lastRowNumberOnPage = React.useMemo(() => {
    const result = (pageIndex * pageSize) + (page.length);
    return result;
  }, [pageIndex, pageSize, page]);

  const initTableRowsState = new Array(rows.length).fill(false);

  const [tableRowsState, setTableRowsState] = useState(initTableRowsState);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col m-auto bg-transit-white">
        <div className="flex flex-row justify-between items-center w-content px-4 py-2">
          {children}
        </div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <table {...getTableProps()}>
          <thead className="bg-transit-grey">
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
              return (
              // eslint-disable-next-line react/jsx-props-no-spreading
                <tr {...restHeaderGroupProps} key={key} className="">
                  {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                    <th {...column.getHeaderProps()} key={column.id} className="flex text-left items-center h-10 pl-4">
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <tbody {...getTableBodyProps()} className="w-full">
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...row.getRowProps()}
                  key={row.id}
                  className="flex flex-row text-left items-center even:bg-transit-grey-light h-12 font-normal hover:bg-transit-green-light"
                  onMouseEnter={() => {
                    setTableRowsState((tableState) => {
                      const nextTableState = [...tableState];
                      nextTableState[index] = true;
                      return nextTableState;
                    });
                  }}
                  onMouseLeave={() => {
                    setTableRowsState((tableState) => {
                      const nextTableState = [...tableState];
                      nextTableState[index] = false;
                      return nextTableState;
                    });
                  }}
                >
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  {row.cells.map((cell: any) => <td {...cell.getCellProps()} key={cell.id} className="flex flex-row px-4">{cell.render('Cell')}</td>)}
                  <td className="flex flex-row px-4 gap-6">
                    {tableRowsState[index] ? (
                      <IconContext.Provider
                        // eslint-disable-next-line
                        value={{ className: 'float-right p-1 w-8 h-8 justify-end bg-transit-white rounded-full' }}
                      >
                        <RiPencilLine onClick={() => editAction?.(row.values)} />
                        <RiDeleteBin7Line />
                      </IconContext.Provider>
                    ) : ''}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <div className="flex flex-row justify-between items-center h-10 text-transit-grey-dark p-2 text-xs">
            <div>
              <p>{`${firstRowNumberOnPage}-${lastRowNumberOnPage} of ${rows.length}`}</p>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row">
                <p>Rows per page</p>
                <select
                  className="bg-transit-white"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSizeValue) => (
                    <option key={pageSizeValue} value={pageSizeValue}>
                      {pageSizeValue}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <PaginationButton onClick={() => previousPage()} disabled={!canPreviousPage}>
                  <RiArrowLeftSLine className="text-xs" />
                </PaginationButton>
                <span>
                  <strong>
                    {pageIndex + 1}
                    /
                    {pageOptions.length}
                  </strong>
                </span>
                <PaginationButton onClick={() => nextPage()} disabled={!canNextPage}>
                  <RiArrowRightSLine className="text-xs" />
                </PaginationButton>
              </div>
            </div>
          </div>
        </table>
      </div>
    </div>
  );
}

export default Table;
