import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BiSolidBellRing } from "react-icons/bi";
import { MdOutlineNightlight } from "react-icons/md";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className=" bg-[#3F4245] pt-4  fixed w-full">
      <div className="min-w-screen-xl px-3  flex flex-wrap items-center justify-between mx-auto ">
        <Link to={"/"} className="flex items-center">
          <span className=" text-2xl text-[#f5f5f5] border-none font-semibold tracking-wider ">
            MMS POS
          </span>
        </Link>
        <div className="flex gap-3 ">
          <span className="text-[#f5f5f5]">
            {/* <i>
              <BiSolidBellRing className="w-7 h-5" />
            </i> */}
          </span>
          <span className="text-[#f5f5f5]">
            {/* <i>
              <MdOutlineNightlight className="w-7 h-5" />
            </i> */}
          </span>
          <Link to={"my-account"} className="text-[#f5f5f5]">
            <i>
              <HiOutlineUserCircle className="w-7 h-5" />
            </i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
