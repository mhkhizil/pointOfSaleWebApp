import { Input } from "@mantine/core";
import React from "react";
import { FiSearch } from "react-icons/fi";

const ManageOverview = ({ tableType,setSort,setOrderBy,search,setSearch }) => {

  const handleOrderChange = (selectedValue) => {
    setOrderBy(selectedValue);
  }

  const handleSortChange = (selectedValue) => {
    setSort(selectedValue);
  }

  
  return (
    // Table name and sort filter Component
    <div className="">
      <h2 className=" my-5 tracking-wide text-[1.5rem]">{tableType}</h2>
      <div className=" my-0 flex items-center justify-between">
        <Input
        onChange={(e)=>setSearch(e.target.value)}
        value={search}
          styles={() => ({
            input: {
              color: "#F8F9FA",
            },
          })}
          icon={<FiSearch />}
          variant="unstyled"
          placeholder="Search"
          radius="xs"
          className=" border border-[#3f4245] w-[400px] rounded-lg text-gray-400"
        />
        <div className="flex self-baseline gap-5 mt-3">
          <span>
          <span className="text-gray-400">sort :</span>
            <select onChange={(event) => handleSortChange(event.target.value)} data-te-select-init className="bg-inherit outline-none focus:bg-inherit">
              <option className="bg-[#3f4245] mx-5" value="asc">asc</option>
              <option className="bg-[#3f4245] mx-5" value="desc">desc</option>

            </select>
          </span>
          <span>
            <span className="text-gray-400">order by :</span>
            <select  onChange={(event) => handleOrderChange(event.target.value)} data-te-select-init className="bg-inherit outline-none focus:bg-inherit">
              <option className="bg-[#3f4245] mx-5 " value="name">name</option>
              <option className="bg-[#3f4245] mx-5" value="email">email</option>
              <option className="bg-[#3f4245] mx-5" value="role">position</option>
            </select>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ManageOverview;
