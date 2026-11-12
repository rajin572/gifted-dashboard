import {
  IGetUserInspectionResponse,
  IGetUserSupervisionResponse,
  IIssueWarningPayload,
  ISuspendUserPayload,
} from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetUserSupervisionArgs {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: string;
  status?: string;
}

const userMonitoringApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserSupervisionList: builder.query<IGetUserSupervisionResponse, GetUserSupervisionArgs>({
      query: (params) => ({
        url: "/admin/users/supervision",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.userMonitoring, tagTypes.user],
    }),
    getUserInspection: builder.query<IGetUserInspectionResponse, string>({
      query: (id) => ({
        url: `/admin/users/${id}/inspect`,
        method: "GET",
      }),
      providesTags: [tagTypes.userMonitoring, tagTypes.user],
    }),
    toggleBlockUser: builder.mutation<
      { success: boolean; message: string; data?: unknown },
      string | { params: { id: string } }
    >({
      query: (arg) => {
        const userId = typeof arg === "string" ? arg : arg.params.id;
        return {
          url: `/admin/users/${userId}/block-status`,
          method: "PATCH",
        };
      },
      invalidatesTags: [tagTypes.userMonitoring, tagTypes.user],
    }),
    deleteUser: builder.mutation<
      { success: boolean; message: string; data?: unknown },
      string | { params: { id: string } }
    >({
      query: (arg) => {
        const id = typeof arg === "string" ? arg : arg.params.id;
        return {
          url: `/admin/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.userMonitoring, tagTypes.user],
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
  useGetUserSupervisionListQuery,
  useGetUserInspectionQuery,
  useToggleBlockUserMutation,
  useDeleteUserMutation,
  useIssueWarningMutation,
  useSuspendUserMutation,
  useRevokeVerificationMutation,
} = userMonitoringApi;

export default userMonitoringApi;
