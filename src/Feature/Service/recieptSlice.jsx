import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const getInitialSaleCloseState = () => {
  const savedSaleClose = Cookies.get("sale");
  return savedSaleClose === 'true' || savedSaleClose === 'false' ? savedSaleClose : 'true';
};

const initialState = {
  reciept: [],
  totalPrice: 0,
  voucherData: null,
  initialChanged: null,
  tax: 0,
  listSelector: 1,
  saleClose: getInitialSaleCloseState(),
}; 

const totalAmount = (reciept) => {
  return reciept.reduce((pv, cv) => pv + cv.sale_price * cv.quantity, 0);
};

const totalTax = (reciept) => {
  return reciept.reduce(
    (pv, cv) => (pv + cv.sale_price * cv.quantity) * (5 / 100),
    0
  );
};

export const recieptSlice = createSlice({
  name: "reciept",
  initialState,
  reducers: {
    // from card to list
    addtoReciept: (state, { payload }) => {
      const isExisted = state.reciept.find(
        (item) => item.product_id === payload.product_id
      );
      if (isExisted) {
        return state;
      } else {
        state.reciept = [...state.reciept, { ...payload, quantity: "1" }];
      }
      state.totalPrice = totalAmount(state.reciept);
      state.tax = totalTax(state.reciept);
      state.listSelector=payload.product_id;
      state.initialChanged = true;

    },
    setListSelector: (state, { payload }) => {
      state.listSelector = payload;
      state.initialChanged = true;
    },
    decreaseQty: (state, { payload }) => {
      state.reciept.map((item) => {
        if (item.product_id === payload && item.quantity != "") {
          return (item.quantity = item.quantity.substring(
            0,
            item.quantity.length - 1
          ));
        } else if (item.quantity=="") {
          return (state.reciept = state.reciept.filter(
            (item) => item.product_id != payload
          )
          );
        } else {
          return state;
        }
      }
      
      );
    },
    removeItemFromList:(state,{payload})=>{
      state.reciept.map((item)=>{
        if(item.product_id === payload){
          return(
            state.reciept= state.reciept.filter((item)=> item.product_id !=payload)
          )
        }
      })
    },
    // for voucher list output which is already sent to API
    voucherUpdate: (state, { payload }) => {
      state.voucherData = payload;
    },
    // when click on calculator the qty update on voucher list
    qtyUpdate: (state, { payload }) => {
      state.reciept.map((ele) => {
        if (state.initialChanged && ele.product_id === payload.id) {
          return (
            (ele.quantity = payload.qty),
            (state.initialChanged = false),
            (state.totalPrice = totalAmount(state.reciept)),
            (state.tax = totalTax(state.reciept))
          );
        } else if (ele.product_id === payload.id) {
          return (
            (ele.quantity += payload.qty),
            (state.total = totalAmount(state.reciept)),
            (state.tax = totalTax(state.reciept))
          );
        } else {
          return ele;
        }
      });
    },
    // clear voucher list
    clearList: (state) => {
      state.reciept = [];
    },
    // sale close
    setSaleClose:(state,{payload})=>{
      state.saleClose = payload;
      try {
        Cookies.set("sale", JSON.stringify(payload));
      } catch (error) {
        console.error("Failed to set sale cookie:", error);
      }
    }
  },
});
export const {
  addtoReciept,
  qtyUpdate,
  decreaseQty,
  removeItemFromList,
  voucherUpdate,
  clearList,
  setListSelector,
  setSaleClose
} = recieptSlice.actions;
export default recieptSlice.reducer;
