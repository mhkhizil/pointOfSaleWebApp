import Cookies from 'js-cookie'
import React from 'react';
import {  Navigate } from 'react-router-dom';

const AuthenticatedGuard = ({children}) =>  {
    const token=Cookies.get("token");
    
    if(token==null) return children;
    else return <Navigate to={"/"}/>

    
  }

export default AuthenticatedGuard
