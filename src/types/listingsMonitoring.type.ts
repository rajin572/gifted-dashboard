import { IMeta } from "./common.type";

export type ListingItemStatus = "AVAILABLE" | "CLAIMED";

export interface IListingMonitoringItem {
  _id: string;
  listingCode?: string;
  title: string;
  image: string;
  pickupType: string;
  timeRemaining: string;
  category: string;
  condition: string;
  donorName: string;
  isDonorVerified: boolean;
  location: string;
  storiesCount: number;
  status: ListingItemStatus;
  spotlight: boolean;
  neighborhood?: string;
}

export interface IGetListingsMonitoringResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: IListingMonitoringItem[];
    meta: IMeta;
  };
}

export interface IUpdateListingPayload {
  title?: string;
  status?: ListingItemStatus;
  category?: string;
  neighborhood?: string;
  spotlight?: boolean;
}
