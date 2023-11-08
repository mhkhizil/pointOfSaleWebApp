import React, { useRef, useState } from 'react'
import Button from '../../Components/Button'
import { MdOutlineEdit } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { addProductPhoto } from '../../Feature/Service/productSlice';
const ThirdStep = ({toggleShow}) => {

  const {photo} = useSelector(state => state.productSlice)
  console.log(photo)
  return (
    <div>
       <section className={`w-full bg-[#161618]`}>
        <div className="w-full flex flex-col items-center justify-center ">
          <h2 className="my-10">Upload Photo</h2>
          <div
            className={`w-40 h-40 relative rounded-full border-2 border-dashed flex justify-center items-center`}
          >
            <img
              className={`w-full h-full object-cover rounded-full`}
              src={photo ? photo : `https://www.pngitem.com/pimgs/m/465-4656617_product-icon-png-white-png-download-manufacturing-material.png`}
              alt=""
            />
            <div
              onClick={toggleShow}
              className={`flex justify-center cursor-pointer z-50 absolute bg-slate-50 text-slate-900 right-3  bottom-1 items-center text-xs gap-1 border-2 rounded-full w-8 h-8 px-1 py-0.5`}
            >
              <MdOutlineEdit />

            </div>
          </div>
          <div className="my-10">
            <Button
              text={"Clear Photo"}
              className={`border border-gray-400 `}
            />
          </div>
        </div>
      </section>
</div>
  )
}

export default ThirdStep
