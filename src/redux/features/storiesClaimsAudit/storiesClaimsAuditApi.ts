import {
  ICreateStoryClaimPayload,
  IGetStoriesClaimsAuditResponse,
  IStoryClaimsAuditItem,
  IUpdateStoryClaimPayload,
} from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

interface GetStoriesClaimsAuditArgs {
  page?: number;
  limit?: number;
  status?: string;
}

const storiesClaimsAuditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStoriesClaimsAudit: builder.query<
      IGetStoriesClaimsAuditResponse,
      GetStoriesClaimsAuditArgs
    >({
      query: ({ page, limit, status }) => ({
        url: "/admin/stories-claims",
        method: "GET",
        params: { page, limit, status },
      }),
      providesTags: [tagTypes.storiesClaimsAudit],
    }),
    getStoryClaimAuditDetail: builder.query<
      { success: boolean; data: IStoryClaimsAuditItem },
      string
    >({
      query: (id) => ({
        url: `/admin/stories-claims/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.storiesClaimsAudit],
    }),
    createStoryClaim: builder.mutation<
      { success: boolean; data: IStoryClaimsAuditItem },
      { body: ICreateStoryClaimPayload }
    >({
      query: (req) => ({
        url: "/admin/stories-claims",
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.storiesClaimsAudit],
    }),
    updateStoryClaimStatus: builder.mutation<
      { success: boolean; data: IStoryClaimsAuditItem },
      { params: { id: string }; body: IUpdateStoryClaimPayload }
    >({
      query: (req) => ({
        url: `/admin/stories-claims/${req.params.id}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.storiesClaimsAudit],
    }),
    deleteStoryClaim: builder.mutation<
      { success: boolean },
      { params: { id: string } }
    >({
      query: (req) => ({
        url: `/admin/stories-claims/${req.params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.storiesClaimsAudit],
    }),
  }),
});

export const {
  useGetStoriesClaimsAuditQuery,
  useGetStoryClaimAuditDetailQuery,
  useCreateStoryClaimMutation,
  useUpdateStoryClaimStatusMutation,
  useDeleteStoryClaimMutation,
} = storiesClaimsAuditApi;

export default storiesClaimsAuditApi;
