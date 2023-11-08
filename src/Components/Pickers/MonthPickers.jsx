import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSearch } from "react-icons/bi";
import { LuCalendarCheck } from "react-icons/lu";
const MonthPickers = ({  selectedDate, setSelectedDate }) => {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    // Add your search logic here using the selectedDate
    console.log("Searching for:", selectedDate);
  };
  return (
    <div className=" relative flex items-center rounded-md  border border-[#7E7F80]">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        className=" p-2 rounded-md outline-none text-center"
        placeholderText="MM/yyyy"
      />
      <span className="absolute  left-4 top-1/2 transform -translate-y-1/2">
        <LuCalendarCheck className="text-[#8AB4F8] h-5 w-5" />
      </span>
      <button
        onClick={handleSearch}
        className="bg-[#8AB4F8] text-white py-4 px-4 rounded-e-sm "
      >
        <BiSearch className="text-[#161618] h-4 w-5" />
      </button>
    </div>
  );
};

export default MonthPickers;
