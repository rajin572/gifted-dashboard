import { IUserSupervisionItem } from "@/types";

type StatusFields = Pick<IUserSupervisionItem, "accountStatus" | "isBlocked" | "isSuspended">;
type RoleFields = Pick<IUserSupervisionItem, "communityRole">;

export const getAccountStatus = (user: StatusFields): string =>
  user.isBlocked ? "BANNED" : user.isSuspended ? "SUSPENDED" : user.accountStatus;

export const isVerifiedMember = (user: RoleFields): boolean => {
  const role = user.communityRole.toLowerCase();
  return role.includes("donor") || role.includes("leader");
};

export const getVerificationStatus = (user: RoleFields): string =>
  user.communityRole.toLowerCase().includes("verified") ? "VERIFIED ID" : "UNVERIFIED";

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
