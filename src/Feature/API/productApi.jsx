import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://b.mmsdev.site/api/v1" }),
  tagTypes: ["productApi"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: ({ token, productData }) => ({
        url: "/products",
        method: "POST",
        body: productData,
        headers: {
          authorization: `Bearer ${token}`,
        },
       
      }),
      invalidatesTags: ["productApi"],
    }),
    getProductInfo: builder.query({
      query: ({token,currentPage,search,orderBy,sort}) => ({
        url:`/products?page=${currentPage}&search=${search}&orderBy=${orderBy}&sort=${sort}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        
      }),
      providesTags:['productApi']

    }),
    deleteProducts:builder.mutation({
      query:({id,token})=>({
       
        url: `products/${id}`,
        method:"DELETE",
       
        headers:{authorization:`Bearer ${token}`}
      }),
      invalidatesTags:['productApi']
     
    }),
    updateProduct: builder.mutation({
      query: ({ token, id, productData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: productData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["productApi"],
    }),
    getSingleProductInfo:builder.query({
      query:({token,id})=>({
        url:`/products/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },

      })
    }),
    getStockHistoryInfo:builder.query({
      query:({token,id})=>({
        url:`/stock-history/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },

      })
    }),
    getSaleHistoryInfo:builder.query({
      query:({token,id})=>({
        url:`/sale-history/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },

      })
    }),
    //for stock adding
    addingStockQuantity:builder.mutation({
      query:({token,productData}) => ({
        url: `/stocks`,
        method: "POST",
        body: productData,
        headers: {
          authorization: `Bearer ${token}`,
        },
        invalidatesTags: ["productApi"],
      }),
    })

  }),
});

export const { useCreateProductMutation ,useGetProductInfoQuery,useGetSingleProductInfoQuery,useDeleteProductsMutation,useUpdateProductMutation,useAddingStockQuantityMutation,useGetStockHistoryInfoQuery,useGetSaleHistoryInfoQuery} = productApi;
