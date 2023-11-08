import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { PiPrinterDuotone } from "react-icons/pi";

const RecieptData = () => {
  const { totalPrice, tax, voucherData } = useSelector(
    (state) => state.recieptSlice
  );
  // console.log(voucherData?.data?.voucher_records);

  console.log(voucherData?.data);
  const printHandler = () => {
    window.print();
  };
  return (
    <>
      <div className="bg-[#202124] vendorListHeading print:h-auto text-[#f5f5f5] w-full h-screen overflow-scroll ">
        <div className=" print:hidden px-5 py-3 border-b">
          {/* back btn to go to dashboard */}
          <Link className="text-xl flex gap-1 " to="/">
            <BiArrowBack className="mt-1" />
            Back
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="text-[#f5f5f5] bg-[#161618] print:bg-[#f5f5f5] print:text-[#202124] my-3 py-4 px-7 rounded-sm shadow-lg   ">
            <div className="flex flex-col print:bg-[#f5f5f5] print:text-[#202124]">
              <div
                className={`h-full w-full  bg-[#161618] print:bg-[#f5f5f5] print:text-[#202124]`}
              >
                <h2 className="tracking-wide text-[1.5rem] text-center py-2">
                  Reciept
                </h2>
                {/* map data from bought list  */}
                <div className="boughtList print:bg-[#f5f5f5] print:text-[#202124]">
                  {voucherData?.data?.voucher_records?.map((item) => {
                    return (
                      <Link
                        key={item?.product_id}
                        className="mt-5   px-4 pt-2 mx-auto overflow-visible"
                      >
                        <div className="flex  gap-20 justify-between border-b mb-1 pb-2 border-[#3f4245]">
                          <div className="flex flex-col">
                            <span className="font-medium leading-loose tracking-wider text-[1rem]">
                              {/* {item?.name.slice(0, 7)} */}
                              {item?.name.slice(0,10)}
                            </span>
                            <span className="text-[0.8rem] font-medium">
                              <span className="mr-2 font-medium">
                                {item?.quantity}
                                pcs
                              </span>
                              <span>{item?.price} MMK</span>
                            </span>
                          </div>
                          <span className="font-medium leading-loose tracking-wider text-[1rem]">
                            {Number(item?.cost)}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className=" flex flex-col py-1 ">
                <span className="self-end">Cash - {totalPrice.toFixed(2)}</span>
                <span className="self-end text-xs print:text-[#202124] text-gray-400">
                  Tax - {tax.toFixed(2)}
                </span>
                <div className=" border-[#3f4245] border-b"></div>
                <span className="self-end py-1">
                  Total - {(totalPrice + tax).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-5 print:hidden">
          <div className="flex gap-3 text-[#f5f5f5]">
            <Link
              to={"/sale-recent"}
              className="rounded-md px-2 py-3 border border-[#3f4245]"
            >
              Recent
            </Link>
            <Link
              to={"/sale-cashier"}
              className="rounded-md px-2 py-3 border border-[#3f4245]"
            >
              Next Sale
            </Link>
            <Link
              onClick={printHandler}
              className="rounded-md px-4 py-3 border border-[#3f4245]"
            >
              {" "}
              <PiPrinterDuotone className="mt-1 text-[#8AB4F8]" />{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecieptData;
