import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi=createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({ baseUrl: 'https://b.mmsdev.site/api/v1' }),
    tagTypes:["authApi"],
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(user)=>({
                url:"/login",
                method:"POST",
                body:user
            }),
            invalidatesTags:["authApi"]
        }),
        logout:builder.mutation({
            query:(token)=>({
                url:"/logout",
                method:"POST",
                headers:{authorization:`Bearer ${token}`}
            }),
            invalidatesTags:["authApi"]
        })
    })
})

export const {useLoginMutation, useLogoutMutation}=authApi;