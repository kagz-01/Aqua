import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-D2OqzxhJ.mjs";
import { t as PageHeader } from "./page-header-Db08d1KI.mjs";
import { t as Badge } from "./badge-D5lDHBVX.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getOverview, t as Card } from "./queries-CAm7hpQv.mjs";
import { S as ArrowRight, g as Fish, i as TriangleAlert, n as Wallet } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as kg, r as kes } from "./format-Dxwqcto1.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, o as CartesianGrid, r as YAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-3MwqtZp9.js
var import_jsx_runtime = require_jsx_runtime();
function Pulse() {
	const d = useQuery({
		queryKey: ["overview"],
		queryFn: () => getOverview()
	}).data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Pulse",
			title: "This morning on the till",
			description: "Fourteen-day current, ice that is running thin, and a three-day demand read.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/sales",
					children: ["New sale", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Today",
					value: kes(d?.todayTotal ?? 0),
					hint: `${d?.todayCount ?? 0} receipts`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Last 7 days",
					value: kes(d?.weekTotal ?? 0),
					hint: "All counters"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Ice value",
					value: kes(d?.stockValue ?? 0),
					hint: "At listed kilo prices"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Pending M-Pesa",
					value: kes(d?.pendingTotal ?? 0),
					hint: `${d?.pendingCount ?? 0} waiting STK`,
					warn: (d?.pendingCount ?? 0) > 0
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 xl:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "xl:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl italic text-plum-deep",
						children: "Till, two weeks"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "KES · daily"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: d?.series ?? [],
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "aquaFill",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "var(--color-plum)",
										stopOpacity: .35
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "var(--color-plum)",
										stopOpacity: .02
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "var(--color-border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "day",
									tickFormatter: (v) => v.slice(5),
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
										borderRadius: 12,
										fontSize: 12
									},
									formatter: (v) => [kes(Number(v)), "Sales"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "total",
									stroke: "var(--color-plum)",
									strokeWidth: 2,
									fill: "url(#aquaFill)"
								})
							]
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl italic text-plum-deep",
					children: "Pay mix"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "Last 14 days"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: (d?.mix ?? []).map((m) => {
						const all = (d?.mix ?? []).reduce((s, x) => s + x.total, 0) || 1;
						const pct = Math.round(m.total / all * 100);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 capitalize",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4 text-plum" }), m.method === "mpesa" ? "M-Pesa" : "Cash"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-muted",
								children: [pct, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 h-1.5 overflow-hidden rounded-full bg-cream",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-plum",
								style: { width: `${pct}%` }
							})
						})] }, m.method);
					})
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl italic text-plum-deep",
					children: "Running thin"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "warn",
					children: "Reorder"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: (d?.low ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-muted",
					children: "Ice hold is above the lines you set."
				}) : d?.low.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: `/aqua/${f.imageKey}.jpg`,
							alt: "",
							className: "size-12 rounded-md object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: f.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									f.localName,
									" · ",
									kg(f.quantityKg),
									" left"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-warn" })
					]
				}, f.id))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl italic text-plum-deep",
					children: "Three-day read"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "Pace of the last week, projected forward"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: (d?.forecast ?? []).slice().sort((a, b) => a.daysLeft - b.daysLeft).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fish, { className: "size-4 text-plum" }), f.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-muted",
							children: f.daysLeft > 20 ? "steady" : `${f.daysLeft.toFixed(1)} days`
						})]
					}, f.fishTypeId))
				})
			] })]
		})
	] });
}
function Kpi({ label, value, hint, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: warn ? "ring-1 ring-warn/40" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.16em] text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-3xl tabular-nums tracking-tight text-plum-deep",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			})
		]
	});
}
//#endregion
export { Pulse as component };
