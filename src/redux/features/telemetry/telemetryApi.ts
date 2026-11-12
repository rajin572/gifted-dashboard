import { IGetTelemetryOverviewResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const telemetryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTelemetryOverview: builder.query<IGetTelemetryOverviewResponse, void>({
      query: () => ({
        url: "/admin/dashboard/telemetry",
        method: "GET",
      }),
      providesTags: [tagTypes.telemetry, tagTypes.dashboard],
    }),
  }),
});

export const { useGetTelemetryOverviewQuery } = telemetryApi;
export default telemetryApi;
