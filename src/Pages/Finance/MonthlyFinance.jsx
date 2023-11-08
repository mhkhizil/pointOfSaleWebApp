import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import ExportBtn from "../../Components/ExportBtn";
import { AiOutlineArrowRight } from "react-icons/ai";
import MonthPickers from "../../Components/Pickers/MonthPickers";
import Pagination from "../../Components/Pagination";
import { useGetMonthlyFinanceInfoQuery } from "../../Feature/API/getFinanceDataApi";
import Cookies from "js-cookie";
import { Loader } from "@mantine/core";

const MonthlyFinance = () => {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(true); // Step 1: Create a loading state

  const [currentPage, setCurrentPage] = useState(1);
  const catchYear = (date) => {
    if (!date) return ""; // Return an empty string if the date is not set
    const year = date.getFullYear();
    return `${year}`;
  };
  const catchMonth = (date) => {
    if (!date) return ""; // Return an empty string if the date is not set
    const month = date.getMonth() + 1; // Month is zero-based
    return `${month}`;
  };

  const thisMonth = new Date();
  function getMonthNameFromNumber(monthNumber) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // Check if the monthNumber is valid (between 1 and 12)
    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1];
    } else {
      return "Invalid Month";
    }
  }
  const [selectedDate, setSelectedDate] = useState(thisMonth);
  const getYear = catchYear(selectedDate);
  //console.log(getYear); //use in API
  const getMonth = catchMonth(selectedDate);
  //console.log(getMonth); // use in API
  const monthName = getMonthNameFromNumber(getMonth);

  const getMonthlyData = useGetMonthlyFinanceInfoQuery({
    token,
    currentPage,
    month: getMonth,
    year: getYear,
  });
  //console.log(getMonthlyData);

  const getAllMonthlyData = getMonthlyData?.data?.data;
  const totals = getMonthlyData?.data?.total;
  const lastPage = getMonthlyData?.currentData?.meta?.last_page;

  useEffect(() => {
    // Step 2: Update loading state based on query status
    if (getMonthlyData.isLoading) {
      setLoading(true);
    } else if (getMonthlyData.isSuccess || getMonthlyData.isError) {
      setLoading(false);
    }
  }, [getMonthlyData]);

  return (
    <>
      {/* path breadcrumbs */}
      <div>
        <Breadcrumb
          showBtn={true}
          icon={false}
          btnText={"Go to Shop"}
          title={"Monthly"}
          firstRoute={"Finance"}
          secondRoute={"Monthly"}
        />
      </div>
      {/* path breadcrumbs */}

      <div className="py-5 pb-3 ">
        <div className=" flex justify-between">
          <h2 className=" tracking-wide text-[1.5rem]">
            {selectedDate !== null
              ? `${monthName + ", " + getYear} Sales Overview`
              : `This Month sales Overview`}
          </h2>
          <div className="flex gap-3">
            <ExportBtn />
            <MonthPickers
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              getMonth={getMonth}
              getYear={getYear}
            />
          </div>
        </div>
      </div>

      <main
        className={`${
          loading && "border-0"
        } border border-[#3f4245] rounded-sm mt-7`}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full ">
            {" "}
            <Loader className=" py-4" variant="dots" color="gray" />{" "}
          </div>
        ) : (
          <table className="w-full text-sm text-center text-[#f5f5f5]">
            <thead className="text-xs text-[#f5f5f5] uppercase ">
              <tr className="border-b border-[#3f4245]">
                <th className="px-6 py-4">No.</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Vouchers</th>
                <th className="px-6 py-4">Cash</th>
                <th className="px-6 py-4">Tax</th>
                <th className="px-6 py-4">Total</th>
              </tr>
            </thead>
            {/* map data from from api */}
            {getAllMonthlyData && getAllMonthlyData.length === 0 ? (
              <tbody className="text-[#f5f5f5]">
                <tr className="border-b border-[#3f4245]">
                  <td className="py-4" colSpan="7">
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="text-[#f5f5f5]">
                {getAllMonthlyData?.map((monthlyData, index) => {
                  return (
                    <tr key={index} className="border-b border-[#3f4245]">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{monthlyData?.date}</td>
                      <td className="px-6 py-4">{monthlyData?.vounchers}</td>
                      <td className="px-6 py-4">
                        {monthlyData?.cash.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        {monthlyData?.tax.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        {monthlyData?.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4"></td>
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
      {loading || (getAllMonthlyData && getAllMonthlyData.length === 0) ? (
        ""
      ) : (
        <div className="flex justify-between ">
          <div className="flex gap-3 mb-2 mt-5 border border-[#3f4245] rounded-md">
            <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-3 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Days
              </span>
              <span className="text-lg self-end">
                {getAllMonthlyData?.length}
              </span>
            </button>

            <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-3 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Vouchers
              </span>
              <span className="text-sm self-end">{totals?.total_voucher}</span>
            </button>
            <button className="border-r border-[#3f4245]  flex flex-col w-[7rem] py-3 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Cash
              </span>
              <span className="text-sm self-end">
                {totals?.total_cash.toFixed(2)}
              </span>
            </button>
            <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-3 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Tax
              </span>
              <span className="text-sm self-end">
                {totals?.total_tax.toFixed(2)}
              </span>
            </button>
            <button className="  flex flex-col w-[7rem] py-3 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">Total </span>
              <span className="text-sm self-end">
                {totals?.total.toFixed(2)}
              </span>
            </button>
          </div>
          <div className=" py-5 place-self-end">
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              last_page={lastPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MonthlyFinance;
