import { useState } from "react";
import { CheckCircle2, MapPin, MessageSquare, Star, Pencil, Trash2 } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import { Button } from "@/Components/ui/button";
import EditListingModal from "@/Components/Dashboard/ListingsMonitoring/EditListingModal";
import { IListingMonitoringItem } from "@/types";
// import {
//   useGetListingsMonitoringListQuery,
//   useDeleteListingMutation,
//   useToggleSpotlightMutation,
// } from "@/redux/features/listingsMonitoring/listingsMonitoringApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: wire to useGetListingsMonitoringListQuery once the endpoint exists.
const DUMMY_LISTINGS: IListingMonitoringItem[] = [
  {
    _id: "lst-101",
    title: "Vintage Herman Miller Office Chair",
    image: "https://images.unsplash.com/photo-1580481077195-c22ae224b7a1?w=150&auto=format&fit=crop&q=80",
    pickupType: "Flexible",
    timeRemaining: "48h remaining",
    category: "Furniture",
    condition: "Gently Used",
    donorName: "Sarah Jenkins",
    isDonorVerified: true,
    location: "South Congress",
    neighborhood: "South Congress, Austin TX",
    storiesCount: 6,
    status: "AVAILABLE",
    spotlight: true,
  },
  {
    _id: "lst-102",
    title: "Organic Baby Clothes Bundle (0-6m)",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=150&auto=format&fit=crop&q=80",
    pickupType: "Porch Pickup",
    timeRemaining: "Claimed 1h ago",
    category: "Baby & Kids",
    condition: "Like New",
    donorName: "Marcus Chen",
    isDonorVerified: true,
    location: "East Austin",
    neighborhood: "East Austin, TX",
    storiesCount: 12,
    status: "CLAIMED",
    spotlight: false,
  },
  {
    _id: "lst-103",
    title: "Stand Mixer & Baking Accessories",
    image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=150&auto=format&fit=crop&q=80",
    pickupType: "Direct Hand-off",
    timeRemaining: "24h remaining",
    category: "Kitchen & Dining",
    condition: "Like New",
    donorName: "Elena Rostova",
    isDonorVerified: true,
    location: "Hyde Park",
    neighborhood: "Hyde Park, Austin TX",
    storiesCount: 4,
    status: "AVAILABLE",
    spotlight: true,
  },
  {
    _id: "lst-104",
    title: "Sonos One Gen 2 Smart Speaker",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=150&auto=format&fit=crop&q=80",
    pickupType: "Flexible",
    timeRemaining: "72h remaining",
    category: "Electronics",
    condition: "Brand New in Box",
    donorName: "David Kim",
    isDonorVerified: false,
    location: "Downtown",
    neighborhood: "Downtown Austin, TX",
    storiesCount: 9,
    status: "AVAILABLE",
    spotlight: false,
  },
  {
    _id: "lst-105",
    title: "DeWalt Cordless Drill Kit 20V",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=150&auto=format&fit=crop&q=80",
    pickupType: "Porch Pickup",
    timeRemaining: "36h remaining",
    category: "Tools & Garden",
    condition: "Gently Used",
    donorName: "Jessica Taylor",
    isDonorVerified: true,
    location: "Mueller",
    neighborhood: "Mueller, Austin TX",
    storiesCount: 3,
    status: "AVAILABLE",
    spotlight: false,
  },
  {
    _id: "lst-106",
    title: "Acoustic Beginner Guitar with Gig Bag",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=150&auto=format&fit=crop&q=80",
    pickupType: "Flexible",
    timeRemaining: "12h remaining",
    category: "Musical Instruments",
    condition: "Good Condition",
    donorName: "Liam O'Connor",
    isDonorVerified: true,
    location: "Barton Hills",
    neighborhood: "Barton Hills, Austin TX",
    storiesCount: 8,
    status: "AVAILABLE",
    spotlight: true,
  },
  {
    _id: "lst-107",
    title: "Wooden Toddler Balance Bike",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=150&auto=format&fit=crop&q=80",
    pickupType: "Porch Pickup",
    timeRemaining: "54h remaining",
    category: "Baby & Kids",
    condition: "Gently Used",
    donorName: "Chloe Bennett",
    isDonorVerified: false,
    location: "Zilker",
    neighborhood: "Zilker, Austin TX",
    storiesCount: 5,
    status: "AVAILABLE",
    spotlight: false,
  },
];

const CATEGORY_OPTIONS: FilterOption[] = [
  { label: "All Categories", value: "all" },
  { label: "Furniture", value: "Furniture" },
  { label: "Baby & Kids", value: "Baby & Kids" },
  { label: "Kitchen & Dining", value: "Kitchen & Dining" },
  { label: "Electronics", value: "Electronics" },
  { label: "Tools & Garden", value: "Tools & Garden" },
  { label: "Musical Instruments", value: "Musical Instruments" },
];

type TabType = "all" | "available" | "claimed" | "spotlight";

const ListingsMonitoringPage = () => {
  const [, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [selectedListing, setSelectedListing] = useState<IListingMonitoringItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // const { data, isFetching } = useGetListingsMonitoringListQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     searchParams: search.length > 0 ? search : undefined,
  //     category: categoryFilter === "all" ? undefined : categoryFilter,
  //     status: activeTab === "available" ? "AVAILABLE" : activeTab === "claimed" ? "CLAIMED" : undefined,
  //     spotlight: activeTab === "spotlight" ? true : undefined,
  //   },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const listings = data?.data?.data ?? DUMMY_LISTINGS;
  // const total = data?.data?.meta?.total ?? DUMMY_LISTINGS.length;
  const listings = DUMMY_LISTINGS;
  const total = DUMMY_LISTINGS.length;

  const availableCount = listings.filter((item) => item.status === "AVAILABLE").length;
  const claimedCount = listings.filter((item) => item.status === "CLAIMED").length;
  const spotlightCount = listings.filter((item) => item.spotlight).length;

  // const [deleteListing] = useDeleteListingMutation();
  const handleConfirmDelete = async () => {
    // if (!selectedListing) return;
    // const res = await tryCatchWrapper(
    //   deleteListing,
    //   { params: { id: selectedListing._id } },
    //   { toastLoadingMessage: "Taking down listing..." }
    // );
    // if (res?.success) {
    //   setIsDeleteConfirmOpen(false);
    // }
    setIsDeleteConfirmOpen(false);
  };

  // const [toggleSpotlight] = useToggleSpotlightMutation();
  const handleToggleSpotlight = async (_listing: IListingMonitoringItem) => {
    // const res = await tryCatchWrapper(
    //   toggleSpotlight,
    //   { params: { id: _listing._id }, body: { spotlight: !_listing.spotlight } },
    //   { toastLoadingMessage: "Updating spotlight status..." }
    // );
  };

  const columns: Column<IListingMonitoringItem>[] = [
    {
      header: "ITEM DETAILS",
      accessorKey: "title",
      render: (_, row) => (
        <div className="flex items-center gap-3.5">
          <img
            src={row.image}
            alt={row.title}
            className="size-12 rounded-xl object-cover border border-border bg-gray-50 shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/dummyCover.jpg";
            }}
          />
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 leading-snug truncate">
              {row.title}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              Pickup: {row.pickupType} • {row.timeRemaining}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "CATEGORY & CONDITION",
      accessorKey: "category",
      render: (_, row) => (
        <div>
          <span className="text-xs font-semibold text-gray-800">{row.category}</span>
          <p className="text-xs text-gray-500 mt-0.5">{row.condition}</p>
        </div>
      ),
    },
    {
      header: "DONOR & LOCATION",
      accessorKey: "donorName",
      render: (_, row) => (
        <div>
          <div className="flex items-center gap-1 font-semibold text-gray-800 text-xs">
            <span>{row.donorName}</span>
            {row.isDonorVerified && (
              <CheckCircle2 className="size-4 text-primary-color fill-[#FF5C5C] shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <MapPin className="size-3 text-[#FF5C5C] shrink-0" />
            <span>{row.location}</span>
          </div>
        </div>
      ),
    },
    {
      header: "STORIES",
      accessorKey: "storiesCount",
      render: (_, row) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-border text-gray-700 bg-gray-50">
          <MessageSquare className="size-3 text-gray-500" />
          <span>{row.storiesCount} Stories</span>
        </span>
      ),
    },
    {
      header: "STATUS",
      accessorKey: "status",
      render: (_, row) => {
        const isClaimed = row.status === "CLAIMED";
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${isClaimed
              ? "border-amber-300 text-amber-600 bg-amber-50/70"
              : "border-emerald-300 text-emerald-600 bg-emerald-50/70"
              }`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: "SPOTLIGHT",
      accessorKey: "spotlight",
      render: (_, row) => (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleToggleSpotlight(row)}
          title={row.spotlight ? "Featured on Home Feed" : "Click to Spotlight"}
          className="size-7 p-0 rounded-lg hover:bg-amber-50"
        >
          {row.spotlight ? (
            <Star className="size-4 fill-amber-400 text-amber-400" />
          ) : (
            <Star className="size-4 text-gray-300 hover:text-amber-400 transition-colors" />
          )}
        </Button>
      ),
    },
    {
      header: "AUDIT ACTIONS",
      accessorKey: "_id",
      render: (_, row) => (
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedListing(row);
              setIsEditOpen(true);
            }}
            className="h-7 px-2.5 text-xs font-medium border-border text-gray-700 bg-white hover:bg-gray-50 rounded-lg shadow-2xs gap-1"
          >
            <Pencil className="size-3 text-gray-500" />
            <span>Edit</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedListing(row);
              setIsDeleteConfirmOpen(true);
            }}
            title="Take Down Listing"
            className="size-7 p-0 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageWraper
      title={
        <div className="flex items-center gap-2.5">
          <span>Neighbor Listings Monitoring</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-border text-gray-500 bg-gray-50">
            {total} Total Monitored Listings
          </span>
        </div>
      }
      description="Austin peer gift listings, applicant stories, zero-resale status, and broadcast ties."
    >
      <div className="flex flex-col gap-4">
        {/* Top Controls: Search and Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-border shadow-2xs">
          <ReuseSearchInput
            placeholder="Search listings by item title, donor, neighborhood..."
            setSearch={setSearch}
            setPage={setCurrentPage}
            className="w-full sm:w-96"
          />

          <div className="flex items-center gap-2.5">
            <ReuseFilterSelect
              options={CATEGORY_OPTIONS}
              value={categoryFilter}
              onChange={setCategoryFilter}
              placeholder="All Categories"
            />
          </div>
        </div>

        {/* Tab Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${activeTab === "all"
              ? "bg-[#ff4c05] text-white shadow-2xs"
              : "bg-white border border-border text-gray-700 hover:bg-gray-50"
              }`}
          >
            All ({total})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("available")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${activeTab === "available"
              ? "bg-[#ff4c05] text-white shadow-2xs"
              : "bg-white border border-border text-gray-700 hover:bg-gray-50"
              }`}
          >
            Available ({availableCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("claimed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${activeTab === "claimed"
              ? "bg-[#ff4c05] text-white shadow-2xs"
              : "bg-white border border-border text-gray-700 hover:bg-gray-50"
              }`}
          >
            Claimed ({claimedCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("spotlight")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${activeTab === "spotlight"
              ? "bg-[#ff4c05] text-white shadow-2xs"
              : "bg-white border border-border text-gray-700 hover:bg-gray-50"
              }`}
          >
            <Star className={`size-3.5 ${activeTab === "spotlight" ? "fill-white text-white" : "fill-amber-400 text-amber-400"}`} />
            <span>Spotlight ({spotlightCount})</span>
          </button>
        </div>

        {/* Monitored Listings Table */}
        <div className="bg-white rounded-xl border border-border shadow-2xs overflow-hidden">
          <ReusableTable
            data={listings}
            columns={columns}
            pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit}
            total={total}
          />
        </div>
      </div>

      {/* Edit Listing Modal */}
      <EditListingModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        listing={selectedListing}
      />

      {/* Delete / Takedown Confirmation Modal */}
      <ConfirmModal<IListingMonitoringItem>
        open={isDeleteConfirmOpen}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        currentRecord={selectedListing}
        onConfirm={handleConfirmDelete}
        title="Take Down Listing"
        description={`Are you sure you want to remove "${selectedListing?.title}" from the platform? It will no longer be visible to neighbors.`}
        confirmText="Take Down"
        cancelText="Cancel"
        variant="danger"
        iconPreset="delete"
      />
    </PageWraper>
  );
};

export default ListingsMonitoringPage;
