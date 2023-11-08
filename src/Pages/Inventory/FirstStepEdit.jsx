import React, { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { addProductBrand_id, addProductMore_information, addProductName, addProductUnit } from '../../Feature/Service/productSlice';
import { useGetSingleProductInfoQuery } from '../../Feature/API/productApi';
import Cookies from 'js-cookie';
import { useGetBrandInfoQuery } from '../../Feature/API/brandApi';

const FirstStepEdit = ({toggleSelect, display, setDisplay, select,setEditProduct,editProduct}) => {
  const [sort,setSort]=useState("asc");
  const [orderBy,setOrderBy]=useState("name");
  const [search,setSearch]=useState('');
const [brName,setBrName]=useState('');
const dispatch=useDispatch();
const token = Cookies.get("token");
const [currentPage, setCurrentPage] = useState(1);
const {data}=useGetBrandInfoQuery({ token, currentPage ,search,orderBy,sort});
const brandInfo=data?.data;
useEffect(()=>{
dispatch(addProductName({name:editProduct?.name}))
dispatch(addProductUnit({unit:editProduct?.unit}))
dispatch(addProductMore_information({more_information:editProduct?.more_information}))
dispatch(addProductBrand_id({brand_id:editProduct?.brand_id}))
},[editProduct])
  return (
    <div>
        <section
              className={`flex flex-col gap-5 bg-[#161618] p-10 w-full`}
            >
              <div className="flex">
                <label className="w-[30%]">Name</label>
                <input
                required
               value={editProduct?.name}
               onChange={(e) => setEditProduct((prevState) => ({
                 ...prevState,
                 name: e.target.value,
               }))}
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
              className="w-[70%] border outline-none py-2.5 relative rounded cursor-pointer"
            >
              <div className="px-5 flex items-center justify-between">
                <p className="">{brName || 'Choose brand...'}</p>
                <BiChevronDown
                  className={`text-xl ${
                    select && "rotate-180"
                  } transition-all duration-150`}
                />
              </div>
              <div
                className={`${
                  select ? "scale-y-1" : "scale-y-0"
                } overflow-y-auto max-h-40  transition-all duration-150 origin-top z-40 border rounded absolute w-full top-14`}
              >
              {
                brandInfo?.map((i)=>(
                  <div
                  key={i?.brand_id}
                  onClick={(e)=> { setEditProduct((prevState) => ({
                    ...prevState,
                    brand_id: i?.brand_id,
                  }));
                  setBrName(i?.name)
                }}
                  className="w-full outline-none py-3 bg-[#202124] px-5 rounded-t border-b cursor-pointer"
                >
                {i?.name}
                </div>
                ))
              }
              
              </div>
            </div>
          </div>
             
              <div className="flex">
                <label className="w-[30%]">Unit</label>
                <input
                required
                    value={editProduct?.unit}
                    onChange={(e) => setEditProduct((prevState) => ({
                      ...prevState,
                      unit: e.target.value,
                    }))}
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
                  value={editProduct?.more_information}
                  onChange={(e) => setEditProduct((prevState) => ({
                    ...prevState,
                    more_information: e.target.value,
                  }))}
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

export default FirstStepEdit