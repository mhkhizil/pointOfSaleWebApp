import React, { useState } from "react";
import Button from "../../Components/Button";
import { BiChevronDown } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb";
import FirstStep from "../Inventory/FirstStep";
import SconStep from "../Inventory/SconStep";
import ThirdStep from "../Inventory/ThirdStep";
import ProductRef from "./ProductRef";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useCreateProductMutation } from "../../Feature/API/productApi";
import SelectPhotoModal from "../../Components/SelectPhotoModal";
import ProductSelectPhotoModal from "./ProductSelectPhotoModal";
import { toast } from "react-toastify";


const AddProduct = () => {
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
 const productData =useSelector(state=> state.productSlice);
 console.log(productData);
 const [createProduct]=useCreateProductMutation();
 const handleCreateProduct = async (e) => {
  e.preventDefault();
  const {data} = await createProduct({productData, token})
  console.log(data.message)
 if(data.error){
  console.log('error',error);
 }else{
  console.log(data?.message);
  nav('/inventory-overview');
  toast.success("Product created! !", {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 2000,

    hideProgressBar: true,
    theme: "dark",
  });
 }
};
  return (
    <>
      {/* path breadcrumbs */}
      <div>
        <Breadcrumb
        addProduct={true}
          showBtn={true}
          icon={true}
          btnText={"Product list"}
          title={"Add Product"}
          firstRoute={"Inventory"}
          secondRoute={"Add Product"}
        />
      </div>
      {/* path breadcrumbs */}
      <div
        className={`${
          show ? "scale-y-1" : "scale-y-0"
        } transition-all duration-400 origin-center absolute z-20 items-center bg-[#202124] justify-center`}
      >
        <ProductSelectPhotoModal setShow={setShow} toggleShow={toggleShow} />
      </div>
      <main className="mt-7">
        <form action="" className={`flex gap-10`}>
          {/* Personal Info */}
          {state.FirstStep && (
            <div className="w-[70%]">
              <FirstStep
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
              <SconStep
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
              <ThirdStep   toggleShow={toggleShow}  />
            </div>
          )}
          {/* Create Step  */}
          {state.createStep && (
            <div className="w-[70%]">
              <ProductRef />
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
              <div onClick={handleCreateProduct} className="my-5 cursor-pointer">
                <Button icon={true} text={"Create"} />
              </div>
            )}
          </section>
        </form>
      </main>
    </>
  );
};

export default AddProduct;
