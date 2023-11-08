import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";
import {
  useRecordedVoucherQuery,
  useSaleCloseMutation,
  useSaleOpenMutation,
} from "../../Feature/API/saleApi";
import Cookies from "js-cookie";
import { PiCalculatorDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Loader } from "@mantine/core";
import { setSaleClose } from "../../Feature/Service/recieptSlice";
import ExportBtn from "../ExportBtn";
import { useNavigate } from "react-router-dom";
const RecentSaleTable = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const recordedVoucher = useRecordedVoucherQuery({ token, currentPage });
  //console.log(recordedVoucher);
  const [loading, setLoading] = useState(true); // Step 1: Create a loading state
  const navigate = useNavigate();
  const oldData = recordedVoucher?.data?.data;
  const totals = recordedVoucher?.data?.total;
  //console.log(totals);
  console.log(oldData);

  const [saleCloseApi] = useSaleCloseMutation();
  const [saleOpenApi] = useSaleOpenMutation();

  const { saleClose } = useSelector((state) => state.recieptSlice);
  console.log(saleClose);
  const virtualSaleClose = Cookies.get("sale");
  console.log(virtualSaleClose);

  const saleCloseHandler = async () => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to ${
          saleClose === "true" || virtualSaleClose === "true" ? "Open" : "Close"
        } the sale?`,
        icon: "question",
        iconColor: "#fff",
        background: "#161618",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: "#3f4245",
        cancelButtonColor: "#24262b",
        confirmButtonText: `${
          saleClose === "true" || virtualSaleClose === "true" ? "Open" : "Close"
        }`,
      });

      if (result.isConfirmed) {
        let responseData;
        if (saleClose === "true" || virtualSaleClose === "true") {
          const data = await saleOpenApi(token);
          console.log(data);
          responseData = data?.data?.message;
          console.log("Sale Opened--:", responseData);
          dispatch(setSaleClose(false));
          navigate("/sale-cashier");
        } else {
          const data = await saleCloseApi(token);
          console.log(data);
          responseData = data?.data?.message;
          console.log("Sale Closed--:", responseData);

          dispatch(setSaleClose(true));
        }
      } else {
        console.log("Sale operation canceled");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    // Step 2: Update loading state based on query status
    if (recordedVoucher.isLoading) {
      setLoading(true);
    } else if (recordedVoucher.isSuccess || recordedVoucher.isError) {
      setLoading(false);
    }
  }, [recordedVoucher]);
  return (
    <>
      <div className="py-5 pb-3 ">
        <div className=" flex justify-between">
          <h2 className=" tracking-wide text-[1.5rem]">Today Sales Overview</h2>
          <div className="flex gap-3">
            <ExportBtn excelData={oldData} fileName={"Excel Export"} />
            <button
              onClick={() => saleCloseHandler()}
              className="text-white border border-[#7E7F80]  font-medium rounded-lg text-sm px-5 text-center inline-flex items-center "
            >
              <PiCalculatorDuotone className="text-[#8AB4F8] h-5 w-5 me-2" />
              {saleClose === "true" || virtualSaleClose === "true"
                ? `Sale Open`
                : `Sale Close`}
            </button>
          </div>
        </div>
      </div>

      <>
        {loading ? (
          <div className="flex flex-col items-center justify-start h-full ">
            {" "}
            <Loader className=" py-4" variant="dots" color="gray" />{" "}
          </div>
        ) : (
          <>
            {oldData?.length === 0 ? (
              <div className="text-center text-white py-4">
                There is no sale yet.
              </div>
            ) : (
              <main className="border border-[#3f4245] rounded-sm mt-7">
                <table className="w-full text-sm text-center text-[#f5f5f5]">
                  <thead className="text-xs text-[#f5f5f5] uppercase ">
                    <tr className="border-b border-[#3f4245]">
                      <th className="px-6 py-4">No.</th>
                      <th className="px-6 py-4">Sale Person</th>
                      <th className="px-6 py-4">Voucher No.</th>
                      <th className="px-6 py-4">Time</th>
                      <th className="px-6 py-4">Item Count</th>
                      <th className="px-6 py-4">Cash</th>
                      <th className="px-6 py-4">Tax</th>
                      <th className="px-6 py-4"> Total</th>
                    </tr>
                  </thead>
                  {/* map data from old recorded voucher list from api */}
                  <tbody className="text-[#f5f5f5]">
                    {oldData?.map((data, i) => {
                      return (
                        <tr key={i} className="border-b border-[#3f4245]">
                          <td className="px-6 py-4">{i + 1}</td>
                          <td className="px-6 py-4">{data?.sale_person}</td>
                          <td className="px-6 py-4">{data?.voucher_number}</td>
                          <td className="px-6 py-4">{data?.time}</td>
                          <td className="px-6 py-4">{data?.item_count}</td>
                          <td className="px-6 py-4">{data?.total}</td>
                          <td className="px-6 py-4">{data?.tax}</td>
                          <td className="px-6 py-4">{data?.net_total}</td>
                          <td className="px-6 py-4">
                            <button className="px-2 py-2 bg-[#3f4245] rounded-full">
                              <AiOutlineArrowRight />
                            </button>{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </main>
            )}
          </>
        )}
      </>

      {/* total and tax */}
      {oldData?.length > 0 ? (
        <div className="flex justify-between ">
          <div className="flex gap-3 mb-2 mt-5 border border-[#3f4245] rounded-md">
            <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Vouchers
              </span>
              <span className="text-md self-end">{totals?.total_voucher}</span>
            </button>
            <button className="border-r border-[#3f4245]  flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Cash
              </span>
              <span className="text-md self-end">
                {totals?.total_cash.toFixed(2)}
              </span>
            </button>
            <button className="border-r border-[#3f4245] flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">
                Total Tax
              </span>
              <span className="text-md self-end">
                {totals?.total_tax.toFixed(2)}
              </span>
            </button>
            <button className="  flex flex-col w-[7rem] py-2 px-2 ">
              <span className="text-xs self-end text-[#8AB4F8] ">Total </span>
              <span className="text-md self-end">
                {totals?.total.toFixed(2)}
              </span>
            </button>
          </div>
          <div className=" py-7 place-self-end">
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              last_page={recordedVoucher?.currentData?.meta?.last_page}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default RecentSaleTable;
