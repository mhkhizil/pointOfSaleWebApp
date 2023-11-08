import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress, addBirthDate, addGender, addName } from "../../Feature/Service/userSlice";

export default function Personal({data, edit}) {
  const dispatch = useDispatch()
  const [editProfile, setEditProfile] = useState({
    name: data?.user.name,
    date_of_birth: data?.user.date_of_birth,
    gender: data?.user.gender,
    address: data?.user.address,
  })
  useEffect(() => {
    dispatch(addName({name: editProfile.name}))
    dispatch(addGender({gender: editProfile.gender}))
    dispatch(addBirthDate({date_of_birth: editProfile.date_of_birth}))
    dispatch(addAddress({address: editProfile.address}))

  },[editProfile])
  return (
   <>
    {!edit && <div className="px-10 py-5 flex flex-col gap-5 bg-[#1a1a1a]">
      <div className="flex">
        <p className="w-[30%]">Date of Birth</p>
        <p className="w-[70%]">: {data?.user.date_of_birth}</p>
      </div>
      <div className="flex">
        <p className="w-[30%]">Gender</p>
        <p className="w-[70%]">: {data?.user.gender}</p>
      </div>
      <div className="flex">
        <p className="w-[30%]">Address</p>
        <p className="w-[70%]">: {data?.user.address}</p>
      </div>
    </div>}
    {edit && <div>
      <section className={`flex flex-col gap-5 bg-[#161618] p-10 w-full`}>
        <div className="flex">
          <label className="w-[30%]">Name</label>
          <input
            value={editProfile?.name}
            onChange={(e) => setEditProfile((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))}
            placeholder="Enter your name"
            className={`w-[70%] outline-none border rounded px-5 py-2`}
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="flex">
          <label className="w-[30%]">Date of Birth</label>
          <input
            value={editProfile?.date_of_birth}
            onChange={(e) => setEditProfile((prevState) => ({
              ...prevState,
              date_of_birth: e.target.value,
            }))}
            placeholder="Enter your birth date"
            className={`w-[70%] outline-none border rounded px-5 py-2`}
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="flex">
          <label className="w-[30%]">Gender</label>
          <div className={`w-[70%] flex items-center gap-10`}>
            <div className={`flex items-center gap-2`}>
              <input
                checked={editProfile?.gender === "male"}
                onChange={(e) =>
                  setEditProfile((prevState) => ({
                    ...prevState,
                    gender: e.target.id,
                  }))
                }
                className={``}
                type="radio"
                name="gender"
                id="male"
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className={`flex items-center gap-2`}>
              <input
                checked={editProfile?.gender === "female"}
                onChange={(e) =>
                  setEditProfile((prevState) => ({
                    ...prevState,
                    gender: e.target.id,
                  }))
                }
                className={``}
                type="radio"
                name="gender"
                id="female"
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        <div className="flex">
          <label className="w-[30%]">Address</label>
          <textarea
            value={editProfile?.address}
            onChange={(e) => setEditProfile((prevState) => ({
              ...prevState,
              address: e.target.value,
            }))}
            rows={3}
            placeholder="Enter your address"
            className={`w-[70%] bg-[#202124] outline-none border rounded px-5 py-2`}
            type="text"
            name=""
            id=""
          />
        </div>
      </section>
    </div>}
   
   </>
  );
}
