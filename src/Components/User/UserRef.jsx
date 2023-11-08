import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { TbMailOpenedFilled } from "react-icons/tb";
import { FaPhoneVolume } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateUserMutation } from "../../Feature/API/userApi";
import Cookies from "js-cookie";

export default function UserRef() {
  const token = Cookies.get("token")
  const userData = useSelector((state) => state.userSlice);
  console.log(userData);
  const editImage = document.querySelector(".file");

 
  return (
    <div className={`w-full`}>
      <main className={`flex items-center mt-16`}>
        <section className={`w-full h-[70%] p-1`}>
          <div className={`w-full h-28 flex justify-between relative px-8 bg-[#171717]`}>
            <div className="absolute w-40 h-40 -top-14">
              <div
                className={`w-full h-full overflow-hidden rounded-full border p-1 flex justify-center items-center`}
              >
                <img
                  className={`w-full h-full object-cover`}
                  src={userData?.user_photo}
                  alt=""
                />
              </div>
              <div
                onClick={() => editImage.click()}
                className={`flex justify-center cursor-pointer z-40 absolute bg-[#f5f5f5] right-3  bottom-1 items-center text-xs gap-1 border-2 rounded-full w-8 h-8 px-1 py-0.5`}
              >
                <MdOutlineEdit className="text-slate-700" />
                <input className="file hidden" type="file" name="" id="" />
              </div>
            </div>
            <div className={`flex w-[65%] ml-auto items-center justify-between`}>
              <div className={``}>
                <h2>{userData.name}</h2>
                <p>Sale Executive</p>
              </div>
              <div className="flex items-center gap-5">
                <TbMailOpenedFilled className="text-3xl bg-gray-50 text-gray-500 rounded-full hover:bg-gray-500 hover:text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in" />
                <FaPhoneVolume className="text-3xl bg-gray-50 text-gray-500 rounded-full hover:bg-gray-500 hover:text-gray-50 p-1.5 cursor-pointer transition-all duration-200 ease-in" />
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex items-center bg-[#161618] gap-10 px-8 border-b py-5`}
            >
              <NavLink>
                <div className="flex items-center gap-2">
                  <BiSolidUser />
                  <h4>Personal</h4>
                </div>
              </NavLink>

              <NavLink>
                <div className="flex items-center gap-2">
                  <BiSolidUser />
                  <h4>Login Information</h4>
                </div>
              </NavLink>
              <NavLink>
                <div className="flex items-center gap-2">
                  <BiSolidUser />
                  <h4>Password</h4>
                </div>
              </NavLink>
            </div>
            <div className="px-10 py-5 flex flex-col gap-5 bg-[#1a1a1a]">
              <div className="flex">
                <p className="w-[30%]">Phone</p>
                <p className="w-[70%]">: {userData.phone}</p>
              </div>
              <div className="flex">
                <p className="w-[30%]">Email</p>
                <p className="w-[70%]">: {userData.email}</p>
              </div>
              <div className="flex">
                <p className="w-[30%]">Address</p>
                <p className="w-[70%]">: {userData.address}</p>
              </div>
              <div className="flex">
                <p className="w-[30%]">Gender</p>
                <p className="w-[70%]">: {userData.gender}</p>
              </div>
              <div className="flex">
                <p className="w-[30%]">Date of Birth</p>
                <p className="w-[70%]">: {userData.date_of_birth}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
