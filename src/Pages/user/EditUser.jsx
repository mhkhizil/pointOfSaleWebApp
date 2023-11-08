import React, { useState } from "react";
import Button from "../../Components/Button";
import { BiChevronDown } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb";
import StepThree from "../../Components/User/StepThree";
import StepTwo from "../../Components/User/StepTwo";
import StepOne from "../../Components/User/StepOne";
import UserRef from "../../Components/User/UserRef";
import Cookies from "js-cookie";
import {
  useCreateUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../Feature/API/userApi";
import { useSelector } from "react-redux";
import ProductSelectPhotoModalEdit from "../Inventory/ProductSelectPhotoModalEdit";
import UserPhotoSelect from "./UserPhotoSelect";
import { toast } from "react-toastify";

export default function EditUser() {
  const nav = useNavigate();
  const token = Cookies.get("token");
  const { id } = useParams();
  const editImage = document.querySelector(".file");
  
  const [state, setState] = useState({
    stepOne: true,
    stepTwo: false,
    stepThree:false
    
  });
  const handleStep2 = () => {
    setState({
      stepTwo: true,
      stepOne: false,
      stepThree:false
    });
  };
  const handleStep3 = () => {
    setState({
      stepThree:true,
      stepTwo: false,
      stepOne: false,
    });
  };

  console.log(state);
  const [select, setSelect] = useState(false);
  const [display, setDisplay] = useState("Admin");
  const toggleSelect = () => {
    setSelect(!select);
  };
  const data  = useGetSingleUserQuery({ token, id });
  console.log(data);

  const editUserData = useSelector((state) => state.userSlice);
  console.log(editUserData);
  const name = editUserData?.name;
  const email = editUserData?.email;
  const phone = editUserData?.phone;
  const gender = editUserData?.gender;
  const address = editUserData?.address;
  const date_of_birth = editUserData?.date_of_birth;
  const user_photo=editUserData?.user_photo;
  const password = editUserData?.password;
  const password_confirmation = editUserData?.password_confirmation;
  const updateUserData = {
    name,
    email,
    phone,
    gender,
    address,
    date_of_birth,
    user_photo,
    password,
    password_confirmation,
  };
   console.log(updateUserData);


  const [updateUser] = useUpdateUserMutation();

 

  const handleEditUser = async (e) => {
    e.preventDefault();
    const { data } = await updateUser({ editUserData, id, token });
    console.log(data);
    if(data?.error){
      console.log('error',error);
     }else{
      console.log(data?.message);
      nav('/user-overview');
      toast.success("User Data updated! !", {
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
        showBtn={true}
          editUser
          btnText={"User list"}
          title={"User"}
          firstRoute={"User"}
          secondRoute={"Edit User"}
        />
      </div>
      {/* path breadcrumbs */}
      <div
        className={`${
          select ? "scale-y-1" : "scale-y-0"
        } transition-all duration-400 origin-center absolute z-20 items-center bg-[#202124] justify-center`}
      >
        <UserPhotoSelect updateUserData={updateUserData} setSelect={setSelect}  toggleSelect={toggleSelect} />
      </div>

      <main className="mt-7">
        <form action="" className={`flex gap-10`}>
          {/* Personal Info */}
          {state.stepOne && (
            <div className="w-[70%]">
              <StepOne userEdit token={token} id={id} />
            </div>
          )}
          {/* Login Info  */}
          {state.stepTwo && (
            <div className="w-[70%]">
              <StepTwo
                select={select}
                toggleSelect={toggleSelect}
                display={display}
                setDisplay={setDisplay}
                userEdit
                token={token}
                id={id}
              />
            </div>
          )}
          {state.stepThree && (
            <div className="w-[70%]">
            <StepThree
              select={select}
              toggleSelect={toggleSelect}
              display={display}
              setDisplay={setDisplay}
              userEdit
              token={token}
              id={id}
            />
          </div>

          )}

          {/* Step Indicator  */}
          <section className={`w-[30%] flex flex-col justify-center`}>
            <div className="flex items-center gap-3 my-3">
              <div
                className={`${state.stepOne && "bg-[#8ab4b6] text-[#161618]"} w-10 h-10 border rounded-full p-1 flex items-center font-semibold justify-center`}
              >
                <p>1</p>
              </div>
              <p>Information</p>
            </div>
            <div className="border-l py-10 ml-5"></div>
            <div className="flex items-center gap-3 my-3">
              <div
                className={`${state.stepTwo && "bg-[#8ab4b6] text-[#161618]"} w-10 h-10 border rounded-full p-1 flex font-semibold items-center justify-center `}
              >
                <p>2</p>
              </div>
              <p>Password</p>
            </div>
            <div className="border-l py-10 ml-5"></div>
            <div className="flex items-center gap-3 my-3">
              <div
                className={`${state.stepThree && "bg-[#8ab4b6] text-[#161618]"} w-10 h-10 border rounded-full p-1 flex font-semibold items-center justify-center `}
              >
                <p>3</p>
              </div>
              <p>Password</p>
            </div>


            {state.stepOne && (
              <div
                type="button"
                onClick={handleStep2}
                className="my-5 cursor-pointer"
              >
                <Button icon={true} text={"Next"} />
              </div>
            )}
            {state.stepTwo && (
              <div
                type="button"
                onClick={handleStep3}
                className="my-5 cursor-pointer"
              >
                <Button icon={true} text={"Next"} />
              </div>
            )}
            {state.stepThree && (
              <div onClick={handleEditUser} className="my-5 cursor-pointer">
                <Button text={"Submit"} />
              </div>
            )}
          </section>
        </form>
      </main>
    </>
  );
}
