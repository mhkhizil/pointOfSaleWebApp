import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import ExportBtn from "../../Components/ExportBtn";
import { PiCalculatorDuotone } from "react-icons/pi";
import { AiOutlineArrowRight } from "react-icons/ai";
import RangeDatePickers from "../../Components/Pickers/RangeDatePickers";
import Pagination from "../../Components/Pagination";
import { useGetCustomFinanceInfoQuery } from "../../Feature/API/getFinanceDataApi";
import Cookies from "js-cookie";
import { Loader } from "@mantine/core";


const CustomFinance = () => {
  const [loading, setLoading] = useState(true); // Step 1: Create a loading state
  const token = Cookies.get("token");
  const formatDate = (date) => {
    if (!date) return ""; // Return an empty string if the date is not set
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const todayDate = new Date();
  const [startDate, setStartDate] = useState(todayDate);
  const [endDate, setEndDate] = useState(todayDate);
  const [currentPage, setCurrentPage] = useState(1);


  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const getCustomdata = useGetCustomFinanceInfoQuery({
    token,currentPage,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });
  console.log(getCustomdata);

  // const totals = getCustomdata?.currentData?.total;
  const lastPage = getCustomdata?.currentData?.meta?.last_page;

  const getAllCustomData = getCustomdata?.data?.data;
  console.log(getAllCustomData);

  useEffect(() => {
    // Step 2: Update loading state based on query status
    if (getCustomdata.isLoading) {
      setLoading(true);
    } else if (getCustomdata.isSuccess || getCustomdata.isError) {
      setLoading(false);
    }
  }, [getCustomdata,currentPage]);

  return (
    <>
      {/* path breadcrumbs */}
      <div>
        <Breadcrumb
          showBtn={true}
          icon={false}
          btnText={"Go to Shop"}
          title={"Custom"}
          firstRoute={"Finance"}
          secondRoute={"Custom"}
        />
      </div>
      {/* path breadcrumbs */}

      <div className="py-5 pb-3 ">
        <div className=" flex justify-between">
          <h2 className=" tracking-wide text-[1.5rem]">{formattedStartDate===formattedEndDate ? `${formattedStartDate}`: `${formattedStartDate} - ${formattedEndDate}`} Sales Overview</h2>
          <div className="flex gap-3">
            <ExportBtn />
            <RangeDatePickers
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </div>
      </div>

      <main className={`${
          loading && "border-0"
        } border border-[#3f4245] rounded-sm mt-7`}>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full ">
          {" "}
          <Loader className=" py-4" variant="dots" color="gray" />{" "}
        </div>
        ):
        
        (
          <table className="w-full text-sm text-center text-[#f5f5f5]">
          <thead className="text-xs text-[#f5f5f5] uppercase ">
            <tr className="border-b border-[#3f4245]">
              <th className="px-6 py-4">No.</th>
              <th className="px-6 py-4">Vouchers</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Item Count</th>
              <th className="px-6 py-4">Cash</th>
              <th className="px-6 py-4">Tax</th>
              <th className="px-6 py-4">Total</th>
            </tr>
          </thead>
          {/* map data from from api */}
          {getAllCustomData && getAllCustomData.length === 0 ? (
            <tbody className="text-[#f5f5f5]">
              <tr className="border-b border-[#3f4245]">
                <td className="py-4" colSpan="7">
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="text-[#f5f5f5]">
              {getAllCustomData?.map((customData, index) => {
                return (
                  <tr key={index} className="border-b border-[#3f4245]">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{customData?.voucher_number}</td>
                    <td className="px-6 py-4">{customData?.time}</td>
                    <td className="px-6 py-4">{customData?.item_count}</td>
                    <td className="px-6 py-4">{customData?.total.toFixed(2)}</td>
                    <td className="px-6 py-4">{customData?.tax.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {customData?.net_total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-2 py-2 bg-[#3f4245] rounded-full">
                        <AiOutlineArrowRight />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        )}
      </main>

       {/* total and tax */}
       {loading || (getAllCustomData && getAllCustomData.length === 0) ? (
        ""
      ) : (
        <div className="flex justify-between ">
        <div className="flex gap-3 mb-2 mt-5 border border-[#3f4245] rounded-md">
          <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
            <span className="text-xs self-end text-[#8AB4F8] ">
              Total Vouchers
            </span>
            <span className="text-lg self-end">{getAllCustomData?.length}</span>
          </button>
          <button className="border-r border-[#3f4245]  flex flex-col w-[7rem] py-2 px-2 ">
            <span className="text-xs self-end text-[#8AB4F8] ">Total Cash</span>
            <span className="text-lg self-end">45675</span>
          </button>
          <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
            <span className="text-xs self-end text-[#8AB4F8] ">Total Tax</span>
            <span className="text-lg self-end">45675</span>
          </button>
          <button className="  flex flex-col w-[7rem] py-2 px-2 ">
            <span className="text-xs self-end text-[#8AB4F8] ">Total </span>
            <span className="text-lg self-end">45675</span>
          </button>
        </div>
        <div className=" py-5 place-self-end">
          <Pagination currentPage={currentPage} last_page={lastPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>

      )}

      
       
      
    </>
  );
};

export default CustomFinance;

