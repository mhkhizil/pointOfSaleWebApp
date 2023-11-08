import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getallProductsApi=createApi({
    reducerPath:"getallProductApi",
    baseQuery:fetchBaseQuery({
        baseUrl:'https://b.mmsdev.site/api/v1',
    }),
    tagTypes:["getallProductApi"],
    endpoints:(builder)=>({
        getallProducts:builder.query({
            query:(token)=>({
                url:"products",
                headers:{authorization:`Bearer ${token}`},
            }),
            providesTags:['getallProductApi']
        }),
      
    })
});

export const{useGetallProductsQuery}=getallProductsApi;