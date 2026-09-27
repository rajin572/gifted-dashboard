import { IMeta } from "./common.type";

export type LiveStreamStatus = "LIVE" | "ENDED";

export interface ILiveStreamHost {
  _id: string;
  name: string;
  location: string;
}

export interface ILiveStreamFeaturedItem {
  _id: string;
  title: string;
  condition: string;
  isFree: boolean;
}

export interface ILiveStreamWatchItem {
  _id: string;
  title: string;
  thumbnail: string;
  playbackUrl?: string;
  host: ILiveStreamHost;
  featuredItem: ILiveStreamFeaturedItem;
  viewers: number;
  startedAtLabel: string;
  status: LiveStreamStatus;
}

export interface IGetLiveStreamsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: ILiveStreamWatchItem[];
    meta: IMeta;
  };
}

export interface ICreateLiveStreamPayload {
  title: string;
  hostId: string;
  featuredItemId: string;
  playbackUrl: string;
}

export interface IUpdateLiveStreamPayload {
  title?: string;
  featuredItemId?: string;
  status?: LiveStreamStatus;
}
