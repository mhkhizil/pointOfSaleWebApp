import React, { useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import {
  AiOutlineArrowRight,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { GiIdCard, GiPayMoney } from "react-icons/gi";
import { BsGraphUpArrow, BsPlusLg, BsShop } from "react-icons/bs";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {  PiCoinsDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";
import {  useGetDashboardDataQuery } from "../Feature/API/dbApi";
import RecentSaleTable from "../Components/Sale/RecentSaleTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
const [dataType,setDataType]=useState("yearly")
const token = Cookies.get("token");
const dbData=useGetDashboardDataQuery({token,dataType});
console.log(dbData);

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

const handleTypeChange=(type)=>{
  setDataType(type)
}


const MonthFormat = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
    let daysInMonth;
  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
    daysInMonth = 31; // January, March, May, July, August, October, December
  } else if (month === 2) {
    // February: Check for leap year
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysInMonth = 29; // Leap year
    } else {
      daysInMonth = 28; // Non-leap year
    }
  } else {
    daysInMonth = 30; // All other months
  }
    if (date.getDate() >= 1 && date.getDate() <= daysInMonth) {
    const daysArray = Array.from({ length: daysInMonth }, (_, index) => "D" + (index + 1));
    return daysArray;
  } else {
    return ["Invalid Date"]; 
  }
};

const getLabelsByDataType = () => {
  switch (dataType) {
    case "weekly":
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    case "monthly":
      return MonthFormat();;
    case "yearly":
      return [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
    default:
      return [];
  }
};
const sale_records = dbData?.data?.sale_records;
  console.log(sale_records);

const dayLabels = getLabelsByDataType();
console.log(dayLabels);
const dataForDays = Array(dayLabels.length).fill(0);
if (sale_records) {

  sale_records.forEach((data) => {
    const createdDate = new Date(data?.created_at);

    if( createdDate <= new Date()){
      if (dataType === "weekly") {
        const dayOfWeek = createdDate.getDay();
        const today=new Date();
        if (dayOfWeek >= 0 && dayOfWeek < dayLabels.length) {
          dataForDays[dayOfWeek] = data.total_cash;
        }
      } else if (dataType === "monthly") {
        const dayOfMonth = createdDate.getDate();
        if (dayOfMonth >= 1 && dayOfMonth <= dayLabels.length) {
          dataForDays[dayOfMonth - 1] = data.total_cash;
        }
      } else if (dataType === "yearly") {
        const monthIndex = createdDate.getMonth();
        dataForDays[monthIndex] = data.total_cash;
      }
    }

   
  });
}
console.log(dataForDays);



  const options = {
    scales: {
      x: {
        grid: {
          color: "#3f4245", 
        },
      },
      y: {
        grid: {
          color: "#3f4245", 
        },
        ticks: {
          values: [0, 100, 200, 300, 400,500,600], 
          callback: function (value, index, values) {
            if (value === 0) {
              return "0";
            } else {
              return value / 1000 + "K";
            }}
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  

  const today = new Date();
const todayIndex = today.getDate() - 1;

  const data = {
    labels : dayLabels,
    datasets: [
      {
        label: "Dataset 1",
        // data: dbData?.data?.sale_records.map((e)=>e.total_net_total), // Sample data
        data:dataForDays,
        borderColor: "#8AB4F8",
        borderWidth: 1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointBackgroundColor: "#f5f5f5",
        // pointRadius: (context) => {
        //   const dataIndex = context.dataIndex;
        //   if (dataIndex >= todayIndex) {
        //     return 0; // Hide data points for past and today
        //   }
        //   return 3; // Show data points for future dates
        // },
      },
    ],
  };

 
  
  return (
    <div className=" overflow-x-hidden ">
      {/* //breadcrumb */}
      <div>
        <Breadcrumb
          showBtn={false}
          title={"Overview"}
          firstRoute={"Overview"}
          secondRoute={"Products"}
        />
      </div>
      {/* first row */}
      <div className=" flex items-center justify-around">
        {/* total stock */}
        <div className="w-[20%] me-4 border border-[#3f4245] py-2 px-3 rounded-md">
          <div className=" my-[40px] flex gap-3 justify-between  ">
            <div
              className={`w-[60px] h-[60px]  rounded-full border p-1 flex justify-center items-center`}
            >
              <AiOutlineShoppingCart
                className={`w-full h-full border text-[#8AB4F8] border-solid border-[#8AB4F8] bg-[#434446] rounded-full p-2`}
                alt=""
              />
            </div>
            <div className=" self-end">
              <p className=" text-[1.5rem] font-extrabold tracking-wide">
              {dbData?.data?.total_stocks}
              </p>
              <p className=" tracking-tight font-thin text-sm">
                Total Stocks
              </p>
            </div>
          </div>
        </div>
        {/* total staff */}
        <div className="w-[20%] me-4 border border-[#3f4245] py-2 px-3 rounded-md">
          <div className="my-[40px]  flex gap-3 justify-between ">
            <div
              className={`w-[60px] h-[60px]  rounded-full border p-1 flex justify-center items-center`}
            >
              <GiIdCard
                className={`w-full h-full border text-[#8AB4F8] border-solid border-[#8AB4F8] bg-[#434446] rounded-full p-2`}
                alt=""
              />
            </div>
            <div className=" self-end">
              <p className=" text-2xl font-extrabold tracking-wide"> {formatMoney(dbData?.data?.total_staff)}</p>
              <p className=" tracking-tight font-thin text-sm">Total Staff</p>
            </div>
          </div>
        </div>
        {/* Quick action */}
        <div className="w-[60%] me-4 border border-[#3f4245] py-2 px-3 rounded-md">
          <div className=" ">
            <h2 className=" mb-2 tracking-wide text-[1.2rem]">Quick Actions</h2>
            <div className="  flex items-center justify-center mb-3">
              <div className="me-4 w-[40%] border border-[#3f4245] py-2 px-3 rounded-md">
                <div className=" my-1 flex items-center justify-evenly ">
               <Link to={'adding-product'}>
               <div className="hover:opacity-60 me-4 border border-[#3f4245] py-2 px-3 rounded-md ">
                    <AiOutlinePlus
                      className={`w-full h-full text-3xl text-[#8AB4F8]   p-2`}
                    />
                  </div>
               </Link>
                  <div>
                    <p className=" text-lg font-extrabold ">Add Product</p>
                    <p className=" tracking-tight font-thin text-sm">
                     Stock Update
                    </p>
                  </div>
                </div>
              </div>
              <div className="me-4 w-[60%] border border-[#3f4245] py-2 px-3 rounded-md">
                <div className="flex items-center justify-between ">
                  <div className=" my-1  flex items-center justify-evenly">
                    <div className=" me-4 border border-[#3f4245] py-2 px-3 rounded-md ">
                      <BsShop
                        className={`w-full h-full text-3xl text-[#8AB4F8]   p-2`}
                      />
                    </div>
                    <div>
                      <p className=" text-lg font-extrabold ">Go to Shop</p>
                      <p className=" tracking-tight font-thin text-sm">
                       Complete the sale
                      </p>
                    </div>
                  </div>
                 <Link to={'sale-recent'}>
                 <div className=" hover:opacity-60 me-4  py-2 px-3 rounded-md ">
                    <AiOutlineArrowRight
                      className={`w-full h-full border text-[#8AB4F8] border-solid border-[#8AB4F8] bg-[#434446] rounded-full p-2`}
                    />
                  </div>
                 </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* second row */}
      <div className=" my-5 border me-4 border-[#3f4245] rounded-md">
        <div className=" ms-10 flex mb-5 ">
          {/* chart section */}
          <div className=" w-[70%]">
            <div className=" flex  justify-between my-2">
              <h2 className=" tracking-wide text-[1.5rem] capitalize">{dataType} Sales</h2>
              <div className="flex border border-[#3f4245] rounded-md">
         <button
           className={`border-r rounded-l-md  border-[#3f4245] w-[5rem] py-2 ${
             dataType === "yearly" ? "bg-gray-500" : ""
           }`}
           onClick={() => handleTypeChange("yearly")}
         >
           <span className="text-center text-md text-[#f5f5f5]">Yearly</span>
         </button>
         <button
           className={`border-r  border-[#3f4245] w-[5rem] py-2 ${
             dataType === "monthly" ? "bg-gray-500" : ""
           }`}
           onClick={() => handleTypeChange("monthly")}
         >
           <span className="text-center text-md text-[#f5f5f5]">Monthly</span>
         </button>
         <button
           className={`border-r rounded-r-md border-[#3f4245] w-[5rem] py-2 ${
             dataType === "weekly" ? "bg-gray-500" : ""
           }`}
           onClick={() => handleTypeChange("weekly")}
         >
           <span className="text-center text-md text-[#f5f5f5]">Weekly</span>
         </button>
       </div>
            </div>
            {dbData?.data?.sale_records.length !== 0 ? (<div>
              <Line data={data} options={options} height={80} />
            </div>) : (<h1 className=" text-end me-32 my-20">There is no data</h1>)}
          </div>
          {/* info section */}
          <div className="w-[30%] mx-5">
            {dbData?.data?.sale_records.length!==0 ? (
            <>
            <div className="">
              <div className=" mt-3">
                <p className=" text-[1.2rem]  font-thin tracking-wide">
                  982.85k
                </p>
                <p className=" tracking-tight font-thin text-sm">Kyats</p>
              </div>
              <div className=" my-1">
                <div className=" flex gap-3 items-center justify-between mb-2 ">
                  <div className="bg-[#434446] rounded-lg px-3 py-2">
                    <BsGraphUpArrow className=" text-[#07f51b] text-xl font-extrabold  " />
                  </div>
                  <div className=" flex flex-col">
                    <span className="text-lg font-thin  tracking-wide">
                      {" "}
                  {formatMoney(dbData?.data?.stats?.total_profit)}
                    </span>
                    <span className="tracking-tight w-96 font-thin text-sm  text-[#7e7f80]">
                      {" "}
                      Total Profit
                    </span>
                  </div>
                </div>
                <div className=" flex  gap-3  items-center justify-between mb-2 ">
                  <div className="bg-[#434446] rounded-lg px-3 py-2">
                    <PiCoinsDuotone className=" text-[#8AB4F8] text-xl font-extrabold  " />
                  </div>
                  <div className=" flex flex-col">
                    <span className="text-lg font-thin  tracking-wide">
                      {" "}
                      {formatMoney(dbData?.data?.stats?.total_income)}
                    </span>
                    <span className="tracking-tight w-96 font-thin text-sm  text-[#7e7f80]">
                      Total Income
                    </span>
                  </div>
                </div>
                <div className=" flex  gap-3  items-center justify-between mb-2">
                  <div className="bg-[#434446] rounded-lg px-3 py-2">
                    <GiPayMoney className="   text-amber-400 text-xl font-extrabold  " />
                  </div>
                  <div className=" flex flex-col">
                    <span className="text-lg font-thin  tracking-wide">
                    {formatMoney(dbData?.data?.stats?.total_expense)}
                    </span>
                    <span className="tracking-tight w-96 font-thin text-sm  text-[#7e7f80]">
                      Total Expense
                    </span>
                  </div>
                </div>
              </div>
            </div>
          
              <Link to={"/report-sale"}>
              <button className="py-1 text-[#161618] px-2 w-full font-semibold text-md rounded-md bg-[#8AB4F8]">
                SALE REPORT
              </button>
              </Link>
            </>) :(<></>)}
        
          </div>
        </div>
      </div>
      {/* Third row */}
      <div>
        <div className="py-5 pb-3 ">
         <RecentSaleTable />
        </div>

      </div>
    </div>
  );
}
