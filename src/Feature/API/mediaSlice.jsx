// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// // import Cookies from 'js-cookie';

// // Get the token from the cookie
// // const token = Cookies.get('token');


// export const api = createApi({
//   reducerPath:'mediaSlice',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://b.mmsdev.site/api/v1' }), 
  
//   tagTypes:["mediaSlice"],
//   endpoints: (builder) => ({
//     getMedia: builder.query({
//       query: (token) => ({
//         url:'/media',
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
        
//       }),
//       providesTags:['mediaSlice']

//     }),
//     uploadMedia: builder.mutation({
//       query: ({photos,token}) => ({
//         url: 'media', // The endpoint for uploading media
//         method: 'POST',
//         body: photos, 
//         headers:{authorization:`Bearer ${token}`}// The file data you want to upload
      
//       }),
//       invalidatesTags:["mediaSlice"]
//     }),
//   deleteMedia:builder.mutation({
//     query:({id,token})=>({
     
//       url: `media/${id}`,
//       method:"DELETE",
     
//       headers:{authorization:`Bearer ${token}`}
//     }),
//     invalidatesTags:['mediaSlice']
   
//   }),

    
//   }),
// });

// export const { useDeleteMediaMutation, useGetMediaQuery, useUploadMediaMutation  } = api;