import { ILiveStreamWatchItem } from "@/types";

export const LIVE_STREAM_WATCH_DESIGN_DATA: ILiveStreamWatchItem[] = [
  {
    _id: "stream-301",
    title: "Weekly Tech & Tools Gifting Circle",
    thumbnail:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&auto=format&fit=crop&q=85",
    host: {
      _id: "host-501",
      name: "Austin Community Makers",
      location: "Austin Makerspace Studio",
    },
    featuredItem: {
      _id: "gift-ipad-pro",
      title: 'iPad Pro 11” + Apple Pencil (for creative students)',
      condition: "Like New",
      isFree: true,
    },
    viewers: 248,
    startedAtLabel: "15 mins ago",
    status: "LIVE",
  },
  {
    _id: "stream-302",
    title: "Spring Baby & Nursery Cleanout Gifting",
    thumbnail:
      "https://images.unsplash.com/photo-1615874694520-474822394e73?w=1200&auto=format&fit=crop&q=85",
    host: {
      _id: "host-502",
      name: "Mueller Parents Collective",
      location: "Mueller, Austin, TX",
    },
    featuredItem: {
      _id: "gift-high-chair",
      title: "Ergonomic Wooden High Chair + Feeding Set",
      condition: "Gently Used",
      isFree: true,
    },
    viewers: 112,
    startedAtLabel: "32 mins ago",
    status: "LIVE",
  },
];
