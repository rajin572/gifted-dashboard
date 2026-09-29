import {
    IGetPlatformPoliciesResponse,
    IGiftCategoryItem,
    ICommunityGuidelineItem,
    IPrivacyClauseItem,
    IOperationalSafeguards,
} from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const platformPoliciesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPlatformPolicies: builder.query<IGetPlatformPoliciesResponse, void>({
            query: () => ({
                url: "/admin/platform-policies",
                method: "GET",
            }),
            providesTags: [tagTypes.platformPolicies],
        }),

        // Category endpoints
        addGiftCategory: builder.mutation<
            { success: boolean; message: string; data: IGiftCategoryItem },
            { name: string }
        >({
            query: (body) => ({
                url: "/admin/platform-policies/categories",
                method: "POST",
                body,
            }),
            invalidatesTags: [tagTypes.platformPolicies],
        }),
        removeGiftCategory: builder.mutation<
            { success: boolean; message: string },
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/admin/platform-policies/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.platformPolicies],
        }),

        // Guideline / Generosity Charter endpoints
        saveCommunityGuideline: builder.mutation<
            { success: boolean; message: string; data: ICommunityGuidelineItem },
            Partial<ICommunityGuidelineItem>
        >({
            query: (body) => ({
                url: "/admin/platform-policies/guidelines",
                method: body._id ? "PUT" : "POST",
                body,
            }),
            invalidatesTags: [tagTypes.platformPolicies],
        }),
        deleteCommunityGuideline: builder.mutation<
            { success: boolean; message: string },
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/admin/platform-policies/guidelines/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.platformPolicies],
        }),

        // Privacy Clause endpoints
        savePrivacyClause: builder.mutation<
            { success: boolean; message: string; data: IPrivacyClauseItem },
            Partial<IPrivacyClauseItem>
        >({
            query: (body) => ({
                url: "/admin/platform-policies/privacy-clauses",
                method: body._id ? "PUT" : "POST",
                body,
            }),
            invalidatesTags: [tagTypes.platformPolicies],
        }),
        deletePrivacyClause: builder.mutation<
            { success: boolean; message: string },
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/admin/platform-policies/privacy-clauses/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.platformPolicies],
        }),

        // Safeguards
        updateOperationalSafeguards: builder.mutation<
            { success: boolean; message: string },
            IOperationalSafeguards
        >({
            query: (body) => ({
                url: "/admin/platform-policies/safeguards",
                method: "PATCH",
                body,
            }),
            invalidatesTags: [tagTypes.platformPolicies],
        }),

        // Reset Defaults
        resetPlatformPoliciesToDefaults: builder.mutation<
            { success: boolean; message: string },
            void
        >({
            query: () => ({
                url: "/admin/platform-policies/reset-defaults",
                method: "POST",
            }),
            invalidatesTags: [tagTypes.platformPolicies],
        }),
    }),
});

export const {
    useGetPlatformPoliciesQuery,
    useAddGiftCategoryMutation,
    useRemoveGiftCategoryMutation,
    useSaveCommunityGuidelineMutation,
    useDeleteCommunityGuidelineMutation,
    useSavePrivacyClauseMutation,
    useDeletePrivacyClauseMutation,
    useUpdateOperationalSafeguardsMutation,
    useResetPlatformPoliciesToDefaultsMutation,
} = platformPoliciesApi;
export default platformPoliciesApi;

