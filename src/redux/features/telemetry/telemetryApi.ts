import { IGetTelemetryOverviewResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const telemetryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTelemetryOverview: builder.query<IGetTelemetryOverviewResponse, void>({
      query: () => ({
        url: "/admin/telemetry/overview",
        method: "GET",
      }),
      providesTags: [tagTypes.telemetry],
    }),
    exportTelemetryAudit: builder.mutation<unknown, void>({
      query: () => ({
        url: "/admin/telemetry/export-audit",
        method: "POST",
      }),
    }),
    downloadTelemetryReport: builder.mutation<unknown, void>({
      query: () => ({
        url: "/admin/telemetry/download-report",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetTelemetryOverviewQuery,
  useExportTelemetryAuditMutation,
  useDownloadTelemetryReportMutation,
} = telemetryApi;

export default telemetryApi;
