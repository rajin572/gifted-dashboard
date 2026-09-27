import {
  ICreateLiveStreamPayload,
  IGetLiveStreamsResponse,
  ILiveStreamWatchItem,
  IUpdateLiveStreamPayload,
} from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

interface GetLiveStreamsArgs {
  page?: number;
  limit?: number;
  status?: string;
}

const liveStreamWatchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLiveStreams: builder.query<IGetLiveStreamsResponse, GetLiveStreamsArgs>({
      query: ({ page, limit, status }) => ({
        url: "/admin/live-streams",
        method: "GET",
        params: { page, limit, status },
      }),
      providesTags: [tagTypes.liveStreamWatch],
    }),
    getLiveStreamDetail: builder.query<
      { success: boolean; data: ILiveStreamWatchItem },
      string
    >({
      query: (id) => ({
        url: `/admin/live-streams/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.liveStreamWatch],
    }),
    createLiveStream: builder.mutation<
      { success: boolean; data: ILiveStreamWatchItem },
      { body: ICreateLiveStreamPayload }
    >({
      query: (req) => ({
        url: "/admin/live-streams",
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.liveStreamWatch],
    }),
    updateLiveStream: builder.mutation<
      { success: boolean; data: ILiveStreamWatchItem },
      { params: { id: string }; body: IUpdateLiveStreamPayload }
    >({
      query: (req) => ({
        url: `/admin/live-streams/${req.params.id}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.liveStreamWatch],
    }),
    terminateLiveStream: builder.mutation<
      { success: boolean },
      { params: { id: string } }
    >({
      query: (req) => ({
        url: `/admin/live-streams/${req.params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.liveStreamWatch],
    }),
  }),
});

export const {
  useGetLiveStreamsQuery,
  useGetLiveStreamDetailQuery,
  useCreateLiveStreamMutation,
  useUpdateLiveStreamMutation,
  useTerminateLiveStreamMutation,
} = liveStreamWatchApi;

export default liveStreamWatchApi;
