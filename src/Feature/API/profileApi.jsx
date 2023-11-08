import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://b.mmsdev.site/api/v1" }),
  tagTypes: ["profileApi"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (token) => ({
        url: `/profile`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["profileApi"],
    }),
    updateProfile: builder.mutation({
      query: ({ token, updateProfileData }) => ({
        url: `/profile`,
        method: "PATCH",
        body:  updateProfileData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["profileApi"],
    }),    
  }),
});

export const {
  useGetProfileQuery, useUpdateProfileMutation
} = profileApi;
