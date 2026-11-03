import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PageHeader } from "@/components/aqua/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listTeamUsers, setStaffRole } from "@/lib/aqua/market";
import { useCurrentUser } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/app/team")({ component: TeamAccess });

function TeamAccess() {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const users = useQuery({ queryKey: ["aqua-team"], queryFn: () => listTeamUsers() });
  const updateRole = useMutation({
    mutationFn: (data: { userId: string; role: "manager" | "floor" | null }) =>
      setStaffRole({ data }),
    onSuccess: async () => {
      toast.success("Account access updated");
      await queryClient.invalidateQueries({ queryKey: ["aqua-team"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <div>
      <PageHeader
        eyebrow="Owner desk"
        title="Team access"
        description="Only approved manager and floor accounts can use the staff workspace. New accounts start as customers."
      />
      {users.isLoading ? (
        <Card><p className="text-sm text-muted">Loading accounts…</p></Card>
      ) : users.isError ? (
        <Card><p role="alert" className="text-sm text-danger">Accounts could not be loaded.</p></Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="pb-3 font-medium">Account</th>
                <th className="pb-3 font-medium">Access</th>
                <th className="pb-3 text-right font-medium">Change access</th>
              </tr>
            </thead>
            <tbody>
              {(users.data ?? []).map((account) => {
                const isOwner = account.role === "owner";
                const isSelf = account.id === currentUser?.id;
                return (
                  <tr key={account.id} className="border-t border-border">
                    <td className="py-3">
                      <p className="font-medium">{account.name}</p>
                      <p className="text-xs text-muted">{account.email}</p>
                    </td>
                    <td className="py-3">
                      <Badge variant={isOwner ? "ok" : account.role ? "warn" : "outline"}>
                        {account.role === "floor" ? "Floor attendant" : account.role ?? "Customer"}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      {isOwner ? (
                        <span className="text-xs text-muted">Protected owner</span>
                      ) : (
                        <Select
                          value={account.role ?? "customer"}
                          disabled={isSelf || updateRole.isPending}
                          onValueChange={(value) =>
                            updateRole.mutate({
                              userId: account.id,
                              role: value === "customer" ? null : value as "manager" | "floor",
                            })
                          }
                        >
                          <SelectTrigger className="ml-auto w-44">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="customer">Customer only</SelectItem>
                            <SelectItem value="manager">House manager</SelectItem>
                            <SelectItem value="floor">Floor attendant</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {users.data?.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">No accounts have registered yet.</p>
          ) : null}
          <p className="mt-4 border-t border-border pt-3 text-xs leading-5 text-muted">
            The owner account cannot be changed here. Customers must first create an account before staff access can be assigned.
          </p>
        </Card>
      )}
    </div>
  );
}
