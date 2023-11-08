import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { TbMailOpenedFilled } from "react-icons/tb";
import { FaPhoneVolume } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";
import Breadcrumb from "../../Components/Breadcrumb";
import Personal from "../../Components/Profile/Personal";
import LoginInfo from "../../Components/Profile/LoginInfo";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../Feature/API/profileApi";
import Cookies from "js-cookie";
import SelectPhotoModal from "../../Components/SelectPhotoModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Password from "../../Components/Profile/Password";

export default function MyAccount() {
  const nav = useNavigate()
  const token = Cookies.get("token");
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };
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

  const { data } = useGetProfileQuery(token);
  const editProfile = useSelector(state => state.userSlice)
  const name = editProfile?.name;
  const email = editProfile?.email;
  const phone = editProfile?.phone;
  const gender = editProfile?.gender;
  const address = editProfile?.address;
  const date_of_birth = editProfile?.date_of_birth;
  const updateProfileData = {
    name,
    email,
    phone,
    gender,
    address,
    date_of_birth,
  };
  console.log(updateProfileData);

  const [update] = useUpdateProfileMutation()
  const handleUpdateProfile = async () => {
    const {data} = await update({token, updateProfileData})
    data?.message === "Profile is updated successfully" && nav("/my-account")
  }
  return (
    <div className={`w-full relative`}>
      {/* path breadcrumbs */}
      <div>
        <Breadcrumb
          save={handleUpdateProfile}
        showBtn={true}
          editProfile={true}
          btnText={"Save"}
          title={"Profile"}
          firstRoute={"Profile"}
          secondRoute={"Edit Profile"}
        />
      </div>
      {/* path breadcrumbs */}
      <main className={`flex items-center mt-24`}>
        <section className={`w-full h-[70%] p-1`}>
          <div className={`w-full relative p-8 bg-[#171717]`}>
            <div
              className={`w-40 h-40 absolute -top-16 rounded-full border p-1 flex justify-center items-center`}
            >
              <img
                className={`w-full h-full rounded-full`}
                src={data?.user.user_photo}
                alt=""
              />
              <div
                onClick={toggleShow}
                className={`flex justify-center cursor-pointer absolute bg-[#f5f5f5] right-3  bottom-1 items-center text-xs gap-1 border-2 rounded-full w-8 h-8 px-1 py-0.5`}
              >
                <MdOutlineEdit className="text-slate-700" />
                <input className="file hidden" type="file" name="" id="" />
              </div>
            </div>
            {show && (
              <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                <SelectPhotoModal setShow={setShow} toggleShow={toggleShow} />
              </div>
            )}
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
            <div
              className={`flex items-center bg-[#161618] gap-10 px-8 border-b py-5`}
            >
              <div
                onClick={personalTab}
                className={`flex items-center gap-2 text-gray-400 cursor-pointer ${
                  state.personal && "text-white"
                }`}
              >
                <BiSolidUser />
                <h4>Personal</h4>
              </div>

              <div
                onClick={loginInfoTab}
                className={`flex items-center gap-2 text-gray-400 cursor-pointer ${
                  state.login && "text-white"
                }`}
              >
                <BiSolidUser />
                <h4>Login Information</h4>
              </div>
              <div
                onClick={passwordTab}
                className={`flex items-center gap-2 text-gray-400 cursor-pointer ${
                  state.password && "text-white"
                }`}
              >
                <BiSolidUser />
                <h4>Password</h4>
              </div>
            </div>
            {state.personal && (
              <div>
                <Personal edit data={data} />
              </div>
            )}
            {state.login && (
              <div>
                <LoginInfo edit data={data} />
              </div>
            )}
             {state.password &&(
              <div className="">
                <Password/>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
