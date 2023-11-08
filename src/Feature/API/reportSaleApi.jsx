import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportSaleApi = createApi({
  reducerPath: "reportSaleApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://b.mmsdev.site/api/v1` }),
  tagTypes: ["sale"],
  endpoints: (builder) => ({
    //report sale
    getTodaySaleReport: builder.query({
      query: (token) => ({
        url: `today-sale-overview`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["sale"],
    }),
    getWeeklySaleReport: builder.query({
      query: ({ token, type }) => ({
        url: `/sale-overview/${type}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["sale"],
    }),
    //report stock
    getStockOverview: builder.query({
      query: (token) => ({
        url: `/stock-overview`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["sale"],
    }),
    getStockOverviewList: builder.query({
      query: ({token,currentPage,search,orderBy,sort}) => ({
        url: `/stock-overview-lists?page=${currentPage}&search=${search}&orderBy=${orderBy}&sort=${sort}
        `,
        headers: { authorization: `Bearer ${token}` },
      }),
































      
      providesTags: ["sale"],
    }),
  }),
});
export const {
  useGetTodaySaleReportQuery,
  useGetWeeklySaleReportQuery,
  useGetStockOverviewQuery,
  useGetStockOverviewListQuery,
} = reportSaleApi;
