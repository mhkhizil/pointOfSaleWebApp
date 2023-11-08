import React from "react";
import Calculator from "./Calculator";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearList,
  setListSelector,
  voucherUpdate,
} from "../../Feature/Service/recieptSlice";
import { useCheckoutMutation } from "../../Feature/API/saleApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Reciept = () => {
  const dispatch = useDispatch();
  const { reciept, listSelector,totalPrice,tax} = useSelector(
    (state) => state.recieptSlice
  );
  console.log(reciept);
 

  // to POST voucher data
  const [checkout] = useCheckoutMutation();
  const token = Cookies.get("token");

  // new list of voucher data to send api,voucher_api is an array from api
  const newVoucherData = {
    voucher_records: reciept.map((ele) => {
      return {
        product_id: ele.product_id,
        quantity: Number(ele.quantity),
      };
    }), 
  };
 

  const navigate = useNavigate();
  // after voucher done click on the payment button to send data to Api
  const paymentHandler = async () => {
    try {
      const data = await checkout({ token, newVoucherData });
      console.log(data);
      if (data?.data?.data) {
        dispatch(voucherUpdate(data?.data));
        toast.success("Reciept Procressing!", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
        navigate("/sale-reciept");
        dispatch(clearList());
      } else if (data?.error) {
        toast.error(`${data?.error?.data?.message}`, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // render when the voucher list select
  const listActiveUpdate = (id) => {
    dispatch(setListSelector(id));
  };


  return (
    <div className="text-[#f5f5f5] bg-[#161618] h-screen fixed reciept-width   ">
      <div className="flex flex-col h-full">
        {/* bought list Header */}
        <div className='h-[50%]  overflow-scroll overflow-x-hidden bg-[#161618]'>
          <h2
          className="tracking-wide text-[1.5rem] px-3 py-2"
          >
            Reciept
          </h2>
          {/* map data from SaleCard */}
          <div className=" px-3">
            {reciept?.map((item) => {
              return (
                <Link
                  onClick={() => listActiveUpdate(item?.product_id)}
                  key={item?.product_id}
                  className="    mx-auto overflow-visible"
                >
                  <div className={`${listSelector===item?.product_id && "bg-[#3f4245]"} flex justify-between px-2 py-2  border-b   border-[#3f4245]`}>
                    <div className="flex flex-col">
                      <p
                        className={`${
                          listSelector == item?.product_id && "text-[#f5f5f5]"
                        } font-semibold leading-loose tracking-wider text-[1rem] `}
                      >
                        {item?.name.slice(0,5)}
                      </p>
                      <span className="text-[0.8rem] text-gray-400 font-thin">
                        <span className="mr-2">
                          {item?.quantity == "" ? "0" : item?.quantity}
                          pcs
                        </span>
                        <span>{item?.sale_price} MMK</span>
                      </span>
                    </div>
                    <span className="text-semibold">
                      {Number(item?.quantity) * item?.sale_price}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
       {reciept.length !==0 &&  <div className=" flex flex-col px-2 py-1 ">
          <span className="self-end">Cash - {totalPrice.toFixed(2)}</span>
          <span className="self-end text-xs text-gray-400">Tax - {tax.toFixed(2)}</span>
          <div className=" border-[#3f4245] border-b"></div>
          <span className="self-end py-1">Total - {(totalPrice + tax).toFixed(2)}</span>
        </div>}

        {/* calculator Ui for qty handling */}
        <div className="h-[50%]  ">
            <Calculator paymentHandler={paymentHandler} />
          </div>
       
      </div>
    </div>
  );
};

export default Reciept;
