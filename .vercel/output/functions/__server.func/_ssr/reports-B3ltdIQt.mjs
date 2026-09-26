import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-D2OqzxhJ.mjs";
import { t as PageHeader } from "./page-header-Db08d1KI.mjs";
import { f as listSales, o as getOverview, t as Card } from "./queries-CAm7hpQv.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as kg, r as kes } from "./format-Dxwqcto1.mjs";
import { c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as CartesianGrid, r as YAxis, s as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-B3ltdIQt.js
var import_jsx_runtime = require_jsx_runtime();
function Reports() {
	const overview = useQuery({
		queryKey: ["overview"],
		queryFn: () => getOverview()
	});
	const sales = useQuery({
		queryKey: ["sales"],
		queryFn: () => listSales()
	});
	function exportCsv() {
		const rows = sales.data ?? [];
		const header = "receipt,counter,method,status,total,when";
		const body = rows.map((s) => `${s.receiptNo},${s.customerCode},${s.paymentMethod},${s.paymentStatus},${s.total},${s.createdAt}`).join("\n");
		const blob = new Blob([`${header}\n${body}`], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "aqua-sales.csv";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Books",
			title: "What the house earned",
			description: "Species mix, till, and an export for the owner’s notebook.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: exportCsv,
				children: "Export CSV"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-wider text-muted uppercase",
					children: "Week"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-3xl tabular-nums italic text-plum-deep",
					children: kes(overview.data?.weekTotal ?? 0)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-wider text-muted uppercase",
					children: "Today"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-3xl tabular-nums italic text-plum-deep",
					children: kes(overview.data?.todayTotal ?? 0)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-wider text-muted uppercase",
					children: "Ice value"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-3xl tabular-nums italic text-plum-deep",
					children: kes(overview.data?.stockValue ?? 0)
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl italic text-plum-deep",
				children: "Species, 14 days"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 h-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: overview.data?.top ?? [],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-border)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "localName",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tickFormatter: (v) => `${Math.round(v / 1e3)}k`,
								tick: {
									fill: "var(--color-muted)",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false,
								width: 36
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: {
									background: "var(--color-paper)",
									border: "1px solid var(--color-border)",
									borderRadius: 12
								},
								formatter: (v) => [kes(Number(v)), "Revenue"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "revenue",
								fill: "var(--color-plum)",
								radius: [
									8,
									8,
									0,
									0
								]
							})
						]
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4 overflow-x-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-xl italic text-plum-deep",
				children: "Species table"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-[11px] tracking-wider text-muted uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 font-medium",
							children: "Fish"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 font-medium",
							children: "Moved"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 text-right font-medium",
							children: "Revenue"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (overview.data?.top ?? []).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-2.5",
							children: [t.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" · ", t.localName]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 tabular-nums",
							children: kg(t.qty)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 text-right tabular-nums",
							children: kes(t.revenue)
						})
					]
				}, t.name)) })]
			})]
		})
	] });
}
//#endregion
export { Reports as component };
