import React from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Error = () => {
    const token=Cookies.get("token");
    

  return (
    <div>
      <section className="bg-[#161618] h-screen ">
        <div className=" flex justify-center items-center h-screen  ">
         <div className="flex flex-col">
         <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-[#f5f5f5]  ">
            404 NOT FOUND !
          </h1>

          <div className="flex flex-col mb-8 ">
            <Link to={token? "/" :"/login"}   className="inline py-3 px-5 text-base font-medium text-center text-[#f5f5f5] rounded-lg bg-primary-700  hover:text-blue-600  ">
              Go Back
            </Link>
          </div>
         </div>
        </div>
      </section>
    </div>
  );
};

export default Error;
