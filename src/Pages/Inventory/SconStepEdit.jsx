import React, { useEffect } from 'react'
import { BiChevronDown } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { addProductActual_price, addProductSale_price } from '../../Feature/Service/productSlice';

const SconStepEdit = ({editProduct,setEditProduct}) => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(addProductActual_price({actual_price:editProduct?.actual_price}))
    dispatch(addProductSale_price({sale_price:editProduct?.sale_price}))
   
    },[editProduct])
  return (
    <div>
    <section
          className={`flex flex-col gap-5 bg-[#161618] p-10 w-full`}
        >
        
          <div className="flex">
            <label className="w-[30%]">actual-price</label>
            <input
            required
                value={editProduct?.actual_price}
                onChange={(e) => setEditProduct((prevState) => ({
                  ...prevState,
                  actual_price: e.target.value,
                }))}
              placeholder="Enter actual price of the product"
              className={`w-[70%] outline-none border rounded px-5 py-2`}
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="flex">
            <label className="w-[30%]">sale-price</label>
            <input
            required
                value={editProduct?.sale_price}
                onChange={(e) => setEditProduct((prevState) => ({
                  ...prevState,
                  sale_price: e.target.value,
                }))}
              placeholder="Enter the price that you want to sell "
              className={`w-[70%] outline-none border rounded px-5 py-2`}
              type="text"
              name=""
              id=""
            />
          </div>
        
        </section>
</div>
  )
}

export default SconStepEdit