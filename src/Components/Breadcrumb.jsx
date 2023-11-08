import { Link } from "@mui/material";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb({
  title,
  firstRoute,
  secondRoute,
  thirdRoute,
  btnText,
  icon,
  addProduct,
  createUser,
  editUser,
  editProfile,
  editProduct,
  save,
  showBtn,
}) {
  const nav = useNavigate();
  return (
    <div>
      <div className="flex justify-between py-2 mb-2">
        <div>
          <h2 className="tracking-wide text-[1.5rem]">{title}</h2>
          <div>
            <Link
            underline="none"
              sx={{
                fontSize: "0.9rem",
                color: "#f5f5f5", // Set the text color for the breadcrumb
                "&::after": {
                  content: '"/"', // Add a slash character after the breadcrumb link
                  color: "#8ab4f8", // Set the same color for the slash
                  marginLeft: "0.3rem", // Adjust the spacing between the link and the slash
                },
              }}
              href="#"
              color="#f5f5f5"
            >
              {firstRoute}
            </Link>
            <Link
            underline="none"
              sx={{
                fontSize: "0.9rem",
                color: "#f5f5f5",
                marginLeft: "0.3rem",
              }}
              color="#f5f5f5"
              href="#"
            >
              {secondRoute}
            </Link>
          </div>
        </div>
        {showBtn && (
          <div
            className={`w-fit px-6 py-2 flex items-center gap-2 rounded font-semibold`}
          >
            <button
              onClick={() => {
                (createUser && nav("/create-user")) ||
                  (editProfile && nav("/edit-profile")) ||
                  (editUser && nav("/user-overview")) ||
                  (editProduct && nav("/inventory-overview")) ||
                  (addProduct && nav("/inventory-overview"));
                save && save();
              }}
              className="bg-[#8AB4F8] text-[#161618]  px-6 py-3 flex items-center gap-2 rounded font-semibold"
            >
              {icon && <BsPlus className="text-[#161618]  text-2xl" />}
              {btnText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
