import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let currentDate = new Date();

const DateTimePicker = () => {
  const [startDate, setStartDate] = React.useState(new Date());
  currentDate = startDate;
  return (
    [<div>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </div>,
      <p>{currentDate.toString()}</p>
    ]);
};
const month = currentDate.getMonth();
const day = currentDate.getDate();
const hours = currentDate.getHours();

export const getCurrentDate = () => {
  return (
    <p>Current Dates: {currentDate.getMonth()}, {currentDate.getDate()}, {currentDate.getFullYear()}</p>
  )
}


export default DateTimePicker;