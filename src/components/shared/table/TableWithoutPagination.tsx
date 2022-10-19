import React, { useState } from 'react';

import { IconContext } from 'react-icons';
import {
  RiDeleteBin7Line,
  RiFileInfoLine,
} from 'react-icons/ri';
import {
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

import { TableInstanceWithHooks, TableProps } from 'components/shared/table/types';

import 'styles/table.css';

function TableWithoutPagination({
  columns, data, children, editAction, deleteAction,
}: TableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
  ) as TableInstanceWithHooks<Object>;

  const initTableRowsState = new Array(rows.length).fill(false);

  const [tableRowsState, setTableRowsState] = useState(initTableRowsState);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col m-auto bg-transit-white">
        <div className="flex flex-row justify-between items-center w-content px-4 py-2">
          {children}
        </div>
        <div className="overflow-x-auto">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map((headerGroup) => {
                const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                  <tr {...restHeaderGroupProps} key={key} className="trHead bg-transit-grey-smallTableHeader">
                    {headerGroup.headers.map((column) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <th {...column.getHeaderProps()} key={column.id} className="th">
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                );
              })}
            </thead>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <tbody {...getTableBodyProps()} className="tbody">
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr
                // eslint-disable-next-line react/jsx-props-no-spreading
                    {...row.getRowProps()}
                    key={row.id}
                    className="trBody"
                  >
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {row.cells.map((cell: any) => <td {...cell.getCellProps()} key={cell.id} className="td">{cell.render('Cell')}</td>)}
                    <div
                      className="actionField"
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
                      {tableRowsState[index] && editAction && deleteAction && (
                      <div className="flex flex-row sticky right-2 z-1000 gap-2">
                        <IconContext.Provider
                          // eslint-disable-next-line
                          value={{ className: 'table-action-icons' }}>
                          <RiFileInfoLine onClick={() => editAction?.(row.values, data)} />
                          <RiDeleteBin7Line onClick={() => deleteAction?.(row.values)} />
                        </IconContext.Provider>
                      </div>
                      )}
                    </div>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableWithoutPagination;
