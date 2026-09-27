import {
  IGetSafetyReportsOverviewResponse,
  IGetSafetyReportsListResponse,
} from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetSafetyReportsArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  status?: string;
  category?: string;
}

const safetyReportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSafetyOverview: builder.query<IGetSafetyReportsOverviewResponse, void>({
      query: () => ({
        url: "/admin/safety-reports/overview",
        method: "GET",
      }),
      providesTags: [tagTypes.safetyReports],
    }),
    getSafetyReportsList: builder.query<IGetSafetyReportsListResponse, GetSafetyReportsArgs>({
      query: (params) => ({
        url: "/admin/safety-reports",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.safetyReports],
    }),
    resolveReport: builder.mutation<
      { success: boolean; message: string },
      { reportId: string; action: string; note: string; restoreItem?: boolean; notifyParties?: boolean }
    >({
      query: ({ reportId, ...body }) => ({
        url: `/admin/safety-reports/${reportId}/resolve`,
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.safetyReports],
    }),
    dismissReport: builder.mutation<
      { success: boolean; message: string },
      { reportId: string; reason?: string }
    >({
      query: ({ reportId, ...body }) => ({
        url: `/admin/safety-reports/${reportId}/dismiss`,
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.safetyReports],
    }),
  }),
});

export const {
  useGetSafetyOverviewQuery,
  useGetSafetyReportsListQuery,
  useResolveReportMutation,
  useDismissReportMutation,
} = safetyReportsApi;
export default safetyReportsApi;
