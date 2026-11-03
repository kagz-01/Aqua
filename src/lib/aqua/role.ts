import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AquaRole = "owner" | "manager" | "floor" | "accounts";

export const ROLE_META: Record<AquaRole, { title: string; desk: string; blurb: string }> = {
  owner: {
    title: "Owner",
    desk: "Business overview",
    blurb: "See sales, payments, reports, and staff access.",
  },
  manager: {
    title: "House manager",
    desk: "Fish house",
    blurb: "Receive fish, check stock, and prepare shop orders.",
  },
  floor: {
    title: "Floor attendant",
    desk: "Sales and pickups",
    blurb: "Record sales and hand over shop orders.",
  },
  accounts: {
    title: "Accounts officer",
    desk: "Accounts",
    blurb: "Check customer payments and pay fishers.",
  },
};

type RoleState = {
  role: AquaRole;
  setRole: (role: AquaRole) => void;
};

export const useAquaRole = create<RoleState>()(
  persist(
    (set) => ({
      role: "owner",
      setRole: (role) => set({ role }),
    }),
    { name: "aqua-role-demo" },
  ),
);

export function canSeeFinance(role: AquaRole) {
  return role === "owner" || role === "accounts";
}

export function canMutateStock(role: AquaRole) {
  return role === "owner" || role === "manager";
}

export function canSeeReports(role: AquaRole) {
  return role === "owner" || role === "manager" || role === "accounts";
}
