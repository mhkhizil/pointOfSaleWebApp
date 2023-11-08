import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSearch } from "react-icons/bi";
import { LuCalendarCheck } from "react-icons/lu";

const RangeDatePickers = ({startDate,setStartDate,endDate,setEndDate}) => {
  

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const handleSearch = () => {
    // Add your search logic here using the selectedDate
    console.log("Searching from:", startDate,"to",endDate);
  };

  return (
    <div className="flex items-center  rounded-md border border-[#7E7F80]">
      <div className="border-e py-2.5 border-[#7E7F80] relative">
        
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="d/M/yyyy"
          className=" rounded-md outline-none   text-center"
          placeholderText="Start Date"
          id="startDate"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <LuCalendarCheck className="text-[#8AB4F8] h-5 w-5" />
      </span>
      </div>
      
      <div className="relative">
       
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="d/M/yyyy"
          placeholderText="End Date"
          className=" rounded-md outline-none text-center"
          id="endDate"
        />
         <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <LuCalendarCheck className="text-[#8AB4F8] h-5 w-5" />
      </span>
      </div>
      <button
        onClick={handleSearch}
        className="bg-[#8AB4F8] text-white py-4 px-4 rounded-e-sm "
      >
        <BiSearch className="text-[#161618] h-4 w-5" />
      </button>
    </div>
  );
};

export default RangeDatePickers;
