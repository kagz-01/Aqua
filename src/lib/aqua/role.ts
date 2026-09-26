import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AquaRole = "owner" | "manager" | "floor";

export const ROLE_META: Record<
  AquaRole,
  { title: string; desk: string; blurb: string }
> = {
  owner: {
    title: "Owner",
    desk: "Full house",
    blurb: "Payments, reports, alerts, and every till.",
  },
  manager: {
    title: "House manager",
    desk: "Stock & books",
    blurb: "Inventory, batches, cold chain, and the daily pulse.",
  },
  floor: {
    title: "Floor attendant",
    desk: "Sales floor",
    blurb: "Weigh-in, record a sale, send an STK push.",
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
    { name: "aqua-role" },
  ),
);

export function canSeeFinance(role: AquaRole) {
  return role === "owner" || role === "manager";
}

export function canMutateStock(role: AquaRole) {
  return role === "owner" || role === "manager";
}

export function canSeeReports(role: AquaRole) {
  return role === "owner" || role === "manager";
}
