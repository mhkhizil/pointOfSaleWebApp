import React from "react";
import { BsArrowRight } from "react-icons/bs";

export default function Button({ text, icon, className }) {
  return (
    <div
      className={`${
        !className ? "bg-[#7dadfa] text-white" : className
      } w-fit px-6 py-2 flex items-center gap-2 rounded  text-sm font-semibold`}
    >
      <button>{text}</button>
      <BsArrowRight className={`${!icon && "hidden"} text-sm text-white`} />
    </div>
  );
}
