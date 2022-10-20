import React from 'react';

import classNames from 'classnames';
import {
  RiArrowDownSFill, RiArrowLeftSLine, RiArrowRightSLine, RiArrowUpSFill,
} from 'react-icons/ri';
import {
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

import PaginationButton from '../../../shared/buttons/PaginationButton';

import { TableInstanceWithHooks, TableProps } from './types';

import 'styles/table.css';

function ReportTable({ columns, data, children }: TableProps) {
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

  return (
    <div className="w-full h-full">
      <div className="flex flex-col m-auto bg-transit-white">
        <div className="flex flex-row justify-between items-center w-content px-4 py-2">
          {children}
        </div>
        <div className="overflow-x-auto">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <table {...getTableProps()} className="table">
            <thead className="">
              {headerGroups.map((headerGroup) => {
                const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                  <tr {...restHeaderGroupProps} key={key} className="trHead">
                    {headerGroup.headers.map((column) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id} className="th">
                        {column.render('Header')}
                        {/* eslint-disable */}
                        <span>
                          {column.isSorted ? (
                            <div className='flex flex-col text-xl ml-1'>  
                              <RiArrowUpSFill className={classNames({ 'text-transit-green-dark': column.isSortedDesc === true, 'text-transit-grey-300': column.isSortedDesc === false }, "-mb-2")} />
                              <RiArrowDownSFill className={classNames({ 'text-transit-grey-300': column.isSortedDesc === true, 'text-transit-green-dark': column.isSortedDesc === false }, "-mt-1.5")} />
                            </div>) : (
                            <div className='flex flex-col text-xl ml-1'>
                              <RiArrowUpSFill className='text-transit-grey-300 -mb-2' />
                              <RiArrowDownSFill className='text-transit-grey-300 -mt-1.5' />
                            </div>
                          )}
                       </span>
                      </th>
                    ))}
                  </tr>
                );
              })}
            </thead>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <tbody {...getTableBodyProps()} className="tbody">
              {page.map((row) => {
                prepareRow(row);
                return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                  <tr {...row.getRowProps()} key={row.id} className="trBody">
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {row.cells.map((cell: any) => <td {...cell.getCellProps()} key={cell.id} className="td">{cell.render('Cell')}</td>)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
      </div>
    </div>
  );
}

export default ReportTable;
