import React from "react";
// import Reciept from "../../Components/Sale/Reciept";
import NavBar from "../../Components/Sidebar/NavBar";
import { NavLink } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { BsCashCoin, BsCreditCard, BsCreditCard2Back } from "react-icons/bs";
import { HiArrowSmLeft } from "react-icons/hi";
import RecieptData from "./RecieptData";

const Checkout = () => {
  
  return (
    <>
      <NavBar />
      <div className=" flex gap-2 bg-[#202124]">
        <div className=" print:hidden w-2/3 mt-14 px-2">
          <Typography sx={{ fontSize: "0.8rem", paddingX: "5px" }} gutterBottom>
            <NavLink to={"/sale-cashier"}>
              {" "}
              <HiArrowSmLeft className="mt-1 w-5 h-5" />{" "}
            </NavLink>
          </Typography>
          <Typography
            sx={{ fontSize: "1.7rem", paddingX: "10px" }}
            gutterBottom
          >
            Payment Method
          </Typography>
          <div className="flex gap-5 my-3 py-5 border-b ">
            <Button
              variant="outlined"
              sx={{ color: "#f5f5f5", borderColor: "#3F4245" }}
              startIcon={<BsCashCoin />}
            >
              Cash
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "#f5f5f5", borderColor: "#3F4245" }}
              startIcon={<BsCreditCard />}
            >
              Credit Card
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "#f5f5f5", borderColor: "#3F4245" }}
              startIcon={<BsCreditCard2Back />}
            >
              Other
            </Button>
          </div>
          <Typography sx={{ fontSize: "2rem", paddingX: "10px" }} gutterBottom>
            <NavLink to={"/sale-cashier"}>Shipping</NavLink>
          </Typography>
          <div className="flex gap-5 px-5">
            <span>Pick-up</span>
            <span>Order</span>
          </div>
        </div>

        <div className=" border-l mt-12 vendorListHeading print:bg-black   w-1/3">
          <RecieptData  />
        </div>
      </div>
    </>
  );
};

export default Checkout;
