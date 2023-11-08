import React from 'react'
import { useDispatch } from 'react-redux';
import { addProductActual_price, addProductSale_price } from '../../Feature/Service/productSlice';
const SconStep = () => {
  const dispatch=useDispatch();
  return (
    <div>
    <section
          className={`flex flex-col gap-5 bg-[#161618] p-10 w-full`}
        >
        
          <div className="flex">
            <label className="w-[30%]">actual-price</label>
            <input
            required
           onChange={e=>dispatch(addProductActual_price({actual_price:parseInt(e.target.value)}))}
              placeholder="Enter actual price of the product"
              className={`w-[70%] outline-none border rounded px-5 py-2`}
              type="number"
              name=""
              id=""
            />
          </div>
          <div className="flex">
            <label className="w-[30%]">sale-price</label>
            <input
            required
            onChange={e=>dispatch(addProductSale_price({sale_price:parseInt(e.target.value)}))}
              placeholder="Enter the price that you want to sell "
              className={`w-[70%] outline-none border rounded px-5 py-2`}
              type="number"
              name=""
              id=""
            />
          </div>
        
        </section>
</div>
  )
}

export default SconStep
