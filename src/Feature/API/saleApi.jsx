import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const saleApi=createApi({
    reducerPath:"saleApi",
    baseQuery:fetchBaseQuery({baseUrl:`https://b.mmsdev.site/api/v1`}),
    tagTypes:["sale"],
    endpoints:(builder)=>({
        recordedVoucher:builder.query({
            query:({token,currentPage})=>({
                url:`/recent?page=${currentPage}`,
                headers:{authorization:`Bearer ${token}`}
            }),
            providesTags:['sale'],
        }),
        checkout:builder.mutation({
            query:({token,newVoucherData})=>({
                url:"/checkout",
                method:"POST",
                body:newVoucherData,
                headers:{authorization:`Bearer ${token}`}
            }),
            invalidatesTags:["sale"]
        }),
        saleClose:builder.mutation({
            query:(token)=>({
                url:`/sale-close`,
                method:"POST",
                headers :{authorization: `Bearer ${token}`},
            }),
            invalidatesTags:["sale"]
        }),
        saleOpen:builder.mutation({
            query:(token)=>({
                url:`/sale-open`,
                method:"POST",
                headers:{authorization: `Bearer ${token}`},
            }),
            invalidatesTags:["sale"]
        })
    }),

});
export const {useRecordedVoucherQuery,useCheckoutMutation,useSaleOpenMutation,useSaleCloseMutation}=saleApi;