import React, { useEffect, useRef, useState } from 'react';

import { IconContext } from 'react-icons';
import {
  RiArrowLeftSLine, RiArrowRightSLine,
  RiDeleteBin7Line,
  RiPencilLine,
} from 'react-icons/ri';
import {
  useFlexLayout,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

import { TableInstanceWithHooks, TableProps } from 'components/shared/table/types';
import PaginationButton from 'shared/buttons/PaginationButton';

function Table({
  columns, data, children, editAction, deleteAction,
  search = '',
  fetchData,
  pageCount: controlledPageCount,
  numberOfAvailableData = data.length,
  defaultOffset,
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
    canPreviousPage,
    pageOptions,
    canNextPage,
    gotoPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      initialState: { pageIndex: 0, pageSize: defaultOffset },
      pageCount: controlledPageCount,
      autoResetPage: false,
    },
    useFlexLayout,
    useSortBy,
    usePagination,
  ) as TableInstanceWithHooks<Object>;

  const tableStateUpdateRef = useRef(false);
  const stateSearchRef = useRef(search);

  useEffect(() => {
    gotoPage(0);
  }, [gotoPage, search]);

  useEffect(() => {
    if (stateSearchRef.current !== search && pageIndex !== 0) {
      tableStateUpdateRef.current = true;
      gotoPage(0);
    } else {
      tableStateUpdateRef.current = true;
      // eslint-disable-next-line
      fetchData && fetchData(pageIndex + 1, pageSize, search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, pageIndex, pageSize, search]);

  useEffect(() => {
    if (!tableStateUpdateRef.current) {
      gotoPage(0);
    }
  }, [data, gotoPage]);

  useEffect(() => {
    stateSearchRef.current = search;
    tableStateUpdateRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
        <div className="overflow-scroll">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <table {...getTableProps()} style={{ minWidth: '100%' }}>
            <thead className="bg-transit-grey">
              {headerGroups.map((headerGroup) => {
                const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                  <tr {...restHeaderGroupProps} key={key} className="px-4 py-2">
                    {headerGroup.headers.map((column) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <th {...column.getHeaderProps()} key={column.id} className="flex justify-start bg-transit-grey font-bold text-[13px]">
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                );
              })}
            </thead>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr
                // eslint-disable-next-line react/jsx-props-no-spreading
                    {...row.getRowProps()}
                    key={row.id}
                    className="px-4 h-12 items-center relative even:bg-transit-grey-light hover:bg-transit-green"
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
                    {row.cells.map((cell: any) => <td {...cell.getCellProps()} key={cell.id} className="font-normal text-sm">{cell.render('Cell')}</td>)}
                    {tableRowsState[index] && (
                      <div className="flex flex-row sticky right-2 z-1000 gap-2">
                        <IconContext.Provider
                          // eslint-disable-next-line
                          value={{ className: 'table-action-icons' }}>
                          <RiPencilLine onClick={() => editAction?.(row.values, data)} />
                          <RiDeleteBin7Line onClick={() => deleteAction?.(row.values)} />
                        </IconContext.Provider>
                      </div>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-between items-center h-10 text-transit-grey-dark p-2 text-xs">
          <div>
            <p>{`${firstRowNumberOnPage}-${lastRowNumberOnPage} of ${numberOfAvailableData}`}</p>
          </div>
          <div className="flex flex-row gap-2">
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
      </div>
    </div>
  );
}

export default Table;
