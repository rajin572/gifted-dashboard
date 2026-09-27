import {
  IGetRevenueOverviewResponse,
  IGetGatewaySettlementsResponse,
} from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetSettlementsArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  provider?: string;
  status?: string;
}

const revenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevenueOverview: builder.query<IGetRevenueOverviewResponse, { timeframe?: string }>({
      query: (params) => ({
        url: "/admin/revenue/overview",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.revenue],
    }),
    getGatewaySettlements: builder.query<IGetGatewaySettlementsResponse, GetSettlementsArgs>({
      query: (params) => ({
        url: "/admin/revenue/settlements",
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
  useGetRevenueOverviewQuery,
  useGetGatewaySettlementsQuery,
  useExportRevenueStatementMutation,
} = revenueApi;
export default revenueApi;
