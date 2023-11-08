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
import { BsFillGridFill } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiCopyDuotone } from "react-icons/pi";
import {
  IoMdAdd,
  IoMdAddCircleOutline,
  IoMdRemoveCircle,
  IoMdRemoveCircleOutline,
} from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  useAddingStockQuantityMutation,
  useDeleteProductsMutation,
  useGetProductInfoQuery,
} from "../../Feature/API/productApi";
import Cookies from "js-cookie";
import Pagination from "../../Components/Pagination";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const StockControl = () => {
  const [sort,setSort]=useState("asc");
  const [orderBy,setOrderBy]=useState("name");
  const handleOrderChange = (selectedValue) => {
    setOrderBy(selectedValue);
  }

  const handleSortChange = (selectedValue) => {
    setSort(selectedValue);
  }
  const [search,setSearch]=useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const nav = useNavigate();
  const token = Cookies.get("token");
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetProductInfoQuery({ token, currentPage ,search,orderBy,sort});
  const productDetailedInfo = data?.data;
  console.log(data);
const[quantity,setQuantity]=useState('');
const[more_information,setMore_Information]=useState('');
  const theme = useMantineTheme();
  const [displayState, setDisplayState] = useState(false);
  const [displayState2, setDisplayState2] = useState(false);
  const creatingProductdata=(product_id,quantity,more_information)=>{
console.log(product_id);
console.log(quantity);
console.log(more_information);
  }

  const rows = productDetailedInfo?.map((element, i) => (
 
    <tr key={element.product_id} className="border-b border-[#3f4245]">
      <td className="px-6 py-4">{i + 1}</td>
      <td className="px-6 py-4 capitalize text-start">{element.name.slice(0,8)}...</td>
      <td className="px-6 py-4 capitalize text-start">{element.brand_name.slice(0,9)}...</td>
      <td className="px-6 py-4 capitalize text-start">{element.unit}</td>
      <td className="px-6 py-4  text-end">{element.sale_price}</td>
      <td className="px-6 py-4 text-end">{element.total_stock}</td>

 

      <td className="flex gap-5 px-6 py-3 justify-end text-white">
      <IoMdAddCircleOutline  onClick={()=>nav(`/stock-adding/${element.product_id}`)} className="text-3xl hover:bg-gray-50 hover:text-gray-500 rounded-full bg-gray-500 text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in" />
       
      </td>
    </tr>
  ));

  return (
    <div>
      <div className=" flex justify-between items-center">
        <Breadcrumb
          showBtn={false}
          title={"Stock Control"}
          firstRoute={"Inventory"}
          secondRoute={"Stock Control"}
        />
   
      </div>
      <div>
      <h2 className=" my-5 tracking-wide text-[1.5rem]">Stock Overview</h2>
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
          className=" border border-gray-400 w-[400px] rounded-xl text-gray-400"
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
              <option className="bg-[#3f4245] mx-5" value="actual_price">actual price</option>
              <option className="bg-[#3f4245] mx-5" value="sale_price">sale price</option>
              <option className="bg-[#3f4245] mx-5" value="total_stock">total stock</option>
              <option className="bg-[#3f4245] mx-5" value="unit">unit</option>
              <option className="bg-[#3f4245] mx-5" value="more_information">more information</option>
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
          <main className="border border-[#3f4245] rounded-sm  mt-7 ">
            <table className="w-full text-sm text-center text-[#f5f5f5]">
              <thead className="text-xs text-[#f5f5f5] uppercase ">
                <tr className="border-b border-[#3f4245]">
                  <th className="px-6 py-4">No.</th>
                  <th className="px-6 py-4  text-start">Name</th>
                  <th className="px-6 py-4  text-start">Brand</th>
                  <th className="px-6 py-4  text-start">Unit</th>
                  <th className="px-6 py-4  text-end">Sale Price</th>
                  <th className="px-6 py-4 text-end">Total Stock</th>
                  <th className="px-6 py-4 text-end"></th>
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
          }   my-6 overflow-y-auto  flex-wrap  justify-center gap-10 items-center`}
        >
          {productDetailedInfo?.map((i) => {
            return (
              <div key={i.product_id} className=" w-[250px]  bg-white border overflow-hidden  border-[#3f4245] rounded-lg shadow ">
                <img
                  src={i.photo}
                  className=" w-[250px] object-fill h-40 "
                  alt=""
                />
                <div className="p-2 bg-[#161618] ">
                  <p className="mb-1  text-lg text-right font-medium tracking-wide text-[#E8EAED] ">
                    {i.name}
                  </p>
                  <p className="mb-1 text-right text-md text-[#E8EAED] font-normal  ">
                    {i.sale_price}
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

export default StockControl;
