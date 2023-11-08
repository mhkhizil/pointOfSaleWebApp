import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getFinancedataApi = createApi({
  reducerPath: "getFinancedataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://b.mmsdev.site/api/v1" }),
  tagTypes: ["getFinancedataApi"],
  endpoints: (builder) => ({
    getDailyFinanceInfo: builder.query({
      query: ({ token, currentPage, date }) => ({
        url: `daily-records?date=${date}&page=${currentPage}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["getFinancedataApi"],
    }),
    getMonthlyFinanceInfo: builder.query({
      query: ({ token, currentPage, month, year }) => ({
        url: `monthly-records?year=${year}&month=${month}&page=${currentPage}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["getFinancedataApi"],
    }),
    getYearlyFinanceInfo: builder.query({
      query: ({ token, currentPage, year }) => ({
        url: `yearly-records?year=${year}&page=${currentPage}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["getFinancedataApi"],
    }),
    getCustomFinanceInfo: builder.query({
      query: ({ token, startDate, endDate,currentPage }) => ({
        url: `custom?start=${startDate}&end=${endDate}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["getFinancedataApi"],
    }),
  }),
});

export const {
  useGetDailyFinanceInfoQuery,
  useGetMonthlyFinanceInfoQuery,
  useGetYearlyFinanceInfoQuery,
  useGetCustomFinanceInfoQuery,

} = getFinancedataApi;
