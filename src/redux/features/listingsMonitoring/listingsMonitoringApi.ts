import {
  IGetListingsMonitoringResponse,
  IListingMonitoringItem,
  IUpdateListingPayload,
} from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

interface GetListingsMonitoringArgs {
  page?: number;
  limit?: number;
  searchParams?: string;
  status?: string;
  category?: string;
  spotlight?: boolean;
}

const listingsMonitoringApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getListingsMonitoringList: builder.query<IGetListingsMonitoringResponse, GetListingsMonitoringArgs>({
      query: ({ page, limit, searchParams, status, category, spotlight }) => ({
        url: "/admin/listings/monitoring",
        method: "GET",
        params: { page, limit, searchParams, status, category, spotlight },
      }),
      providesTags: [tagTypes.listingsMonitoring],
    }),
    getListingDetail: builder.query<{ success: boolean; data: IListingMonitoringItem }, string>({
      query: (id) => ({
        url: `/admin/listings/monitoring/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.listingsMonitoring],
    }),
    updateListing: builder.mutation<unknown, { params: { id: string }; body: IUpdateListingPayload }>({
      query: (req) => ({
        url: `/admin/listings/${req.params.id}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.listingsMonitoring],
    }),
    deleteListing: builder.mutation<unknown, { params: { id: string } }>({
      query: (req) => ({
        url: `/admin/listings/${req.params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.listingsMonitoring],
    }),
    toggleSpotlight: builder.mutation<unknown, { params: { id: string }; body: { spotlight: boolean } }>({
      query: (req) => ({
        url: `/admin/listings/${req.params.id}/spotlight`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.listingsMonitoring],
    }),
  }),
});

export const {
  useGetListingsMonitoringListQuery,
  useGetListingDetailQuery,
  useUpdateListingMutation,
  useDeleteListingMutation,
  useToggleSpotlightMutation,
} = listingsMonitoringApi;

export default listingsMonitoringApi;
