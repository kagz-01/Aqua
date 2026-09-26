import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as cn, t as Button } from "./button-D2OqzxhJ.mjs";
import { t as PageHeader } from "./page-header-Db08d1KI.mjs";
import { t as Badge } from "./badge-D5lDHBVX.mjs";
import { _ as sendAlert, t as Card, u as listNotifications } from "./queries-CAm7hpQv.mjs";
import { t as Input } from "./input-Bk0SnP9T.mjs";
import { t as Label } from "./label-BywuCh0P.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-F1lz8S6X.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alerts-BEcaAMmE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-ink shadow-[var(--shadow-border)] outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-ring/30", className),
		...props
	});
}
function Alerts() {
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["notes"],
		queryFn: () => listNotifications()
	});
	const [channel, setChannel] = (0, import_react.useState)("sms");
	const [kind, setKind] = (0, import_react.useState)("notice");
	const [to, setTo] = (0, import_react.useState)("Owner desk");
	const [message, setMessage] = (0, import_react.useState)("");
	const send = useMutation({
		mutationFn: () => sendAlert({ data: {
			channel,
			kind,
			recipientCode: to,
			message
		} }),
		onSuccess: async () => {
			toast.success("Queued on the SMS desk");
			setMessage("");
			await qc.invalidateQueries({ queryKey: ["notes"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "SMS desk",
		title: "Reach a feature phone",
		description: "Low stock, payments, and the daily pulse leave this desk as SMS, WhatsApp, or USSD."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "lg:col-span-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: (q.data ?? []).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: n.channel }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: n.kind
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: n.recipientCode
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto text-[11px] text-muted",
								children: formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-ink-soft",
						children: n.message
					})]
				}, n.id))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl italic text-plum-deep",
			children: "Compose"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Channel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: channel,
						onValueChange: setChannel,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "sms",
								children: "SMS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "whatsapp",
								children: "WhatsApp"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "ussd",
								children: "USSD"
							})
						] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Kind" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: kind,
						onValueChange: setKind,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
							"notice",
							"low-stock",
							"sale",
							"daily",
							"cold-chain"
						].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: k,
							children: k
						}, k)) })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Desk / counter" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: to,
						onChange: (e) => setTo(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: message,
						onChange: (e) => setMessage(e.target.value),
						rows: 4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					disabled: send.isPending,
					onClick: () => send.mutate(),
					children: "Send"
				})
			]
		})] })]
	})] });
}
//#endregion
export { Alerts as component };
