import React from 'react'
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { TbClipboardText } from "react-icons/tb";
import { CiMenuKebab } from "react-icons/ci";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useGetTodaySaleReportQuery } from '../../Feature/API/reportSaleApi';



const TodaySaleOverview = () => {
  function formatMoney(number) {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1_000_000) {
      return (number / 1000).toFixed(1) + "K";
    } else if (number >= 1_000_000 && number < 1_000_000_000) {
      return (number / 1_000_000).toFixed(1) + "M";
    } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
      return (number / 1_000_000_000).toFixed(1) + "B";
    } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
      return (number / 1_000_000_000_000).toFixed(1) + "T";
    }
  }
    const token=Cookies.get("token");
    //for today Sale UI in Report/Sale
    const {data}=useGetTodaySaleReportQuery(token);
    console.log(data);
    const totalAmount=data?.total_amount;
    const tdySaleVouchers=data?.vouchers;
  return (
    <div className="w-[35%] border border-[#3f4245] py-2 px-3 rounded-md">
          {tdySaleVouchers && tdySaleVouchers.length===0 ? (<div  className="flex justify-center items-center mt-24 ">The sale data is empty right now. </div>):(
            <div className=' flex flex-col'>
            <div className="flex justify-between">
              <h1 className="text-xl">Today Sales</h1>
              <span className="text-xs">
                <CiMenuKebab />
              </span>
            </div>
            <div className="flex flex-col pt-1">
              <h1 className="text-2xl">{formatMoney(totalAmount)}</h1>{" "}
              <span className="text-xs pb-1">kyats </span>
            </div>
            <div className="flex flex-col ">
             {tdySaleVouchers?.map((data,i)=>{
              return(
                <div key={i} className="flex flex-row justify-between pt-1 pb-2 border-t ">
                <div className="flex gap-3">
                  <span>
                    <TbClipboardText className="mt-1 text-[#8AB4F8]" />
                  </span>
                  <span>{data?.voucher_number.slice(5)}</span>
                </div>
                <div className="flex gap-3 ">
                  <span>{ formatMoney(data?.net_total)}</span>
                  <span>{data?.percentage}</span>
                  <span>
                    <MdKeyboardArrowUp className="mt-1 text-[#56ca00]" />
                  </span>
                </div>
              </div>
              )
             })}
             
             
            </div>
            <Link className=" self-end " to={"/sale-recent"}>
              
              <button className="px-2 py-1.5 border rounded-md border-[#3f4345]  ">
                Recent Sales
              </button>
           
            </Link>
          </div>
          )}
        </div>
  )
}

export default TodaySaleOverview
