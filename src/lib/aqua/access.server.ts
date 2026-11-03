import { getSql } from "@/lib/db";
import type { AquaRole } from "./role";

const STAFF_ROLES: AquaRole[] = ["owner", "manager", "floor"];

export async function getAquaRole(userId: string): Promise<AquaRole | null> {
  const sql = await getSql();
  const rows = await sql<{ role: string }>`
    select role from aqua_staff_roles where user_id = ${userId} limit 1`;
  const role = rows[0]?.role;
  return STAFF_ROLES.includes(role as AquaRole) ? (role as AquaRole) : null;
}

export async function requireStaff(
  userId: string,
  allowed: AquaRole[] = STAFF_ROLES,
): Promise<AquaRole> {
  if (process.env.VITE_AUTH_ENABLED === "false" && !process.env.GROK_PROJECT_ID) {
    const demoRole = allowed[0];
    if (demoRole) return demoRole;
  }
  const role = await getAquaRole(userId);
  if (!role || !allowed.includes(role)) {
    throw new Error("Staff access required");
  }
  return role;
}
