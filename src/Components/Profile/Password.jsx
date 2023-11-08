import React from "react";

export default function Password() {
  return (
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
  );
}
