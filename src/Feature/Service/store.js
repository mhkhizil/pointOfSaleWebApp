import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../API/authApi";
import { profileApi } from "../API/profileApi";
import authSlice from "./authSlice";
import { userApi } from "../API/userApi";
import userSlice from "./userSlice";
import { api } from '../API/mediaApi'
import { getallProductsApi } from "../API/getallProductsApi";
import { saleApi } from "../API/saleApi";
import recieptSlice from "./recieptSlice";
import { productApi } from "../API/productApi";
import productSlice from "./productSlice";
import { brandApi } from "../API/brandApi";
import { getFinancedataApi } from "../API/getFinanceDataApi";
import { reportSaleApi } from "../API/reportSaleApi";
import { dbApi } from "../API/dbApi";
import reportSaleSlice from "./reportSaleSlice";


export const store = configureStore({
  reducer: {
   [dbApi.reducerPath]:dbApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [getallProductsApi.reducerPath]:getallProductsApi.reducer,
    [saleApi.reducerPath]:saleApi.reducer,
    [reportSaleApi.reducerPath]:reportSaleApi.reducer,
    [profileApi.reducerPath] : profileApi.reducer,
    [getFinancedataApi.reducerPath]: getFinancedataApi.reducer,
    [api.reducerPath]: api.reducer,

    authSlice: authSlice,
    userSlice: userSlice,
    productSlice: productSlice,
    recieptSlice:recieptSlice,
    reportSaleSlice:reportSaleSlice
  },
  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(dbApi.middleware, authApi.middleware, userApi.middleware,api.middleware,getallProductsApi.middleware, saleApi.middleware, profileApi.middleware,productApi.middleware,brandApi.middleware,getFinancedataApi.middleware,reportSaleApi.middleware),

});
