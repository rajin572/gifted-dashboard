import {
  IGetUserMonitoringDetailResponse,
  IGetUserMonitoringResponse,
  IIssueWarningPayload,
  ISuspendUserPayload,
} from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetUserMonitoringArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  role?: string;
  status?: string;
}

const userMonitoringApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMonitoringList: builder.query<IGetUserMonitoringResponse, GetUserMonitoringArgs>({
      query: ({ page, limit, searchParams, role, status }) => ({
        url: "/admin/users/monitoring",
        method: "GET",
        params: { page, limit, searchParams, role, status },
      }),
      providesTags: [tagTypes.userMonitoring],
    }),
    getUserMonitoringDetail: builder.query<IGetUserMonitoringDetailResponse, string>({
      query: (id) => ({
        url: `/admin/users/monitoring/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.userMonitoring],
    }),
    issueWarning: builder.mutation<unknown, { params: { id: string }; body: IIssueWarningPayload }>({
      query: (req) => ({
        url: `/admin/users/${req.params.id}/warning`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.userMonitoring],
    }),
    suspendUser: builder.mutation<unknown, { params: { id: string }; body?: ISuspendUserPayload }>({
      query: (req) => ({
        url: `/admin/users/${req.params.id}/suspend`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.userMonitoring],
    }),
    revokeVerification: builder.mutation<unknown, { params: { id: string } }>({
      query: (req) => ({
        url: `/admin/users/${req.params.id}/revoke-verification`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.userMonitoring],
    }),
  }),
});

export const {
  useGetUserMonitoringListQuery,
  useGetUserMonitoringDetailQuery,
  useIssueWarningMutation,
  useSuspendUserMutation,
  useRevokeVerificationMutation,
} = userMonitoringApi;

export default userMonitoringApi;
