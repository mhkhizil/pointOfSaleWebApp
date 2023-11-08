import React, { useState } from 'react'
import { MdOutlineEdit } from "react-icons/md";
import { TbMailOpenedFilled } from "react-icons/tb";
import { FaPhoneVolume } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";
import { NavLink, useParams } from "react-router-dom";
import { Table } from '@mantine/core';
import Pagination from '../../Components/Pagination';
import { useGetSaleHistoryInfoQuery, useGetSingleProductInfoQuery, useGetStockHistoryInfoQuery } from '../../Feature/API/productApi';
import Cookies from 'js-cookie';

const ProductDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cPage, setCPage] = useState(1);
const {id}=useParams();
const token=Cookies.get('token');
const {data}=useGetSingleProductInfoQuery({id,token});
const stockHistoryData=useGetStockHistoryInfoQuery({id,token});
const saleHistoryData=useGetSaleHistoryInfoQuery({id,token})
console.log(saleHistoryData?.data);
    const editImage = document.querySelector(".file");
    // const elements = [
    //     {
    //       No: 1,
    //       name: "abcd",
    //       account: "123",
    //       date: "-",
       
    //     },
    //     {
    //       No: 2,
    //       name: "efgh",
    //       account: "345",
    //       date: "-",
         
    //     },
    //     {
    //       No: 3,
    //       name: "ijkl",
    //       account: "569",
    //       date: "-",
        
    //     },
    //     {
    //       No: 4,
    //       name: "mnop",
    //       account: "mn",
    //       date: "-",
         
    //     },
    //     {
    //       No: 5,
    //       name: "qrst",
    //       account: "qr",
    //       date: "-",
         
    //     },
    //   ];
      const rows = saleHistoryData?.data?.data?.map((element,i) => (
        <tr key={element.id}>
          <td className=" text-white">{i+1}</td>
      
          <td className=" text-white">{element.cost}</td>
          <td className=" text-white">{element.date}</td>
         
        </tr>
      ));
      const rows2 = stockHistoryData?.data?.data?.map((element,i) => (
        <tr key={element.id}>
          <td className=" text-white">{i+1}</td>
          <td className=" text-white">{element.user_name}</td>
          <td className=" text-white">{element.quantity}</td>
          <td className=" text-white">{element.created_at}</td>
         
        </tr>
      ));
  return (
    <div className={`w-full flex justify-around items-center`}>
      <main className={`flex items-center mt-24`}>
        <section className={`w-full  p-1`}>
          <div className={`w-full relative p-8 bg-[#171717]`}>
            <div
              className={`w-40 h-40 absolute -top-16 rounded-full border p-1 flex justify-center items-center`}
            >
              <img
                className={`w-full h-full object-cover rounded-full`}
                src={data?.data?.photo}
                alt=""
              />
              <div
                onClick={() => editImage.click()}
                className={`flex justify-center cursor-pointer absolute bg-[#f5f5f5] right-3  bottom-1 items-center text-xs gap-1 border-2 rounded-full w-8 h-8 px-1 py-0.5`}
              >
                <MdOutlineEdit className="text-slate-700" />
                <input className="file hidden" type="file" name="" id="" />
              </div>
            </div>
            <div className={`flex items-center justify-between mx-10 ml-52`}>
              <div className={``}>
                <h2>{data?.data?.name}</h2>
                <div className=" my-4 block">
                  <p className="inline">Sale Price:</p>{" "}
                  <span className=" inline">{data?.data?.sale_price}</span>{" "}
                  <p className=" inline">mmk</p>
                </div>
                <div className=" my-4 block">
                  <p className="inline">Actual Price:</p>
                  <span className="inline">{data?.data?.actual_price}</span>
                  <p className=" inline">mmk</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex items-center bg-[#161618] gap-10 px-8 border-b py-5`}
            >
              <NavLink>
                <div className="flex items-center gap-2">
                  <BiSolidUser />
                  <h4> Information</h4>
                </div>
              </NavLink>
            </div>
            <div className=" w-full h-[250px] overflow-y-scroll px-10 py-5 flex flex-col gap-5 bg-[#1a1a1a]">
              <div className="flex">
                <p className="w-[30%]">Name</p>
                <p className="w-[70%]">: {data?.data?.name}</p>
              </div>
              <div className="flex">
                <p className="w-[30%]">Brand</p>
                <p className="w-[70%]">: {data?.data?.brand_name}</p>
              </div>
              <div className="flex">
                <p className="w-[30%]">Stock</p>
                <p className="w-[70%]">: {data?.data?.stock}</p>
              </div>
              <div className="flex">
                <p className="w-[30%]">Unit</p>
                <p className="w-[70%]">: {data?.data?.unit}</p>
              </div>
              <div className="flex ">
                <p className="w-[30%] inline">More info</p>
                <p className="w-[70%] inline ">: {data?.data?.more_information} </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    <div className=' flex-col'>
    <div className=' m-2 p-6 bg-[#171717]'>
     <p>STOCK HISTORY</p>
      <Table>
            <thead>
              <tr>
                <th className=" text-gray-300">NO</th>
                <th className=" text-gray-300">USER NAME</th>
                <th className=" text-gray-300">ADDED QUANTITY </th>
                <th className=" text-gray-300">CREATED AT</th>
               
                
              </tr>
            </thead>
            <tbody>{rows2}</tbody>
          </Table>
          
      </div>
      <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              last_page={stockHistoryData?.data?.meta?.last_page}
            />
      <div className=' m-2 p-6 bg-[#171717]'>
     <p>SALE HISTORY</p>
      <Table>
            <thead>
              <tr>
                <th className=" text-gray-300">NO</th>
              
                <th className=" text-gray-300">COSTS </th>
                <th className=" text-gray-300">CREATED AT</th>
               
                
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
      </div>
      <Pagination
              setCurrentPage={setCPage}
              currentPage={cPage}
              last_page={saleHistoryData?.data?.meta?.last_page}
            />
    </div>
    </div>
  )
}

export default ProductDetail
