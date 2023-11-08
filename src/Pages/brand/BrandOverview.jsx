import React, { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import {
  Input,
  NumberInput,
  Select,
  Table,
  TextInput,
  Textarea,
} from "@mantine/core";
import { FiSearch } from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, useMantineTheme } from "@mantine/core";

import {
  AiOutlineOrderedList,
  AiFillEdit,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsArrowRight, BsDash, BsFillGridFill } from "react-icons/bs";

import {useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import Pagination from "../../Components/Pagination";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDeleteBrandMutation, useGetBrandInfoQuery } from "../../Feature/API/brandApi";
import { MdOutlineEdit } from "react-icons/md";

const BrandOverview = () => {
  const [sort,setSort]=useState("asc");
  const [orderBy,setOrderBy]=useState("name");
  const handleOrderChange = (selectedValue) => {
    setOrderBy(selectedValue);
  }

  const handleSortChange = (selectedValue) => {
    setSort(selectedValue);
  }
  const [search,setSearch]=useState('');
  const nav = useNavigate();
  const token = Cookies.get("token");
  const [currentPage, setCurrentPage] = useState(1);
  const {data}=useGetBrandInfoQuery({ token, currentPage ,search,orderBy,sort})
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [displayState, setDisplayState] = useState(false);
  const [displayState2, setDisplayState2] = useState(false);
 const [deleteBrand]=useDeleteBrandMutation();
 const handleDelete = async (id, token) => {
    Swal.fire({
      title: `Are you sure you want to delete this product??`,
      icon: "question",
      iconColor: "#d33",
      background: "#161618",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#24262b",
      confirmButtonText: `Delete`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Call the deleteMedia mutation with the id of the picture to delete
          const resulted = await deleteBrand({ id, token });
          console.log(resulted);

          if (resulted.error) {
            // Handle any errors here
            console.error("Error deleting media:", resulted.error);
          } else {
            // Handle success, e.g., update your component state
            toast.success("Product deleted successfuly!", {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: 2000,

              hideProgressBar: true,
              theme: "dark",
            });
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    });
  };

const brandDetailedInfo=data?.data;
console.log(brandDetailedInfo);
  const rows = brandDetailedInfo?.map((element, i) => (
    <tr key={element.brand_id} className="border-b border-[#3f4245]">
      <td className="px-6 py-4">{i + 1}</td>
      <td className="px-6 py-4 capitalize text-start">{element.name.slice(0,6)}..</td>
      <td className="px-6 py-4 capitalize text-start">{element.company.slice(0,6)}..</td>
      <td className="px-6 py-4 capitalize text-start">{element.agent.slice(0,10)}...</td>
      <td className="px-6 py-4">{element.phone}</td>
      <td className="px-6 py-4 capitalize text-start">{element.information.slice(0,6)}..</td>
      <td  className="flex gap-5 px-6 py-3 justify-end">
                  <BsDash onClick={() => handleDelete(element?.brand_id, token)} className="text-3xl hover:bg-gray-50 hover:text-gray-500 rounded-full bg-gray-500 text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in" />
                  <MdOutlineEdit
                    onClick={() => nav(`/brand-editing/${element?.brand_id}`)}
                    className="text-3xl hover:bg-gray-50 hover:text-gray-500 rounded-full bg-gray-500 text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in"
                  />
                  <BsArrowRight
                    onClick={() => nav(`/brand-detail/${element?.brand_id}`)}
                    className="text-3xl hover:bg-gray-50 hover:text-gray-500 rounded-full bg-gray-500 text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in"
                  />
                </td>
      <td className=" text-white">
 
        
      </td>
    </tr>
  ));

  return (
    <div>
    
      <div className=" flex justify-between items-center">
        <Breadcrumb
          showBtn={false}
          title={"Manage Brands"}
          firstRoute={"Inventory"}
          secondRoute={"Manage Brands"}
        />
        <div className="  ">
         

          <button
            onClick={() => {
              nav("/brand-adding");
            }}
            className=" hover:opacity-80 px-6 py-2   font-bold  border  rounded-sm text-black bg-blue-300 "
          >
            + Add Brand
          </button>
        </div>
      </div>
      <div>
      <h2 className=" my-5 tracking-wide text-[1.5rem]">Brand Overview</h2>
      <div className="flex items-center justify-between">
        <Input
           onChange={(e)=>setSearch(e.target.value)}
           value={search}
          styles={() => ({
            input: {
              color: '#F8F9FA',
            },
          })}
          icon={<FiSearch />}
          variant="unstyled"
          placeholder="Search"
          radius="xs"
          className=" border border-[#3f4245] w-[400px] rounded-xl text-gray-400"
        />
        <div className=" flex  items-center gap-5  justify-around ">
          <span className=" flex mt-1  ">Sort: </span>
          <select onChange={(event) => handleSortChange(event.target.value)} data-te-select-init className="bg-inherit outline-none focus:bg-inherit">
              <option className="bg-[#3f4245] mx-5" value="asc">asc</option>
              <option className="bg-[#3f4245] mx-5" value="desc">desc</option>

            </select>
        </div>
        <div className=" flex  items-center gap-5  justify-around ">
          <span className=" flex mt-1  ">Sort: </span>
          <select  onChange={(event) => handleOrderChange(event.target.value)} data-te-select-init className="bg-inherit outline-none focus:bg-inherit">
              <option className="bg-[#3f4245] mx-5 " value="name">name</option>
              <option className="bg-[#3f4245] mx-5" value="company">company</option>
              <option className="bg-[#3f4245] mx-5" value="agent">agent</option>
              <option className="bg-[#3f4245] mx-5" value="phone">phone</option>
              <option className="bg-[#3f4245] mx-5" value="information">information</option>
            </select>
        </div>
          <div className="">
            <AiOutlineOrderedList
              onClick={() => setDisplayState(false) && setDisplayState2(true)}
              className={`${displayState ? "text-blue-800" : "text-gray-300"} ${
                displayState ? "border-blue-800" : "border-gray-300"
              } hover:text-blue-800 hover:border-blue-800 text-gray-300 border cursor-pointer border-solid border-gray-300 mx-2 inline`}
            />
            <BsFillGridFill
              onClick={() => setDisplayState(true) && setDisplayState2(false)}
              className={`${
                !displayState ? "text-blue-800" : "text-gray-300"
              } ${
                !displayState ? "border-blue-800" : "border-gray-300"
              } hover:text-blue-800 hover:border-blue-800 text-gray-300  cursor-pointer border border-solid border-gray-300 inline`}
            />
          </div>
        </div>
        <div
          className={`${!displayState ? "block" : "hidden"} overflow-y-auto`}
        >
          <main className="border border-[#3f4245] rounded-sm mt-7 ">
            <table className="w-full text-sm text-center text-[#f5f5f5]">
              <thead className="text-xs text-[#f5f5f5] uppercase ">
                <tr className="border-b border-[#3f4245]">
                  <th className="px-6 py-4">No.</th>
                  <th className="px-6 py-4  text-start">Brand Name</th>
                  <th className="px-6 py-4  text-start">Company Name</th>
                  <th className="px-6 py-4  text-start">Agent</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4  text-start">Description</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              {/* map data from old recorded voucher list from api */}
              <tbody className="text-[#f5f5f5]">{rows}</tbody>
            </table>
          </main>

          <div className=" my-8">
            <Pagination
           
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              last_page={data?.meta.last_page}
            />
          </div>
        </div>
        <div
          className={`${
            displayState ? "flex" : "hidden"
          }  my-6    flex-wrap justify-center gap-6 items-center`}
        >
          {brandDetailedInfo?.map((i) => {
            return (
              <div key={i.brand_id} className=" w-[250px]  bg-white border overflow-hidden  border-[#3f4245] rounded-lg shadow ">
                <img
                  src={i.photo}
                  className=" w-[250px] object-fill h-40 "
                  alt=""
                />
                <div className="p-2 bg-[#161618] ">
                  <p className="mb-1 text-right text-md text-[#E8EAED] font-normal  ">
                    {i.name.substring(0,10)}...
                  </p>
                
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandOverview;
