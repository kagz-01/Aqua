import { createMiddleware } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import type { AquaRole } from "./role";

const STAFF_ROLES: AquaRole[] = ["owner", "manager", "floor", "accounts"];
const LOCAL_DEMO_MODE = import.meta.env.DEV && import.meta.env.VITE_AUTH_ENABLED === "false";

export function staffOnly(allowed: AquaRole[] = STAFF_ROLES) {
  if (LOCAL_DEMO_MODE) {
    return createMiddleware({ type: "function" }).server(async ({ next }) => next());
  }
  return createMiddleware({ type: "function" })
    .middleware([authMiddleware])
    .server(async ({ context, next }) => {
      const { requireStaff } = await import("./access.server");
      const role = await requireStaff(context.userId, allowed);
      return next({ context: { aquaRole: role } });
    });
}
