import { IMeta } from "./common.type";

export type ReportPriority = "HIGH PRIORITY" | "MEDIUM PRIORITY" | "LOW PRIORITY";
export type ReportCategory = "Gift" | "Story" | "User";
export type ReportStatus = "PENDING INVESTIGATION" | "RESOLVED & CLOSED" | "DISMISSED";

export interface ISafetyStats {
  pendingFlagsCount: number;
  resolvedCasesCount: number;
  allReportsCount: number;
  safetyIndex: number;
}

export interface IPendingReportItem {
  _id: string;
  reportId: string;
  priority: ReportPriority;
  category: ReportCategory;
  reportedTime: string;
  location: string;
  status: ReportStatus;
  targetTitle: string;
  violationTag: string;
  statement: string;
  reporterName: string;
  reporterRole: string;
}

export interface IResolvedCaseItem {
  _id: string;
  reportId: string;
  category: ReportCategory;
  resolvedTime: string;
  location: string;
  status: ReportStatus;
  targetTitle: string;
  reason: string;
  statement: string;
  resolutionActionText: string;
  reporterName: string;
  reporterRole: string;
  closedBy: string;
}

export interface IGetSafetyReportsOverviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    stats: ISafetyStats;
    pendingFlags: IPendingReportItem[];
    resolvedCases: IResolvedCaseItem[];
  };
}

export interface IGetSafetyReportsListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: (IPendingReportItem | IResolvedCaseItem)[];
    meta: IMeta;
  };
}
