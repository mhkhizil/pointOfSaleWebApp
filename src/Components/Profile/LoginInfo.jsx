import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addEmail, addPhone } from "../../Feature/Service/userSlice";

export default function LoginInfo({ data, edit }) {
  const dispatch = useDispatch()
  const [editProfile, setEditProfile] = useState({
    email: data?.user.email,
    phone: data?.user.phone,
  });
  useEffect(() => {
    dispatch(addEmail({ email: editProfile.email }));
    dispatch(addPhone({ phone: editProfile.phone }));
  }, [editProfile]);
  return (
    <>
      {!edit && (
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
      {edit && (
        <div className={`flex flex-col gap-5 bg-[#161618] p-10 w-full`}>
          <div className={`flex`}>
            <label className="w-[30%]">Email</label>
            <input
              value={editProfile?.email}
              onChange={(e) =>
                setEditProfile((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              placeholder="Enter your email"
              className={`w-[70%] outline-none border rounded px-5 py-2`}
              type="email"
              name=""
              id=""
            />
          </div>
          <div className="flex">
            <label className="w-[30%]">Phone</label>
            <input
              value={editProfile?.phone}
              onChange={(e) =>
                setEditProfile((prevState) => ({
                  ...prevState,
                  phone: e.target.value,
                }))
              }
              placeholder="Enter your phone number"
              className={`w-[70%] outline-none border rounded px-5 py-2`}
              type="phone"
              name=""
              id=""
            />
          </div>
        </div>
      )}
    </>
  );
}
