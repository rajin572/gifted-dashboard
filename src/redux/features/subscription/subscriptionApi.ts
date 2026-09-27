import {
  IGetSubscriptionOverviewResponse,
  IGetSubscribersResponse,
  IMembershipPlan,
} from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetSubscribersArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  tier?: string;
  status?: string;
}

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionOverview: builder.query<IGetSubscriptionOverviewResponse, void>({
      query: () => ({
        url: "/admin/subscription/overview",
        method: "GET",
      }),
      providesTags: [tagTypes.subscription],
    }),
    getSubscribersList: builder.query<IGetSubscribersResponse, GetSubscribersArgs>({
      query: (params) => ({
        url: "/admin/subscription/subscribers",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.subscription],
    }),
    updatePlanTiers: builder.mutation<
      { success: boolean; message: string },
      { plans: IMembershipPlan[] }
    >({
      query: (body) => ({
        url: "/admin/subscription/plans",
        method: "PUT",
        body,
      }),
      invalidatesTags: [tagTypes.subscription],
    }),
    adjustSubscriberTier: builder.mutation<
      { success: boolean; message: string },
      { subscriberId: string; tier: string; compMonths?: number; reason?: string }
    >({
      query: ({ subscriberId, ...body }) => ({
        url: `/admin/subscription/subscribers/${subscriberId}/adjust`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [tagTypes.subscription],
    }),
  }),
});

export const {
  useGetSubscriptionOverviewQuery,
  useGetSubscribersListQuery,
  useUpdatePlanTiersMutation,
  useAdjustSubscriberTierMutation,
} = subscriptionApi;
export default subscriptionApi;
