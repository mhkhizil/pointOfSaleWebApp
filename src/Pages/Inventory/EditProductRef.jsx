import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const EditProductRef = () => {
  const dataFromSlice = useSelector((state) => state.productSlice);

    const editImage = document.querySelector(".file");
    
  return (
    <div className={`w-full`}>
    <main className={`flex items-center mt-24`}>
      <section className={`w-full h-[70%] p-1`}>
        <div className={`w-full relative p-8 bg-[#171717]`}>
          <div
            className={`w-40 h-40 absolute -top-16 rounded-full border p-1 flex justify-center items-center`}
          >
            <img
             className={`w-full h-full border border-dashed bg-[#434446] rounded-full p-2`}
             src={dataFromSlice.photo}
              alt=""
            />
            <div
              onClick={() => editImage.click()}
              className={`flex justify-center cursor-pointer absolute bg-[#f5f5f5] right-3  bottom-1 items-center text-xs gap-1 border-2 rounded-full w-8 h-8 px-1 py-0.5`}
            >
              <MdOutlineEdit className="text-slate-700" />
              <input className="file hidden" type="file" name="" id="" />
            </div>
          </div>
          <div className={`flex items-center justify-between mx-10 ml-52`}>
          <div className={``}>
                <h2>{dataFromSlice.name}</h2>
                <div className=" my-4 block">
                  <p className="inline">Sale Price:</p>{" "}
                  <span className=" inline">{dataFromSlice.sale_price}</span>{" "}
                  <p className=" inline">mmk</p>
                </div>
                <div className=" my-4 block">
                  <p className="inline">Actual Price:</p>
                  <span className="inline">{dataFromSlice.actual_price}</span>
                  <p className=" inline">mmk</p>
                </div>
              </div>
          </div>
        </div>
        <div>
          <div
            className={`flex items-center bg-[#161618] gap-10 px-8 border-b py-5`}
          >
            <NavLink>
              <div className="flex items-center gap-2">
                <BiSolidUser />
                <h4> Information</h4>
              </div>
            </NavLink>
          </div>
          <div className="px-10 py-5 flex flex-col gap-5 bg-[#1a1a1a]">
              <div className="flex">
                <p className="w-[30%]">Name</p>
                <p className="w-[70%]">: {dataFromSlice.name}</p>
              </div>
              <div className="flex">
                <p className="w-[30%]">Brand</p>
                <p className="w-[70%]">: {dataFromSlice.brand_id}</p>
              </div>
          
              <div className="flex">
                <p className="w-[30%]">Unit</p>
                <p className="w-[70%]">: {dataFromSlice.unit}</p>
              </div>
              <div className="flex">
                <p className="w-[30%]">More info</p>
                <p className="w-[70%]">: {dataFromSlice.more_information} </p>
              </div>
            </div>
        </div>
      </section>
    </main>
  </div>
  )
}

export default EditProductRef
