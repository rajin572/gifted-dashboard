import { IGetRevenueAnalyticsResponse, IRevenueAnalyticsArgs } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const revenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevenueAnalytics: builder.query<IGetRevenueAnalyticsResponse, IRevenueAnalyticsArgs>({
      query: (params) => ({
        url: "/admin/revenue/analytics",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.revenue],
    }),
    exportRevenueStatement: builder.mutation<
      { success: boolean; message: string; downloadUrl?: string },
      { format: string; timeframe: string }
    >({
      query: (body) => ({
        url: "/admin/revenue/export-statement",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetRevenueAnalyticsQuery,
  useExportRevenueStatementMutation,
} = revenueApi;

export default revenueApi;
