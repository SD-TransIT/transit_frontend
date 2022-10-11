import React from 'react';

import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import { RiCalendarLine } from 'react-icons/ri';

import { DatePickerCustomInputType, DatePickType } from 'components/shared/types';

import 'react-datepicker/dist/react-datepicker.css';
import 'styles/datePicker.css';

function DatePickerCustomInput({
  onClick, onChange, value, isInvalid,
}: DatePickerCustomInputType) {
  return (
    <button
      type="button"
      className="date-button"
      onClick={onClick}
    >
      <input
        className={classNames('date-input', { 'shadow-dateInputError': isInvalid })}
        type="text"
        onChange={onChange}
        value={value}
        placeholder="Search..."
      />
      <RiCalendarLine className="calendar-icons" />
    </button>
  );
}

function DatePick({ currentDate, onChange, isInvalid }: DatePickType) {
  return (
    <DatePicker
      selected={currentDate}
      onChange={onChange}
      className="date-picker"
      customInput={<DatePickerCustomInput isInvalid={isInvalid} />}
    />
  );
}

export default DatePick;
