import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import ExportBtn from "../../Components/ExportBtn";
import { PiCalculatorDuotone } from "react-icons/pi";
import { AiOutlineArrowRight } from "react-icons/ai";
import YearPickers from "../../Components/Pickers/YearPickers";
import Pagination from "../../Components/Pagination";
import Cookies from "js-cookie";
import { Loader } from "@mantine/core";
import { useGetYearlyFinanceInfoQuery } from "../../Feature/API/getFinanceDataApi";

const YearlyFinance = () => {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(true); // Step 1: Create a loading state

  const [currentPage, setCurrentPage] = useState(1);
  const catchYear = (date) => {
    if (!date) return ""; // Return an empty string if the date is not set
    const year = date.getFullYear();
    return `${year}`;
  };
  const thisYear = new Date();
  const [selectedDate, setSelectedDate] = useState(thisYear);
  const getYear = catchYear(selectedDate);
  //console.log(getYear); //use in API

  const getYearlyData = useGetYearlyFinanceInfoQuery({
    token,
    currentPage,
    year: getYear,
  });
  console.log(getYearlyData);
  const getAllYearlyData = getYearlyData?.data?.data;
  //console.log(getAllYearlyData);
  const totals = getYearlyData?.data?.total;
  const lastPage = getYearlyData?.currentData?.meta?.last_page;
  useEffect(() => {
    // Step 2: Update loading state based on query status
    if (getYearlyData.isLoading) {
      setLoading(true);
    } else if (getYearlyData.isSuccess || getYearlyData.isError) {
      setLoading(false);
    }
  }, [getYearlyData]);
  return (
    <>
      {/* path breadcrumbs */}
      <div>
        <Breadcrumb
          showBtn={true}
          icon={false}
          btnText={"Go to Shop"}
          title={"Yearly"}
          firstRoute={"Finance"}
          secondRoute={"Yearly"}
        />
      </div>
      {/* path breadcrumbs */}

      <div className="py-5 pb-3 ">
        <div className=" flex justify-between">
          <h2 className=" tracking-wide text-[1.5rem]">
            {selectedDate !== null
              ? `${getYear} Sales Overview`
              : `This Month sales Overview`}
          </h2>
          <div className="flex gap-3">
            <ExportBtn />
            <YearPickers
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>
      </div>

      <main className={`${
          loading && "border-0"
        } border border-[#3f4245] rounded-sm mt-7`}>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full ">
            <Loader className=" py-4" variant="dots" color="gray" />{" "}
          </div>
        ) : (
          <table className="w-full text-sm text-center text-[#f5f5f5]">
            <thead className="text-xs text-[#f5f5f5] uppercase ">
              <tr className="border-b border-[#3f4245]">
                <th className="px-6 py-4">No.</th>
                <th className="px-6 py-4">Month</th>
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4">Vouchers</th>
                <th className="px-6 py-4">Cash</th>
                <th className="px-6 py-4">Tax</th>
                <th className="px-6 py-4">Total</th>
              </tr>
            </thead>
            {/* map data from from api */}
            {getAllYearlyData && getAllYearlyData.length === 0 ? (
              <tbody className="text-[#f5f5f5]">
                <tr className="border-b border-[#3f4245]">
                  <td className="py-4" colSpan="7">
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="text-[#f5f5f5]">
                {loading || getAllYearlyData?.map((yearlyData, index) => {
                  return (
                    <tr key={index} className="border-b border-[#3f4245]">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{yearlyData?.month}</td>
                      <td className="px-6 py-4">{yearlyData?.year}</td>

                      <td className="px-6 py-4">{yearlyData?.vounchers}</td>
                      <td className="px-6 py-4">
                        {yearlyData?.cash.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        {yearlyData?.tax.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        {yearlyData?.total.toFixed(2)}
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
      {loading || getAllYearlyData && getAllYearlyData.length === 0 ? (
        ""
      ) : (
        <div className="flex justify-between ">
          <div className="flex gap-3 mb-2 mt-5 border border-[#3f4245] rounded-md">
            <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Months
              </span>
              <span className="text-sm self-end">
                {getAllYearlyData?.length}
              </span>
            </button>

            <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Vouchers
              </span>
              <span className="text-sm self-end">{totals?.total_voucher}</span>
            </button>
            <button className="border-r border-[#3f4245]  flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Cash
              </span>
              <span className="text-sm self-end">
                {totals?.total_cash.toFixed(2)}
              </span>
            </button>
            <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Tax
              </span>
              <span className="text-sm self-end">
                {totals?.total_tax.toFixed(2)}
              </span>
            </button>
            <button className=" flex flex-col w-[7rem] py-2 px-2 ">
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

export default YearlyFinance;
