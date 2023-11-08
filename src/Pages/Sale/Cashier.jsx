import React, { useState } from "react";
import Reciept from "../../Components/Sale/Reciept";
import { Breadcrumbs } from "@mantine/core";
import { Link } from "@mui/material";
import SaleCard from "../../Components/Sale/SaleCard";
import { useGetallProductsQuery } from "../../Feature/API/getallProductsApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Cashier = () => {
  const token = Cookies.get("token")
  const allProducts=useGetallProductsQuery(token);
  console.log({allProducts});
  const products=allProducts?.data?.data;
  return (
    <>
      <div className="bg-[#202124] text-[#f5f5f5] w-full h-screen overflow-auto ">
        {/* nav to / */}
        <NavLink to={"/"}>
        <h1 className="px-3 w-full py-3 flex text-2xl text-[#f5f5f5] border-none font-semibold tracking-wider bg-[#3F4245] justify-between border-b border-[#3f4245]">MMS POS
        </h1>
        </NavLink>
        <div className="flex gap-1">
          {/* receipt section 1 (bought product list) */}

          <div className="w-[70%]  h-full px-2 pt-3  ">
           
            <div className=" flex justify-between pb-3 px-1 border-b border-[#3f4245] ">
              {/* <div className="flex gap-5 mt-2">
                <a className="text-[#f5f5f5] underline hover:text-blue-500 active:text-blue-700">
                  All
                </a>
                <a className="text-[#f5f5f5] hover:text-blue-500 active:text-blue-700">
                  Drinks
                </a>
                <a className="text-[#f5f5f5] hover:text-blue-500 active:text-blue-700">
                  Cakes
                </a>
                <a className="text-[#f5f5f5] hover:text-blue-500 active:text-blue-700">
                  Deserts
                </a>
                <a className="text-[#f5f5f5] hover:text-blue-500 active:text-blue-700">
                  Sets
                </a>
              </div> */}
               <Breadcrumbs aria-label="breadcrumb" style={{ color: "#f5f5f5" }}>
              <Link
                sx={{ fontSize: "1rem" }}
                href="#"
                underline="hover"
                color="#f5f5f5"
              >
                Sale
              </Link>
              <Link
                sx={{ fontSize: "1rem" }}
                underline="always"
                color="#f5f5f5"
                href="#"
              >
                Cashier
              </Link>
            </Breadcrumbs>
              <input
                id="exampleSearch2"
                placeholder="search"
                className=" w-44 px-2 py-1 rounded border border-solid border-[#3f4245] bg-transparent bg-clip-padding text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white "
                type="search"
              />
            </div>
            {/* sale cards */}
            <div className="ps-10 py-5 flex-wrap  flex gap-4 overflow-scroll   ">
              {products?.map((pd,i)=>{
                return(
                  <SaleCard key={i} pd={pd}  />
                )
              })}
            </div>
          </div>

          {/* reciept section 2 (calculator) */}
          <div className="w-[30%] h-full border-l border-[#3f4245]">
            <Reciept  />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cashier;
