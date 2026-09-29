export interface IGiftCategoryItem {
    _id: string;
    name: string;
    active?: boolean;
}

export interface ICommunityGuidelineItem {
    _id: string;
    ruleNumber: string;
    category: string;
    updatedAtText: string;
    title: string;
    content: string;
}

export interface IPrivacyClauseItem {
    _id: string;
    clauseNumber: string;
    category: string;
    updatedAtText: string;
    title: string;
    content: string;
}

export interface IOperationalSafeguards {
    requireAntiResalePledge: boolean;
    allowCommunityLiveStreams: boolean;
    aiStoryUrgencyAssistance: boolean;
}

export interface IPlatformPoliciesData {
    categories: IGiftCategoryItem[];
    guidelines: ICommunityGuidelineItem[];
    privacyClauses: IPrivacyClauseItem[];
    safeguards: IOperationalSafeguards;
}

export interface IGetPlatformPoliciesResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IPlatformPoliciesData;
}

