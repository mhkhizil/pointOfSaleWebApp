import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://b.mmsdev.site/api/v1", }),
  tagTypes: ["userApi"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ currentPage, token,search,orderBy,sort }) => ({
        url: `/users?page=${currentPage}&search=${search}&orderBy=${orderBy}&sort=${sort}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["userApi"],
    }),
    createUser: builder.mutation({
      query: ({ token, userData }) => ({
        url: "/register",
        method: "POST",
        body: userData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["userApi"],
    }),
    getSingleUser: builder.query({
      query: ({ token, id }) => ({
        url: `/users/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["userApi"],
    }),
    updateUser: builder.mutation({
      query: ({ token, id, updateUserData }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: updateUserData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["userApi"],
    }),
    deleteUser: builder.mutation({
      query: ({ token, id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["userApi"],
    }),
    bannedUser: builder.query({
      query:({currentPage,token,search,orderBy,sort})=>({
        url:  `/ban-users?page=${currentPage}&search=${search}&orderBy=${orderBy}&sort=${sort}`,
        headers:{
          authorization: `Bearer ${token}`,
        }
      }),
      providesTags:["userApi"]
    }),
    banSingleUser:builder.mutation({
      query:({token,id,banUserData})=>({
        url:`users/${id}/ban`,
        method:"PATCH",
        body:banUserData,
        headers:{
          authorization:`Bearer ${token}`,
        },
      }),
      invalidatesTags:["userApi"],
    }),
    retoreSingleUser:builder.mutation({
      query:({token,id,restoreUserData})=>({
        url:`/users/${id}/restore`,
        method:"PATCH",
        body:restoreUserData,
        headers:{
          authorization:`Bearer ${token}`
        },
      }),
      invalidatesTags:["userApi"]
    }),
    
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useGetSingleUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useBannedUserQuery,
  useBanSingleUserMutation,
  useRetoreSingleUserMutation
} = userApi;
