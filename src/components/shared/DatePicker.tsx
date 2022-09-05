import DatePicker from 'react-datepicker';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/datePicker.css';
import { RiCalendarLine } from 'react-icons/ri';
import { DatePickerCustomInputType, DatePickType } from './types';

function DatePickerCustomInput({ onClick, onChange, value }: DatePickerCustomInputType) {
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
      />
      <RiCalendarLine className="calendar-icons" />
    </button>
  );
}

function DatePick({ currentDate, onChange }: DatePickType) {
  return (
    <div className="w-72 h-11 m-20">
      <DatePicker
        selected={currentDate}
        onChange={onChange}
        className="date-picker"
        customInput={<DatePickerCustomInput />}
      />
    </div>
  );
}

export default DatePick;
