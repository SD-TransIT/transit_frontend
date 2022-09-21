import React from 'react';

import DatePicker from 'react-datepicker';
import { RiCalendarLine } from 'react-icons/ri';

import { DatePickerCustomInputType, DatePickType } from 'components/shared/types';

import 'react-datepicker/dist/react-datepicker.css';
import 'styles/datePicker.css';

function DatePickerCustomInput({
  onClick, onChange, value, name,
}: DatePickerCustomInputType) {
  return (
    <button
      type="button"
      className="date-button"
      onClick={onClick}
    >
      <input
        className="date-input"
        type="text"
        onChange={onChange}
        value={value}
        placeholder="Search..."
        name={name}
      />
      <RiCalendarLine className="calendar-icons" />
    </button>
  );
}

function DatePick({ currentDate, onChange, name }: DatePickType) {
  return (
    <DatePicker
      selected={currentDate}
      onChange={onChange}
      className="date-picker"
      customInput={<DatePickerCustomInput />}
    />
  );
}

export default DatePick;
