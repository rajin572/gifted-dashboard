import { useState } from "react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ActiveGiftCategoriesSection from "@/Components/Dashboard/PlatformPolicies/ActiveGiftCategoriesSection";
import CommunityGuidelinesSection from "@/Components/Dashboard/PlatformPolicies/CommunityGuidelinesSection";
import PrivacyPolicySection from "@/Components/Dashboard/PlatformPolicies/PrivacyPolicySection";
import OperationalSafeguardsSection from "@/Components/Dashboard/PlatformPolicies/OperationalSafeguardsSection";
import AddEditGuidelineModal from "@/Components/Dashboard/PlatformPolicies/AddEditGuidelineModal";
import AddEditPrivacyClauseModal from "@/Components/Dashboard/PlatformPolicies/AddEditPrivacyClauseModal";
import ResetPoliciesConfirmModal from "@/Components/Dashboard/PlatformPolicies/ResetPoliciesConfirmModal";
import { RotateCcw, Diamond, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  IGiftCategoryItem,
  ICommunityGuidelineItem,
  IPrivacyClauseItem,
  IOperationalSafeguards,
} from "@/types";
// import {
//   useGetPlatformPoliciesQuery,
//   useAddGiftCategoryMutation,
//   useRemoveGiftCategoryMutation,
//   useSaveCommunityGuidelineMutation,
//   useDeleteCommunityGuidelineMutation,
//   useSavePrivacyClauseMutation,
//   useDeletePrivacyClauseMutation,
//   useUpdateOperationalSafeguardsMutation,
// } from "@/redux/features/platformPolicies/platformPoliciesApi";

const DUMMY_CATEGORIES: IGiftCategoryItem[] = [
  { _id: "cat_1", name: "Electronics", active: true },
  { _id: "cat_2", name: "Furniture", active: true },
  { _id: "cat_3", name: "Baby & Kids", active: true },
  { _id: "cat_4", name: "Home & Living", active: true },
  { _id: "cat_5", name: "Books & Education", active: true },
  { _id: "cat_6", name: "Clothing & Shoes", active: true },
  { _id: "cat_7", name: "Appliances", active: true },
  { _id: "cat_8", name: "Vehicles & Bicycles", active: true },
  { _id: "cat_9", name: "Other", active: true },
];

const DUMMY_GUIDELINES: ICommunityGuidelineItem[] = [
  {
    _id: "guideline_1",
    ruleNumber: "RULE #1",
    category: "Core Principle",
    updatedAtText: "Updated 2 days ago",
    title: "The 100% Free Guarantee & Zero-Resale Covenant",
    content:
      "Everything offered on Gifted is 100% free with zero expectation of payment, trade, barter, or return favors. Items received may never be resold, flipped, pawned, or used for commercial retail arbitrage. If you outgrow or no longer need an item, return it to the community by gifting it forward.",
  },
  {
    _id: "guideline_2",
    ruleNumber: "RULE #3",
    category: "Porch Etiquette",
    updatedAtText: "Updated 1 week ago",
    title: "Contactless Porch Pickup Etiquette & No-Ghosting",
    content:
      "Selected recipients are expected to coordinate pickup and collect the item within 48 hours. If an unforeseen emergency arises, notify the donor via in-app chat immediately. Ghosting or repeated no-shows will result in a 14-day community hold.",
  },
  {
    _id: "guideline_3",
    ruleNumber: "RULE #4",
    category: "Listing Safety",
    updatedAtText: "Updated 2 weeks ago",
    title: "Safe, Dignified, & Clean Goods Standard",
    content:
      "Donors agree to only list items in safe, hygienic, and dignified condition. Prohibited goods include expired medicine, recalled baby equipment, firearms, hazardous chemicals, and items that cannot be safely transferred.",
  },
  {
    _id: "guideline_4",
    ruleNumber: "RULE #5",
    category: "Community Conduct",
    updatedAtText: "Updated 3 weeks ago",
    title: "Neighbor Respect & Inclusive Participation",
    content:
      "Every member deserves a respectful and discrimination-free experience. Harassment, intimidation, exclusion, or pressure for off-platform compensation is prohibited across listings, claims, messages, and live streams.",
  },
];

const DUMMY_PRIVACY_CLAUSES: IPrivacyClauseItem[] = [
  {
    _id: "clause_1",
    clauseNumber: "CLAUSE #1",
    category: "Address Protection",
    updatedAtText: "Updated just now",
    title: "Strict Exact Address Shielding",
    content:
      "Your private home street address and apartment number are never publicly visible on listings or maps. Exact porch pickup coordinates are revealed exclusively to the selected recipient after the donor confirms the claim.",
  },
  {
    _id: "clause_2",
    clauseNumber: "CLAUSE #2",
    category: "Location Privacy",
    updatedAtText: "Updated 1 week ago",
    title: "Geographic Radius Fuzzing (10-Mile Zone)",
    content:
      "Public neighborhood listings and discover maps only display approximate neighborhood zones within a 10-mile radius fuzzing buffer to prevent household triangulation.",
  },
  {
    _id: "clause_3",
    clauseNumber: "CLAUSE #3",
    category: "Communications",
    updatedAtText: "Updated 2 weeks ago",
    title: "In-App Direct Message & Phone Protection",
    content:
      "All neighbor communication occurs securely within Gifted. We never disclose your personal phone number, private email address, or third-party account credentials to other members.",
  },
  {
    _id: "clause_4",
    clauseNumber: "CLAUSE #4",
    category: "Data Rights",
    updatedAtText: "Updated 1 month ago",
    title: "Zero Commercial Data Brokerage",
    content:
      "Gifted does not sell, license, rent, or monetize your personal profile, gifting habits, or applicant narratives to advertising agencies or commercial data brokers. Your generosity history belongs to you.",
  },
  {
    _id: "clause_5",
    clauseNumber: "CLAUSE #5",
    category: "Retention",
    updatedAtText: "Updated 1 month ago",
    title: "Member-Controlled Data Retention",
    content:
      "Members may request an export or deletion of their account data. Safety audit records are retained only for the minimum period required to protect the community and satisfy legal obligations.",
  },
];

const DUMMY_SAFEGUARDS: IOperationalSafeguards = {
  requireAntiResalePledge: false,
  allowCommunityLiveStreams: true,
  aiStoryUrgencyAssistance: true,
};

export default function PlatformPoliciesPage() {
  const [categories, setCategories] = useState<IGiftCategoryItem[]>(DUMMY_CATEGORIES);
  const [guidelines, setGuidelines] = useState<ICommunityGuidelineItem[]>(DUMMY_GUIDELINES);
  const [privacyClauses, setPrivacyClauses] = useState<IPrivacyClauseItem[]>(DUMMY_PRIVACY_CLAUSES);
  const [safeguards, setSafeguards] = useState<IOperationalSafeguards>(DUMMY_SAFEGUARDS);

  // Modals state
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [guidelineModalOpen, setGuidelineModalOpen] = useState(false);
  const [selectedGuideline, setSelectedGuideline] = useState<ICommunityGuidelineItem | null>(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [selectedPrivacyClause, setSelectedPrivacyClause] = useState<IPrivacyClauseItem | null>(null);

  // TODO: wire to useGetPlatformPoliciesQuery once the endpoint exists.
  // const { data: policiesData } = useGetPlatformPoliciesQuery();
  // const categories = policiesData?.data?.categories ?? DUMMY_CATEGORIES;
  // const guidelines = policiesData?.data?.guidelines ?? DUMMY_GUIDELINES;
  // const privacyClauses = policiesData?.data?.privacyClauses ?? DUMMY_PRIVACY_CLAUSES;
  // const safeguards = policiesData?.data?.safeguards ?? DUMMY_SAFEGUARDS;

  // Handlers for Categories
  const handleAddCategory = (name: string) => {
    const newCat: IGiftCategoryItem = {
      _id: `cat_${Date.now()}`,
      name,
      active: true,
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const handleRemoveCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c._id !== id));
  };

  // Handlers for Guidelines
  const handleSaveGuideline = (item: ICommunityGuidelineItem) => {
    setGuidelines((prev) => {
      const idx = prev.findIndex((g) => g._id === item._id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = item;
        return copy;
      }
      return [...prev, item];
    });
  };

  const handleDeleteGuideline = (id: string) => {
    setGuidelines((prev) => prev.filter((g) => g._id !== id));
  };

  // Handlers for Privacy Clauses
  const handleSavePrivacyClause = (item: IPrivacyClauseItem) => {
    setPrivacyClauses((prev) => {
      const idx = prev.findIndex((p) => p._id === item._id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = item;
        return copy;
      }
      return [...prev, item];
    });
  };

  const handleDeletePrivacyClause = (id: string) => {
    setPrivacyClauses((prev) => prev.filter((p) => p._id !== id));
  };

  // Handlers for Safeguards
  const handleChangeSafeguard = (key: keyof IOperationalSafeguards, val: boolean) => {
    setSafeguards((prev) => ({ ...prev, [key]: val }));
  };

  // Scroll to section helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PageWraper
      preTitle={
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-wider uppercase bg-orange-50 text-[#ff4c05] px-2.5 py-0.5 rounded-full border border-orange-100">
            PLATFORM POLICY & GOVERNANCE
          </span>
          <span className="text-xs text-gray-500 font-medium">
            All-In-One Single Screen Management
          </span>
        </div>
      }
      title="Platform Rules, Guidelines & Privacy Policy"
      description="Supervise active gift categories, add or edit the Community Guidelines & Generosity Charter, manage the app's Privacy Policy terms, and toggle automated safeguards — all hosted on this single page."
      actions={
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsResetOpen(true)}
          className="text-xs h-9 gap-1.5 border-gray-300 font-semibold cursor-pointer hover:bg-gray-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Defaults</span>
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Jump To Section Quick Nav Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto py-1 text-xs">
          <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase shrink-0">
            JUMP TO SECTION:
          </span>
          <button
            type="button"
            onClick={() => scrollTo("section-categories")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-200 shrink-0 cursor-pointer shadow-2xs transition-colors"
          >
            <Diamond className="w-3 h-3 text-[#ff4c05]" />
            <span>Active Gift Categories ({categories.length})</span>
          </button>
          <button
            type="button"
            onClick={() => scrollTo("section-guidelines")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-200 shrink-0 cursor-pointer shadow-2xs transition-colors"
          >
            <Diamond className="w-3 h-3 text-[#ff4c05]" />
            <span>Generosity Charter ({guidelines.length})</span>
          </button>
          <button
            type="button"
            onClick={() => scrollTo("section-privacy")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-200 shrink-0 cursor-pointer shadow-2xs transition-colors"
          >
            <ShieldCheck className="w-3 h-3 text-[#2563eb]" />
            <span>Privacy Policy ({privacyClauses.length})</span>
          </button>
          <button
            type="button"
            onClick={() => scrollTo("section-safeguards")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-200 shrink-0 cursor-pointer shadow-2xs transition-colors"
          >
            <SlidersHorizontal className="w-3 h-3 text-indigo-600" />
            <span>Operational Safeguards</span>
          </button>
        </div>

        {/* 1. Active Gift Categories Section */}
        <ActiveGiftCategoriesSection
          categories={categories}
          onAddCategory={handleAddCategory}
          onRemoveCategory={handleRemoveCategory}
        />

        {/* 2. Community Guidelines & Generosity Charter Section */}
        <CommunityGuidelinesSection
          guidelines={guidelines}
          onAddNew={() => {
            setSelectedGuideline(null);
            setGuidelineModalOpen(true);
          }}
          onEditModal={(item) => {
            setSelectedGuideline(item);
            setGuidelineModalOpen(true);
          }}
          onSaveGuideline={handleSaveGuideline}
          onDeleteGuideline={handleDeleteGuideline}
        />

        {/* 3. Privacy Policy Section */}
        <PrivacyPolicySection
          clauses={privacyClauses}
          onAddNew={() => {
            setSelectedPrivacyClause(null);
            setPrivacyModalOpen(true);
          }}
          onEditModal={(item) => {
            setSelectedPrivacyClause(item);
            setPrivacyModalOpen(true);
          }}
          onSaveClause={handleSavePrivacyClause}
          onDeleteClause={handleDeletePrivacyClause}
        />

        {/* 4. Operational Safety Safeguards Section */}
        <OperationalSafeguardsSection
          safeguards={safeguards}
          onChangeSafeguard={handleChangeSafeguard}
        />
      </div>

      {/* Add / Edit Guideline Modal */}
      <AddEditGuidelineModal
        open={guidelineModalOpen}
        onClose={() => {
          setGuidelineModalOpen(false);
          setSelectedGuideline(null);
        }}
        guideline={selectedGuideline}
        onSuccess={handleSaveGuideline}
      />

      {/* Add / Edit Privacy Clause Modal */}
      <AddEditPrivacyClauseModal
        open={privacyModalOpen}
        onClose={() => {
          setPrivacyModalOpen(false);
          setSelectedPrivacyClause(null);
        }}
        clause={selectedPrivacyClause}
        onSuccess={handleSavePrivacyClause}
      />

      {/* Reset Confirmation Modal */}
      <ResetPoliciesConfirmModal
        open={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onSuccess={() => {
          setCategories(DUMMY_CATEGORIES);
          setGuidelines(DUMMY_GUIDELINES);
          setPrivacyClauses(DUMMY_PRIVACY_CLAUSES);
          setSafeguards(DUMMY_SAFEGUARDS);
        }}
      />
    </PageWraper>
  );
}

