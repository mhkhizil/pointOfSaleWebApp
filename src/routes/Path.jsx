import React from "react";
import { Route, Routes } from "react-router-dom";
import Guard from "./Guard";
import Dashboard from "../Pages/Dashboard";
import UserList from "../Pages/user/UserList";
import UserDetail from "../Pages/user/UserDetail";
import CreateUser from "../Pages/user/CreateUser";
import UpdateUser from "../Pages/user/EditUser";
import Home from "../Pages/Home";
import Login from "../Pages/Login/Login";
import Mediapgwpic from "../Pages/Media/Mediapgwpic";
import AuthenticatedGuard from "./AuthenticatedGuard";
import Error from "../Pages/Error";
import Recent from "../Pages/Sale/Recent";
import InventoryOverview from "../Pages/Inventory/InventoryOverview";
import Cashier from "../Pages/Sale/Cashier";
import MyAccount from "../Pages/Profile/MyAccount";
import EditProfile from "../Pages/Profile/EditProfile";
import AddProduct from "../Pages/Inventory/AddProduct";
import BannedUser from "../Pages/user/BannedUser";
import Checkout from "../Pages/Sale/Checkout";
import EditUser from "../Pages/user/EditUser";
import ProductDetail from "../Pages/Inventory/ProductDetail";
import ProductEditing from "../Pages/Inventory/ProductEditing";
import RecieptData from "../Pages/Sale/RecieptData";
import DailyFinance from "../Pages/Finance/DailyFinance";
import MonthlyFinance from "../Pages/Finance/MonthlyFinance";
import YearlyFinance from "../Pages/Finance/YearlyFinance";
import CustomFinance from "../Pages/Finance/CustomFinance";
import ReportSale from "../Pages/Report/ReportSale";
import SaleHandlerGuard from "./SaleHandlerGuard";
import StockControl from "../Pages/Stock/StockControl";
import StockAdding from "../Pages/Stock/StockAdding";
import BrandOverview from "../Pages/brand/BrandOverview";
import BrandAdding from "../Pages/brand/BrandAdding";
import DetailedinformationofBrand from "../Pages/brand/DetailedinformationOfBrand";
import BrandEditing from "../Pages/brand/BrandEditing";
import ReportStock from "../Pages/Report/ReportStock";


export default function Path() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Guard>
              <Home />
            </Guard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="my-account" element={<MyAccount />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="edit-user/:id" element={<EditUser />} />
          <Route path="user-overview" element={<UserList />} />
          <Route path="banned-user" element={<BannedUser />} />
          <Route path="user-detail/:id" element={<UserDetail />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="update-user" element={<UpdateUser />} />
          <Route path="media-gallery" element={<Mediapgwpic />} />
          <Route path="sale-recent" element={<Recent />} />
          <Route path="inventory-overview" element={<InventoryOverview />} />
          <Route path="adding-product" element={<AddProduct />} />
          <Route path="product-detail/:id" element={<ProductDetail />} />
          <Route path="product-editing" element={<ProductEditing />} />
          <Route path="report-sale" element={<ReportSale />} />
          <Route path="product-editing/:id" element={<ProductEditing />} />
          <Route path="finance-daily" element={<DailyFinance />} />
          <Route path="finance-monthly" element={<MonthlyFinance />} />
          <Route path="finance-yearly" element={<YearlyFinance />} />
          <Route path="finance-custom" element={<CustomFinance />} />
          <Route path="sale-recent" element={<Recent/>}/>
          <Route path="inventory-overview" element={<InventoryOverview/>}/>
          <Route path="adding-product" element={<AddProduct/>}/>
          <Route path="product-detail/:id" element={<ProductDetail/>}/>
          <Route path="product-editing" element={<ProductEditing/>}/>
          <Route path="report-sale" element={<ReportSale/>} />
          <Route path="product-editing/:id" element={<ProductEditing/>}/>
          <Route path="stock-control" element={<StockControl/>}/>
          <Route path="stock-adding/:id" element={<StockAdding/>}/>
          <Route path="brand-overview" element={<BrandOverview/>}/>
          <Route path="brand-adding" element={<BrandAdding/>}/>
          <Route path="brand-editing/:id" element={<BrandEditing/>}/>
          <Route path="brand-detail/:id" element={<DetailedinformationofBrand/>}/>
          <Route path="finance-daily" element={<DailyFinance/>}/>
          <Route path="finance-monthly" element={<MonthlyFinance/>}/>
          <Route path="finance-yearly" element={<YearlyFinance/>}/>
          <Route path="finance-custom" element={<CustomFinance/>}/>
          <Route path="report-stock" element={<ReportStock/>}/>
        </Route>
        <Route
          path="sale-cashier"
          element={
            <SaleHandlerGuard>
              <Cashier />
            </SaleHandlerGuard>
          }
        />
        <Route path="/sale-reciept" element={<RecieptData />} />
        <Route path="/sale-checkout" element={<Checkout />} />
        <Route
          path="login"
          element={
            <AuthenticatedGuard>
              <Login />
            </AuthenticatedGuard>
          }
        />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}
