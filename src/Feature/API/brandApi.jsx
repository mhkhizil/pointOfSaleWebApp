import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://b.mmsdev.site/api/v1" }),
  tagTypes: ["brandApi"],
  endpoints: (builder) => ({
    createBrand:builder.mutation({
        query:({token,brandData})=>({
            url:`/brands`,
            method: "POST",
            body:brandData,
            headers: {
                authorization: `Bearer ${token}`,
              },
        }),
        invalidatesTags: ["brandApi"],
    }),
    getBrandInfo: builder.query({
        query: ({token,currentPage,search,orderBy,sort}) => ({
          url:`/brands?page=${currentPage}&search=${search}&orderBy=${orderBy}&sort=${sort}`,
          headers: {
            authorization: `Bearer ${token}`,
          },
          
        }),
        providesTags:['brandApi']
  
      }),
      deleteBrand:builder.mutation({
        query:({token,id})=>({
            url:`/brands/${id}`,
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`,
              },
        }),
        invalidatesTags: ["brandApi"],
    }),
    updateBrand:builder.mutation({
        query:({token,id,brandData})=>({
            url:`/brands/${id}`,
            method: "PATCH",
            body: brandData,
            headers: {
                authorization: `Bearer ${token}`,
              },
        }),
        invalidatesTags: ["brandApi"],
    }),
    getSingleBrandInfo:builder.query({
        query:({token,id})=>({
          url:`/brands/${id}`,
          headers: {
            authorization: `Bearer ${token}`,
          },
  
        })
      }),
  })
});
export const {useCreateBrandMutation,useGetBrandInfoQuery,useDeleteBrandMutation,useUpdateBrandMutation, useGetSingleBrandInfoQuery} = brandApi;