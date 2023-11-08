import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import { BiChevronDown } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb";

import ProductRef from "./ProductRef";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import { toast } from "react-toastify";
import ProductSelectPhotoModalEdit from "./ProductSelectPhotoModalEdit";
import FirstStepEdit from "./FirstStepEdit";
import SconStepEdit from "./SconStepEdit";
import ThirdStepEdit from "./ThirdStepEdit";
import EditProductRef from "./EditProductRef";
import { useGetSingleProductInfoQuery, useUpdateProductMutation } from "../../Feature/API/productApi";


const ProductEditing = () => {
 
  const {id}=useParams();
  console.log(id);
  const [updateProduct]=useUpdateProductMutation()
  const token = Cookies.get("token");
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };

  const [state, setState] = useState({
    FirstStep: true,
    SconStep: false,
    ThirdStep: false,
    createStep: false,
  });
  const handleStep2 = () => {
    setState({
      SconStep: true,
      FirstStep: false,
      ThirdStep: false,
    });
  };
  const handleStep3 = () => {
    setState({
      ThirdStep: true,
      FirstStep: false,
      SconStep: false,
    });
  };
  const handleCreateStep = () => {
    setState({
      ThirdStep: false,
      FirstStep: false,
      SconStep: false,
      createStep: true,
    });
  };
  console.log(state);
  const [select, setSelect] = useState(false);
  const [display, setDisplay] = useState("Prada");
  const toggleSelect = () => {
    setSelect(!select);
  };
  console.log();
 const productData =useSelector(state=> state.productSlice);
 console.log(productData);

 const handleEditProduct = async (e) => {
  e.preventDefault();
  console.log(token);
  console.log(id);
  const {data} = await updateProduct({token,id, productData});
  console.log(data)
 if(data.error){
  console.log('error',error);
 }else{
  console.log(data?.message);
  nav('/inventory-overview');
  toast.success("Product updated! !", {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 2000,

    hideProgressBar: true,
    theme: "dark",
  });
 }
};
const dataEdit=useGetSingleProductInfoQuery({token,id});
const[ editProduct,setEditProduct] =useState({
  name:'',
  brand_id:null,
  unit:'',
  more_information:'',
  actual_price:null,
  sale_price:null,
  photo: null
});
console.log(dataEdit?.data?.data);
useEffect(()=>{
setEditProduct({
  name:dataEdit?.data?.data?.name,
  brand_id:dataEdit?.data?.data?.brand_id,
  unit:dataEdit?.data?.data?.unit,
  more_information:dataEdit?.data?.data?.more_information,
  actual_price:dataEdit?.data?.data?.actual_price,
  sale_price:dataEdit?.data?.data?.sale_price,
  photo:dataEdit?.data?.data?.photo
})
},[dataEdit])
console.log(editProduct);
 
  return (
    <>
      {/* path breadcrumbs */}
      <div>
        <Breadcrumb
        editProduct={true}
          showBtn={true}
          icon={true}
          btnText={"Product list"}
          title={"Edit Product"}
          firstRoute={"Inventory"}
          secondRoute={"Edit Product"}
        />
      </div>
      {/* path breadcrumbs */}
      <div
        className={`${
          show ? "scale-y-1" : "scale-y-0"
        } transition-all duration-400 origin-center absolute z-20 items-center bg-[#202124] justify-center`}
      >
        <ProductSelectPhotoModalEdit editProduct={editProduct} setEditProduct={setEditProduct} setShow={setShow} toggleShow={toggleShow} />
      </div>
      <main className="mt-7">
        <form action="" className={`flex gap-10`}>
          {/* Personal Info */}
          {state.FirstStep && (
            <div className="w-[70%]">
              <FirstStepEdit
              editProduct={editProduct}
              setEditProduct={setEditProduct}
              
                select={select}
                toggleSelect={toggleSelect}
                display={display}
                setDisplay={setDisplay}
              />
            </div>
          )}
          {/* Login Info  */}
          {state.SconStep && (
            <div className="w-[70%]">
              <SconStepEdit
               editProduct={editProduct}
               setEditProduct={setEditProduct}
               
                select={select}
                toggleSelect={toggleSelect}
                display={display}
                setDisplay={setDisplay}
              />
            </div>
          )}
          {/* Photo Upload  */}
          {state.ThirdStep && (
            <div className="w-[70%]">
              <ThirdStepEdit  editProduct={editProduct}
              setEditProduct={setEditProduct}
                toggleShow={toggleShow}  />
            </div>
          )}
          {/* Create Step  */}
          {state.createStep && (
            <div className="w-[70%]">
              <EditProductRef />
            </div>
          )}
          {/* Step Indicator  */}
          <section className={`w-[30%] flex flex-col justify-center`}>
            <div className="flex items-center gap-3 my-3">
              <div
                className={`w-10 h-10 border rounded-full p-1 flex items-center justify-center`}
              >
                <p>1</p>
              </div>
              <p>Infomation</p>
            </div>
            <div className="border-l py-5 ml-5"></div>
            <div className="flex items-center gap-3 my-3">
              <div
                className={`w-10 h-10 border rounded-full p-1 flex items-center justify-center`}
              >
                <p>2</p>
              </div>
              <p>Price </p>
            </div>
            <div className="border-l py-5 ml-5"></div>
            <div className="flex items-center gap-3 my-3">
              <div
                className={`w-10 h-10 border rounded-full p-1 flex items-center justify-center`}
              >
                <p>3</p>
              </div>
              <p>Photo</p>
            </div>
            {state.FirstStep && (
              <div onClick={handleStep2} className="my-5 cursor-pointer">
                <Button icon={true} text={"Next"} />
              </div>
            )}
            {state.SconStep && (
              <div onClick={handleStep3} className="my-5 cursor-pointer">
                <Button icon={true} text={"Next"} />
              </div>
            )}
            {state.ThirdStep && (
              <div onClick={handleCreateStep} className="my-5 cursor-pointer">
                <Button icon={true} text={"Next"} />
              </div>
            )}
            {state.createStep && (
              <div onClick={handleEditProduct} className="my-5 cursor-pointer">
                <Button icon={true} text={"Create"} />
              </div>
            )}
          </section>
        </form>
      </main>
    </>
  );
};

export default ProductEditing;