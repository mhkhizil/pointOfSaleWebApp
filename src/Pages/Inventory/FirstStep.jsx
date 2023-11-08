import React, { useState } from 'react'
import { BiChevronDown } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { addProductBrand_id, addProductMore_information, addProductName, addProductUnit } from '../../Feature/Service/productSlice';
import { useGetBrandInfoQuery } from '../../Feature/API/brandApi';
import Cookies from 'js-cookie';


const FirstStep = ({toggleSelect, display, setDisplay, select}) => {
  const [sort,setSort]=useState("asc");
  const [orderBy,setOrderBy]=useState("name");
  const [search,setSearch]=useState('');
  const [bName,setBName]=useState('');
 
  const token = Cookies.get("token");
  const [currentPage, setCurrentPage] = useState(1);
  const {data}=useGetBrandInfoQuery({ token, currentPage ,search,orderBy,sort});
const brandInfo=data?.data;
console.log(brandInfo);
  const dispatch=useDispatch()
  return (
    <div>
        <section
              className={`flex flex-col gap-5 bg-[#161618] p-10 w-full`}
            >
              <div className="flex">
                <label className="w-[30%]">Name</label>
                <input
                required
                onChange={e=>dispatch(addProductName({name:e.target.value}))}
                  placeholder="Enter product name"
                  className={`w-[70%] outline-none border rounded px-5 py-2`}
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className={`flex`}>
            <label className="block mb-2 w-[30%]" htmlFor="">
              Brand
            </label>
            <div
              onClick={toggleSelect}
              className="w-[70%] border  outline-none py-2.5 relative rounded cursor-pointer"
            >
              <div className="px-5  flex items-center justify-between">
                <p className="">{bName || 'Choose brand...'}</p>
                <BiChevronDown
                  className={`text-xl ${
                    select && "rotate-180"
                  } transition-all duration-150`}
                />
              </div>
          
         
              <div
              className={`${
                select ? "scale-y-1 " : "scale-y-0"
              } overflow-y-auto max-h-40 transition-all duration-150 origin-top z-40 border rounded absolute w-full top-14  `}
            >
            {
              brandInfo?.map((i)=>(
                <div
                key={i?.brand_id}
                onClick={()=>{dispatch(addProductBrand_id({brand_id:i?.brand_id}));
                setBName(i?.name)
              }
              }
                className="w-full outline-none py-3 bg-[#202124] px-5 rounded-t border-b cursor-pointer"
              >
              {i?.name}
              </div>
              ))
            }
             
            </div>
         
           
            </div>
          </div>
              {/* <div className="flex">
                <label className="w-[30%]">Stock</label>
                <input
                  placeholder="Enter your Stock of product"
                  className={`w-[70%] outline-none border rounded px-5 py-2`}
                  type="number"
                  name=""
                  id=""
                />
              </div> */}
              <div className="flex">
                <label className="w-[30%]">Unit</label>
                <input
                required
                onChange={(e)=>dispatch(addProductUnit({unit:e.target.value}))}
                  placeholder="Enter unit"
                  className={`w-[70%] outline-none border rounded px-5 py-2`}
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="flex">
                <label className="w-[30%]">More info</label>
                <textarea
                required
                onChange={e=>dispatch(addProductMore_information({more_information:e.target.value}))}
                  rows={3}
                  placeholder="Enter more info about the product"
                  className={`w-[70%] bg-[#202124] outline-none border rounded px-5 py-2`}
                  type="phone"
                  name=""
                  id=""
                />
              </div>
            </section>
    </div>
  )
}

export default FirstStep
