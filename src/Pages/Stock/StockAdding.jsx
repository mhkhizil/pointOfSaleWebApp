import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { BiChevronDown } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../Components/Button';
import { useAddingStockQuantityMutation } from '../../Feature/API/productApi';
import { toast } from 'react-toastify';


const StockAdding = () => {
    const [addStock]=useAddingStockQuantityMutation();
    const nav=useNavigate()
    const token=Cookies.get('token');
const {id}=useParams();
const [productData,setProductData]=useState({
    product_id:id,
    quantity:null,
    more_formation:null
});
console.log(productData);
const handleCreateStock = async (e) => {
    e.preventDefault();
   const {data}=await addStock({token,productData})   
    console.log(data.message)
   if(data.error){
    console.log('error',error);
   }else{
    console.log(data?.message);
    nav('/stock-control');
    toast.success("Stock added! !", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
  
      hideProgressBar: true,
      theme: "dark",
    });
   }
  };
  return (
    <div>
        <section
              className={`flex flex-col gap-5 bg-[#161618] p-10 w-full`}
            >
           
              <div className="flex">
                <label className="w-[30%]">Stock</label>
                
                <input
                onChange={e=>setProductData((prevState) => ({
                    ...prevState,
                    quantity: parseInt(e.target.value),
                  }))}
                  placeholder="Enter your Stock of product"
                  className={`w-[70%] outline-none border rounded px-5 py-2`}
                  type="number"
                  name=""
                  id=""
                />
              </div>
              <div className="flex">
                <label className="w-[30%]">More info</label>
                <textarea
                onChange={e=>setProductData((prevState) => ({
                    ...prevState,
                    more_formation: e.target.value,
                  }))}
                  rows={3}
                  placeholder="Enter more info about the product"
                  className={`w-[70%] bg-[#202124] outline-none border rounded px-5 py-2`}
                  type="phone"
                  name=""
                  id=""
                />
              </div>
              <div onClick={handleCreateStock}  className="w-[100%]  mt-6 flex items-center justify-center cursor-pointer">
                <Button icon={true} text={"Add Stock"} />
              </div>
            </section>
    </div>
  )
}

export default StockAdding
