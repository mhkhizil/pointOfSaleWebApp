import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  addConfirmPass,
  addEmail,
  addPassword,
  addRole,
  // addRole,
} from "../../Feature/Service/userSlice";

export default function StepTwo({
  toggleSelect,
  display,
  setDisplay,
  select,
  userEdit,
  token,
  id,
}) {
  // const {data} = useGetSingleUserQuery({token, id})
  // console.log(data)
  const dispatch = useDispatch();
  const [editUser, setEditUser] = useState({
    password: "",
    password_confirmation: "",
  });
  console.log(editUser)
  useEffect(() => {
    dispatch(addPassword({ password: editUser.password }));
    dispatch(
      addConfirmPass({ password_confirmation: editUser.password_confirmation })
    );
  }, [editUser]);
  return (
    <div>
      <section className={`flex flex-col gap-5 bg-[#161618] p-10 w-full`}>
        {!userEdit && (
          <div className={`flex`}>
            <label className="block mb-2 w-[30%]" htmlFor="">
              Position
            </label>
            <div
              onClick={toggleSelect}
              className="w-[70%] border outline-none py-2.5 relative rounded cursor-pointer"
            >
              <div className="px-5 flex items-center justify-between">
                <p className="">{display}</p>
                <BiChevronDown
                  className={`text-xl ${
                    select && "rotate-180"
                  } transition-all duration-150`}
                />
              </div>
              <div
                className={`${
                  select ? "scale-y-1" : "scale-y-0"
                } transition-all duration-150 origin-top z-40 border rounded absolute w-full top-14`}
              >
                <div
                  onClick={(e) => {
                    setDisplay(e.target.textContent);
                    dispatch(
                      addRole({ role: e.target.textContent.toLowerCase() })
                    );
                  }}
                  className="w-full outline-none py-3 bg-[#202124] px-5 rounded-t border-b cursor-pointer"
                >
                  Admin
                </div>
                <div
                  onClick={(e) => {
                    setDisplay(e.target.textContent);
                    dispatch(
                      addRole({ role: e.target.textContent.toLowerCase() })
                    );
                  }}
                  className="w-full outline-none py-3 bg-[#202124] px-5 rounded-b cursor-pointer"
                >
                  Staff
                </div>
              </div>
            </div>
          </div>
        )}
        {!userEdit && (
          <div className="flex">
            <label className="w-[30%]">Email</label>
            <input
              onChange={(e) => dispatch(addEmail({ email: e.target.value }))}
              placeholder="Enter your email"
              className={`w-[70%] outline-none border rounded px-5 py-2`}
              type="email"
              name=""
              id=""
            />
          </div>
        )}
        {
          <div className="flex">
            <label className="w-[30%]">Password</label>
            <input
              onChange={(e) => {
                setEditUser((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
              placeholder="Enter your password"
              className={`w-[70%] outline-none border rounded px-5 py-2`}
              type="password"
              name=""
              id=""
            />
          </div>
        }
        {
          <div className="flex">
            <label className="w-[30%]">Confirm Password</label>
            <input
              onChange={(e) => {
                setEditUser((prevState) => ({
                  ...prevState,
                  password_confirmation: e.target.value,
                }));
              }}
              placeholder="Confirm your password"
              className={`w-[70%] outline-none border rounded px-5 py-2`}
              type="password"
              name=""
              id=""
            />
          </div>
        }
      </section>
    </div>
  );
}
