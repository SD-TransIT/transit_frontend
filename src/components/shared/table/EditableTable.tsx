import React from 'react';

import classNames from 'classnames';
import { AiOutlinePlus } from 'react-icons/ai';

import AddItemButton from 'shared/buttons/AddItemButton';

import { EditableTableTypes } from '../types';

const headers = [{ name: 'Day' }, { name: 'Closed' }, { name: 'Openint Time' }, { name: 'Closing Time' }];

function EditableTable({
  tableTitle, buttonTitle, children, onAddButtonClick,
}: EditableTableTypes) {
  return (
    <div className="flex flex-col w-full pb-6">
      <div className={classNames({ 'justify-between': tableTitle, 'justify-end': !tableTitle }, 'flex flex-row py-6')}>
        {tableTitle && <p className="text-lg">{tableTitle}</p>}
        {buttonTitle && (
        <AddItemButton title={buttonTitle} onClick={onAddButtonClick} className="w-fit p-2">
          <AiOutlinePlus className="text-transit-white" />
        </AddItemButton>
        )}
      </div>
      <div className="w-full flex flex-row justify-around px-8 content-center bg-transit-grey-light">
        {headers.map((header) => (
          <div className="flex w-full h-12 items-center">
            <p className="">{header.name}</p>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col justify-around bg-transit-white">
        {children}
      </div>
    </div>
  );
}

export default EditableTable;
