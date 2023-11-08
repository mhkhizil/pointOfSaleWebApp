import React, { useState } from "react";
import { Accordion } from "@mantine/core";
import { BiHome } from "react-icons/bi";
import { TbClipboardText } from "react-icons/tb";
import {
  PiUserCirclePlusBold,
  PiUserSquareFill,
  PiChartDonut,
  PiCoinsBold,
} from "react-icons/pi";
import { TfiGallery } from "react-icons/tfi";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../Feature/API/authApi";
import { useDispatch } from "react-redux";
import { removeUser } from "../../Feature/Service/authSlice";
import Cookies from "js-cookie";

const SidebarItems = () => {
  const nav = useNavigate();
  const user = JSON.stringify(Cookies.get("user"));
  const token = Cookies.get("token");
  const [logout] = useLogoutMutation(token);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    const { data } = await logout(token);
    if (data?.message === "logout successful") {
      //dispatch(removeUser());
      nav("/login");
    }
    dispatch(removeUser());
    console.log(data);
  };
  const location = useLocation();

  return (
    <>
      {/* accordion control on sidebar */}
      <Accordion
        id="sidebar"
        transitionDuration={700}
        px={"xs"}
        styles={{
          item: {
            border: "0",
            paddingTop: "10px",
          },
          panel: {
            ":active": {
              color: "#3F4245",
            },
            paddingTop: "4px",
          },

          control: {
            fontSize: "1rem",
            color: "#f5f5f5",
            ":hover": {
              backgroundColor: "transparent",
            },

            "&[data-active]": {
              backgroundColor: "#3F4245",
            },
          },
          chevron: {
            color: "#f5f5f5",
          },
        }}
        defaultValue="d"
      >
        {/* Overview Dashboard */}
        <Accordion.Item value="overview">
          <Accordion.Control
            chevron=" "
            className={location.pathname === "/" ? " bg-[#3f4245] px-5  text-[#f5f5f5] text-[1rem]  pt-1 pb-2" : "px-5 active:bg-[#3F4245]  text-[#f5f5f5] text-[1rem]  pt-1 pb-2"}
          >
            <NavLink className="block"  to={"/"}>
              <span className="inline-flex gap-3 my-0 py-0">
                <i>
                  <BiHome className="mt-1" />
                </i>{" "}
                Overview
              </span>
            </NavLink>
          </Accordion.Control>
        </Accordion.Item>
        {/* Sale */}
        <Accordion.Item value="Sale">
          <Accordion.Control>
            <span className=" inline-flex gap-3 my-0 py-0">
              <i className="">
                <BiHome className="mt-1" />
              </i>
              Sale{" "}
            </span>
          </Accordion.Control>
          <Accordion.Panel className="">
            <NavLink
              to={"sale-cashier"}
              className={
                "pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2"
              }
              // className={`pt-1 pb-2 border-s-2 block border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5] px-2 ${
              //   location.pathname === "/" ? "active-link" : ""
              // }`}
            >
              Cashier
            </NavLink>
          </Accordion.Panel>
          <Accordion.Panel>
            <NavLink
              to={"sale-recent"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/sale-recent" ? `active-link` : ``
              }`}
            >
              Recent
            </NavLink>
          </Accordion.Panel>
        </Accordion.Item>
        {/* inventory */}
        <Accordion.Item value="Inventory">
          <Accordion.Control>
            <span className="inline-flex gap-3 my-0 py-0">
              <i>
                <TbClipboardText className="mt-1" />
              </i>{" "}
              Inventory
            </span>
          </Accordion.Control>
          <Accordion.Panel>
            <NavLink
              to={"inventory-overview"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/inventory-overview" ? `active-link` : ``
              }`}
            >
              Products
            </NavLink>
          </Accordion.Panel>
          <Accordion.Panel>
            <NavLink
              to={"adding-product"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/adding-product" ? `active-link` : ``
              }`}
            >
              Add Products
            </NavLink>
          </Accordion.Panel>
          <Accordion.Panel>
            <NavLink
              to={"stock-control"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/stock-control" ? `active-link` : ``
              }`}
            >
              Stock Control
            </NavLink>
          </Accordion.Panel>
          <Accordion.Panel>
            <NavLink
              to={"brand-overview"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/brand-overview" ? `active-link` : ``
              }`}
            >
              Manage Brands
            </NavLink>
          </Accordion.Panel>
        </Accordion.Item>
        {/* Report */}
        <Accordion.Item value="Report">
          <Accordion.Control>
            <span className=" inline-flex gap-3 my-0 py-0">
              <i className="">
                <PiChartDonut className="mt-1" />
              </i>
              Report{" "}
            </span>
          </Accordion.Control>
          <Accordion.Panel className="">
            <NavLink
              to={"report-stock"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/report-stock" ? `active-link` : ``
              }`}
            >
              Stock
            </NavLink>
          </Accordion.Panel>
          <Accordion.Panel>
            <NavLink
              to={"report-sale"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/report-sale" ? `active-link` : ``
              }`}
            >
              Sale
            </NavLink>
          </Accordion.Panel>
        </Accordion.Item>
        {/* finance */}
        <Accordion.Item value="Finance">
          <Accordion.Control>
            <span className="inline-flex gap-3 my-0 py-0">
              <i>
                <PiCoinsBold className="mt-1" />
              </i>{" "}
              Finance
            </span>
          </Accordion.Control>
          <Accordion.Panel>
            <NavLink
              to={"finance-daily"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/finance-daily" ? `active-link` : ``
              }`}
            >
              Daily
            </NavLink>
          </Accordion.Panel>
          <Accordion.Panel>
            <NavLink
              to={"finance-monthly"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/finance-monthly" ? `active-link` : ``
              }`}
            >
              Monthly
            </NavLink>
          </Accordion.Panel>
          <Accordion.Panel>
            <NavLink
              to={"finance-yearly"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/finance-yearly" ? `active-link` : ``
              }`}
            >
              Yearly
            </NavLink>
          </Accordion.Panel>
          <Accordion.Panel>
            <NavLink
              to={"finance-custom"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/finance-custom" ? `active-link` : ``
              }`}
            >
              Custom
            </NavLink>
          </Accordion.Panel>
        </Accordion.Item>
        {/* User */}
        <Accordion.Item value="User">
          <Accordion.Control>
            <span className="inline-flex gap-3 my-0 py-0">
              <i>
                <PiUserCirclePlusBold className="mt-1" />
              </i>{" "}
              User
            </span>
          </Accordion.Control>
          <Accordion.Panel>
            <NavLink
              to={"user-overview"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/user-overview" ? `active-link` : ``
              }`}
            >
              Overview
            </NavLink>
          </Accordion.Panel>
          <Accordion.Panel className="">
            <NavLink
              to={"/create-user"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/create-user" ? `active-link` : ``
              }`}
            >
              Create User
            </NavLink>
          </Accordion.Panel>
          <Accordion.Panel className="">
            <NavLink
              to={"/banned-user"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/banned-user" ? `active-link` : ``
              }`}
            >
              Banned User
            </NavLink>
          </Accordion.Panel>
        </Accordion.Item>
        {/* media */}
        <Accordion.Item value="media">
          <Accordion.Control
            chevron=" "
            className={location.pathname === "media-gallery" ? " bg-[#3f4245] px-5  text-[#f5f5f5] text-[1rem]  pt-1 pb-2" : "px-5 active:bg-[#3F4245]  text-[#f5f5f5] text-[1rem]  pt-1 pb-2"}
          >
            <NavLink className="block" to={"media-gallery"}>
              <span className="inline-flex gap-3 my-0 py-0">
                <i>
                  <TfiGallery className="mt-1" />
                </i>{" "}
                Media
              </span>
            </NavLink>
          </Accordion.Control>
        </Accordion.Item>

        {/* profile */}
        <Accordion.Item value="Profile">
          <Accordion.Control>
            <span className="inline-flex gap-3 my-0 py-0">
              <i>
                <PiUserSquareFill className="mt-1" />
              </i>{" "}
              Profile
            </span>
          </Accordion.Control>

          <Accordion.Panel className="px-2 py-0  text-[1rem]">
            <NavLink
              to={"/my-account"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/my-account" ? `active-link` : ``
              }`}
            >
              My Account
            </NavLink>
          </Accordion.Panel>
          <Accordion.Panel className="px-2 py-0  text-[1rem]">
            <NavLink
              to={"/edit-profile"}
              className={`pt-1 pb-2 border-s-2 block active:text-[#8AB4F8] border-[#3f4245] hover:bg-[#202124] cursor-pointer text-[#f5f5f5]  px-2 ${
                location.pathname === "/edit-profile" ? `active-link` : ``
              }`}
            >
              Edit
            </NavLink>
          </Accordion.Panel>
        </Accordion.Item>
        {/* logout */}
        <Accordion.Item value="logOut">
          <Accordion.Control
            chevron=" "
            className="px-5 active:bg-[#3F4245]  text-[#f5f5f5] text-[1rem]  pt-1 pb-2"
          >
            <NavLink className="block" onClick={logoutHandler} to={"/login"}>
              <span className="inline-flex gap-3 my-0 py-0">
                <i>
                  <HiOutlineLogout className="mt-1" />
                </i>{" "}
                logout
              </span>
            </NavLink>
          </Accordion.Control>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default SidebarItems;
