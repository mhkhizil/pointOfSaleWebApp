import Cookies from 'js-cookie';
import React from 'react';
import { useSelector } from 'react-redux';
import {  Navigate } from 'react-router-dom';

const SaleHandlerGuard = ({children}) => {
  const { saleClose } = useSelector((state) => state.recieptSlice);
  const virtualSaleClose=Cookies.get("sale");
  console.log(saleClose);

  if(saleClose === "false" || virtualSaleClose === "false") return children;
  else return <Navigate to={'/sale-recent'}/>
  
}

export default SaleHandlerGuard
