import { createFileRoute } from "@tanstack/react-router";
import { StaffDashboard } from "@/components/aqua/staff-dashboard";

export const Route = createFileRoute("/staff/housemanager")({
  component: () => <StaffDashboard role="manager" />,
});
