import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useCurrentUser } from "./use-current-user-FFY7azfy.mjs";
import { t as Card } from "./card-C3TFrwOd.mjs";
import { i as listTeamUsers, o as setStaffRole } from "./market-MTwPjtLG.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as PageHeader } from "./page-header-Db08d1KI.mjs";
import { t as Badge } from "./badge-CagA4FK0.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CZeLWDmx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team-BViDMz2e.js
var import_jsx_runtime = require_jsx_runtime();
function TeamAccess() {
	const queryClient = useQueryClient();
	const currentUser = useCurrentUser();
	const users = useQuery({
		queryKey: ["aqua-team"],
		queryFn: () => listTeamUsers()
	});
	const updateRole = useMutation({
		mutationFn: (data) => setStaffRole({ data }),
		onSuccess: async () => {
			toast.success("Account access updated");
			await queryClient.invalidateQueries({ queryKey: ["aqua-team"] });
		},
		onError: (error) => toast.error(error.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Owner desk",
		title: "Team access",
		description: "Assign each approved account to house operations, the sales floor, or accounts. New accounts start as customers."
	}), users.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Loading accounts…"
	}) }) : users.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "text-sm text-danger",
		children: "Accounts could not be loaded."
	}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "overflow-x-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[36rem] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-xs uppercase tracking-wide text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3 font-medium",
							children: "Account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3 font-medium",
							children: "Access"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3 text-right font-medium",
							children: "Change access"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (users.data ?? []).map((account) => {
					const isOwner = account.role === "owner";
					const isSelf = account.id === currentUser?.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: account.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: account.email
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: isOwner ? "ok" : account.role ? "warn" : "outline",
									children: account.role === "floor" ? "Floor attendant" : account.role === "accounts" ? "Accounts officer" : account.role ?? "Customer"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right",
								children: isOwner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: "Protected owner"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: account.role ?? "customer",
									disabled: isSelf || updateRole.isPending,
									onValueChange: (value) => updateRole.mutate({
										userId: account.id,
										role: value === "customer" ? null : value
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "ml-auto w-44",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "customer",
											children: "Customer only"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "manager",
											children: "House manager"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "floor",
											children: "Floor attendant"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "accounts",
											children: "Accounts officer"
										})
									] })]
								})
							})
						]
					}, account.id);
				}) })]
			}),
			users.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-sm text-muted",
				children: "No accounts have registered yet."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 border-t border-border pt-3 text-xs leading-5 text-muted",
				children: "The owner account cannot be changed here. Customers must first create an account before staff access can be assigned."
			})
		]
	})] });
}
//#endregion
export { TeamAccess as component };
