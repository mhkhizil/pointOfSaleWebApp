import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { TbMailOpenedFilled } from "react-icons/tb";
import { FaPhoneVolume } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";
import { NavLink, useParams } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb";
import Cookies from "js-cookie";
import { useGetSingleUserQuery } from "../../Feature/API/userApi";


export default function UserDetail() {
  const {id} = useParams()
  const editImage = document.querySelector(".file");
  const token = Cookies.get("token")
  const {data} = useGetSingleUserQuery({token, id})
  console.log(data);
  const [state, setState] = useState({
    personal: true,
    login: false,
    password: false,
  });
  const personalTab = () => {
    setState({
      personal: true,
      login: false,
      password: false,
    });
  };
  const loginInfoTab = () => {
    setState({
      personal: false,
      login: true,
      password: false,
    });
  };
  const passwordTab = () => {
    setState({
      personal: false,
      login: false,
      password: true,
    });
  };
  return (
    <div className={`w-full`}>
    {/* path breadcrumbs */}
    <div>
    <Breadcrumb showBtn={true} icon={true} btnText={"Create"} title={"User"} firstRoute={"User"} secondRoute={"Overview"}/>
    </div>
    {/* path breadcrumbs */}
    <main className={`flex items-center mt-24`}>
      <section className={`w-full h-[70%] p-1`}>
        <div className={`w-full relative p-8 bg-[#171717]`}>
          <div
            className={`w-40 h-40 absolute -top-16 rounded-full border p-1 flex justify-center items-center`}
          >
            <img
              className={`w-full h-full object-cover rounded-full`}
              src={data?.user.user_photo}
              alt=""
            />
            {/* <div
              onClick={() => editImage.click()}
              className={`flex justify-center cursor-pointer absolute bg-[#f5f5f5] right-3  bottom-1 items-center text-xs gap-1 border-2 rounded-full w-8 h-8 px-1 py-0.5`}
            >
              <MdOutlineEdit className="text-slate-700"/>
              <input className="file hidden" type="file" name="" id="" />
            </div> */}
          </div>
          <div className={`flex items-center justify-between mx-10 ml-52`}>
            <div className={``}>
              <h2>{data?.user.name}</h2>
              <p>Sale Executive</p>
            </div>
            <div className="flex items-center gap-5">
              <TbMailOpenedFilled className="text-3xl bg-gray-50 text-gray-500 rounded-full hover:bg-gray-500 hover:text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in" />
              <FaPhoneVolume className="text-3xl bg-gray-50 text-gray-500 rounded-full hover:bg-gray-500 hover:text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in" />
            </div>
          </div>
        </div>
        <div>
          <div className={`flex items-center bg-[#161618] gap-10 px-8 border-b py-5`}>
            <NavLink onClick={personalTab}>
              <div  className={`flex items-center gap-2 text-gray-400 cursor-pointer ${
                  state.personal && "text-white"
                }`}>
                <BiSolidUser />
                <h4>Personal</h4>
              </div>
            </NavLink>
            
            <NavLink onClick={loginInfoTab}>
              <div  className={`flex items-center gap-2 text-gray-400 cursor-pointer ${
                  state.login && "text-white"
                }`}>
                <BiSolidUser />
                <h4>Login Information</h4>
              </div>
            </NavLink>
            {/* <NavLink onClick={passwordTab}>
              <div className={`flex items-center gap-2 text-gray-400 cursor-pointer ${
                  state.password && "text-white"
                }`}>
                <BiSolidUser />
                <h4>Password</h4>
              </div>
            </NavLink> */}
          </div>
          {state.personal && (
          <div className="px-10 py-5 flex flex-col gap-5 bg-[#1a1a1a]">
              <div className="flex">
                <p className="w-[30%]">Phone</p>
                <p className="w-[70%]">: {data?.user.phone}</p>
              </div>
              <div className="flex">
                <p className="w-[30%]">Email</p>
                <p className="w-[70%]">: {data?.user.email}</p>
              </div>
              <div className="flex">
                <p className="w-[30%]">Address</p>
                <p className="w-[70%]">: {data?.user.address}</p>
              </div>
              <div className="flex">
                <p className="w-[30%]">Gender</p>
                <p className="w-[70%]">: {data?.user.gender}</p>
              </div>
              <div className="flex">
                <p className="w-[30%]">Date of Birth</p>
                <p className="w-[70%]">: {data?.user.date_of_birth}</p>
              </div>
            </div>)}
            {state.login && (
             <div className="px-10 py-5 flex flex-col gap-5 bg-[#1a1a1a]">
             <div className="flex">
               <p className="w-[30%]">Phone</p>
               <p className="w-[70%]">: {data?.user.phone}</p>
             </div>
             <div className="flex">
               <p className="w-[30%]">Position</p>
               <p className="w-[70%]">: {data?.user.role}</p>
             </div>
             <div className="flex">
               <p className="w-[30%]">Email</p>
               <p className="w-[70%]">: {data?.user.email}</p>
             </div>
           </div>
            )}
            {/* {state.password && (
              <div className="px-10 py-5 flex flex-col gap-5 bg-[#1a1a1a]">
              <div className="flex">
                <label className="w-[30%]">Current Password</label>
                <input
                  placeholder="Current Password"
                  className={`w-[70%] outline-none border rounded px-5 py-2`}
                  type="phone"
                  name=""
                  id=""
                />
              </div>
              <div className="flex">
                <label className="w-[30%]">New Password</label>
                <input
                  placeholder="New Password"
                  className={`w-[70%] outline-none border rounded px-5 py-2`}
                  type="phone"
                  name=""
                  id=""
                />
              </div>
              <div className="flex">
                <label className="w-[30%]">Confirm Password</label>
                <input
                  placeholder="Confirm Password"
                  className={`w-[70%] outline-none border rounded px-5 py-2`}
                  type="phone"
                  name=""
                  id=""
                />
              </div>
            </div>
            )} */}
        </div>
      </section>
    </main>
    </div>
  );
}
