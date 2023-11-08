import React from "react";

import { useDispatch } from "react-redux";
import { addtoReciept } from "../../Feature/Service/recieptSlice";

const SaleCard = ({ pd }) => {
  //console.log(pd);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(addtoReciept(pd))}

      className="  w-[200px] bg-white border overflow-hidden  border-[#3f4245] rounded-lg shadow "
    >
      <a href="#">
        <img className=" w-[200px] object-fill h-40 " src={pd?.photo} alt="" />
      </a>
      <div className="p-2 bg-[#161618] ">
        <a href="#">
          <h5 className="mb-1 text-lg text-right font-medium tracking-wide text-[#E8EAED] ">
            {pd?.name.slice(0, 7)}
          </h5>
        </a>
        <p className="mb-1 text-right text-md text-[#E8EAED] font-normal  ">
          {pd?.sale_price.toFixed()} MMK
        </p>
      </div>
    </div>
  );
};

export default SaleCard;
