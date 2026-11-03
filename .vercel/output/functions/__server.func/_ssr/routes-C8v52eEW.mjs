import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-NF5EutoH.mjs";
import { t as AquaLogo } from "./logo-BmuP4i1f.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as ArrowRight, E as Bell, c as ShoppingCart, d as Scale, m as QrCode, n as Wallet, o as Thermometer, p as Radio, s as Smartphone, u as ShieldCheck, x as Fish } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-BvKihy7W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C8v52eEW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FEATURES = [
	{
		icon: Wallet,
		title: "M-Pesa on the till",
		body: "STK Push from the sale, then the receipt reconciles itself. Cash and till sit in the same book."
	},
	{
		icon: Bell,
		title: "SMS that reaches feature phones",
		body: "Low stock, order confirmations, and a daily sales pulse — no smartphone, no data bundle required."
	},
	{
		icon: QrCode,
		title: "Catch-to-sale trace",
		body: "Every landing mints a batch QR. Hotels and auditors scan it back to the beach and the boat ring."
	},
	{
		icon: Thermometer,
		title: "Cold-chain ready",
		body: "Ice holds, display counters, and delivery coolers already report in. Hardware can plug in later."
	},
	{
		icon: Scale,
		title: "Digital weigh-in",
		body: "A scale reading becomes stock, a batch code, and an SMS in one motion — no notebook."
	},
	{
		icon: Radio,
		title: "Three-day demand pulse",
		body: "Aqua watches the last week of sales and flags fish that will run out before the next dawn boats."
	}
];
var LANDING_TABS = [
	{
		id: "home",
		label: "Overview"
	},
	{
		id: "trace",
		label: "Trace fish"
	},
	{
		id: "desk",
		label: "Fish house"
	},
	{
		id: "market",
		label: "Market"
	},
	{
		id: "cold-chain",
		label: "Cold chain"
	},
	{
		id: "payments",
		label: "Payments"
	}
];
function Home() {
	const navigate = useNavigate();
	const [code, setCode] = (0, import_react.useState)("AQ-DUNGA-8841");
	const [activeTab, setActiveTab] = (0, import_react.useState)("home");
	const [scrollY, setScrollY] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrollY(window.scrollY);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const renderTabContent = () => {
		switch (activeTab) {
			case "trace": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
							children: "Traceability"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 max-w-lg font-display text-4xl text-plum-deep italic sm:text-5xl",
							children: "Follow every catch from beach to buyer."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-base text-ink-soft",
							children: "Aqua creates a public trail the moment a landing is weighed. Hotels, county officers, and buyers can verify the origin, temperature, and sale event in seconds."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: code,
								onChange: (e) => setCode(e.target.value),
								"aria-label": "Batch code",
								className: "font-mono uppercase"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "lg",
								onClick: () => {
									const next = code.trim().toUpperCase();
									if (next) navigate({
										to: "/trace/$code",
										params: { code: next }
									});
								},
								children: "Trace batch"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid gap-3 sm:grid-cols-3",
							children: [
								{
									label: "Origin",
									value: "Dunga beach"
								},
								{
									label: "Batch",
									value: "AQ-DUNGA-8841"
								},
								{
									label: "Status",
									value: "Cold & sealed"
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-paper p-4 shadow-[var(--shadow-border)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] tracking-[0.18em] text-muted uppercase",
									children: item.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-xl italic text-plum-deep",
									children: item.value
								})]
							}, item.label))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[28px] border border-border bg-paper p-3 shadow-[var(--shadow-lift)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-[22px] border border-border bg-cream",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/aqua/cold-room.jpg",
								alt: "Cold room of silver dagaa",
								className: "h-[420px] w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-2xl bg-plum-deep p-4 text-cream",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-sm tracking-wider",
								children: "AQ-SIO-0091"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-lilac",
								children: "Sio Port · Fulu · 6.2°C · watch the ice"
							})]
						})]
					})]
				})
			});
			case "desk": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
							children: "Operations"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl",
							children: "Every role sees the same live operating picture."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base text-ink-soft",
							children: "From the sales desk to the manager’s view, the platform keeps intake, stock, quality, and cash connected in one live workflow."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-4 md:grid-cols-3",
						children: [
							{
								title: "Sales desk",
								copy: "Weigh fish, confirm the sale, and settle the payment without losing the batch trail.",
								accent: "bg-plum-deep text-cream"
							},
							{
								title: "House manager",
								copy: "Monitor stock, spoilage risk, and reorder alerts before the margin starts to slip.",
								accent: "bg-lilac-soft text-plum-deep"
							},
							{
								title: "Owner",
								copy: "Read the live cash picture, margin, and operating health from one dashboard.",
								accent: "bg-paper text-ink-soft"
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: `rounded-[24px] border border-border p-6 shadow-[var(--shadow-border)] ${item.accent}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex rounded-full border border-current/20 px-2 py-1 text-[10px] tracking-[0.18em] uppercase opacity-80",
									children: "Role view"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-display text-2xl italic",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-6 opacity-80",
									children: item.copy
								})
							]
						}, item.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex justify-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/enter",
								children: "Choose staff workspace"
							})
						})
					})
				]
			});
			case "market": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
							children: "Market pulse"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl",
							children: "Price by species, season, and urgency — with less guesswork."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-base text-ink-soft",
							children: "The platform adapts to buying pressure, species mix, and the rhythm of each landing day, so pricing stays sharper without giving away margin."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[28px] border border-border bg-paper p-6 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Average market cues"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 space-y-4",
							children: [
								[
									"Ngege",
									"KES 260/kg",
									"Solid demand"
								],
								[
									"Mbuta",
									"KES 310/kg",
									"Higher bite"
								],
								[
									"Omena",
									"KES 180/kg",
									"Fast turnover"
								],
								[
									"Fulu",
									"KES 420/kg",
									"Premium watch"
								]
							].map(([species, price, signal]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-cream p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-ink-soft",
											children: species
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-plum-deep",
											children: price
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 h-2 overflow-hidden rounded-full bg-border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-plum",
											style: { width: species === "Fulu" ? "82%" : species === "Mbuta" ? "70%" : species === "Ngege" ? "60%" : "50%" }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-[11px] uppercase tracking-[0.16em] text-muted",
										children: signal
									})
								]
							}, species))
						})]
					})]
				})
			});
			case "cold-chain": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-[28px] border border-border bg-paper shadow-[var(--shadow-lift)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/aqua/market-ice.jpg",
							alt: "Fresh fish on ice",
							className: "h-[360px] w-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
							children: "Cold-chain control"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl",
							children: "The ice hold should warn before quality slips."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-3 sm:grid-cols-2",
							children: [
								{
									label: "Temp watch",
									value: "4.1°C"
								},
								{
									label: "Risk band",
									value: "Low"
								},
								{
									label: "Batch age",
									value: "11 hrs"
								},
								{
									label: "Alerting",
									value: "Auto"
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-paper p-4 shadow-[var(--shadow-border)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] tracking-[0.18em] text-muted uppercase",
									children: item.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-2xl italic text-plum-deep",
									children: item.value
								})]
							}, item.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-3 text-sm text-ink-soft",
							children: [
								"Track hold temperature and age in one view.",
								"Flag batches that are at risk before the buyer notices.",
								"Tie spoilage risk back to landing, storage, and movement records."
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, { className: "mt-0.5 size-4 shrink-0 text-plum" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
							}, item))
						})
					] })]
				})
			});
			case "payments": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
							children: "Settlement"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl",
							children: "M-Pesa, receipts, and close-out balances in one live flow."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-base text-ink-soft",
							children: "Sales can be closed, reconciled, and matched to actual fish movement without the daily scramble of handwritten notes and phone calls."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "aqua-hover-lift aqua-parallax-surface aqua-pulse-soft mt-6 rounded-[28px] border border-border bg-plum-deep p-5 text-cream shadow-[var(--shadow-lift)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] uppercase tracking-[0.18em] text-lilac",
									children: "Settlement pulse"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-display text-4xl italic",
									children: "KES 388.6k"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-lilac",
									children: "89% settled before 2pm"
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-[28px] border border-border bg-paper p-6 shadow-[var(--shadow-border)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: [
								["Gross sales", "KES 421,000"],
								["Settled", "KES 388,600"],
								["Outstanding", "KES 32,400"],
								["Fastest channel", "M-Pesa STK"]
							].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border pb-3 text-sm last:border-b-0 last:pb-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-ink-soft",
									children: value
								})]
							}, label))
						})
					})]
				})
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/aqua/hero-lake.jpg",
							alt: "Dawn boats on a still Kenyan lake",
							className: "absolute inset-0 size-full object-cover",
							style: { transform: `scale(1.07) translateY(${scrollY * .1}px)` }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-plum-deep/72" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto flex min-h-[78dvh] w-full max-w-[1440px] flex-col justify-end px-5 py-16 sm:px-8 sm:py-20 lg:px-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "aqua-rise text-[11px] font-medium tracking-[0.28em] text-lilac uppercase",
									children: "Lakeside fish market & fish-house platform"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "aqua-rise aqua-delay-1 mt-4 max-w-[760px] font-display text-5xl leading-[0.94] text-cream italic sm:text-6xl lg:text-[5.25rem]",
									children: "Fresh lake fish, from our landing to your table."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "aqua-rise aqua-delay-2 mt-5 max-w-[620px] text-base leading-8 text-lilac sm:text-lg",
									children: "Browse today’s catch, build your basket, and place a pickup order you can track. Our fish-house team uses Aqua to manage landings, stock, sales, and payments."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "aqua-rise aqua-delay-3 mt-8 flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										variant: "cream",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/client",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-4" }),
												"Shop today’s catch",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
											]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										variant: "outline",
										className: "border-cream/40 text-cream hover:bg-cream/10 hover:text-cream",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/enter",
											children: ["Staff portal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "aqua-rise aqua-delay-3 mt-4 text-sm text-lilac",
									children: "Browse freely · Sign in at checkout to place and track your order"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "aqua-rise aqua-delay-4 mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-cream/20 pt-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-[11px] tracking-[0.16em] text-lilac uppercase",
											children: "Landing sites"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-1 font-display text-3xl text-cream italic",
											children: "7"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-[11px] tracking-[0.16em] text-lilac uppercase",
											children: "Live batches"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-1 font-display text-3xl text-cream italic",
											children: "42"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-[11px] tracking-[0.16em] text-lilac uppercase",
											children: "Daily cash"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-1 font-display text-3xl text-cream italic",
											children: "KES"
										})] })
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-b border-border bg-paper py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex w-full max-w-[1440px] gap-8 overflow-x-auto px-5 text-sm tracking-wide text-muted uppercase sm:px-8 lg:px-10",
						children: [
							"Ngege",
							"Mbuta",
							"Omena",
							"Kamongo",
							"Fulu",
							"Lungfish"
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex shrink-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fish, { className: "size-3.5 text-plum" }), n]
						}, n))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-3xl border border-border bg-paper shadow-[var(--shadow-border)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/aqua/market-ice.jpg",
								alt: "Fish on ice at the market",
								className: "h-72 w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
									children: "Before Aqua"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "aqua-hover-lift aqua-parallax-surface rounded-2xl bg-cream p-5 shadow-[var(--shadow-border)]",
									style: { transform: `translateY(${Math.min(scrollY * .04, 18)}px)` },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-muted uppercase tracking-[0.2em]",
										children: "Before Aqua"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-2xl font-display italic text-plum-deep",
										children: "“Manual records, missed checks, and a lot of guesswork.”"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-2xl border border-dashed border-border bg-paper p-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-ink-soft",
										children: "Every catch, stock movement, and payment sat in separate notes, calls, and spreadsheets."
									})
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "product",
					className: "mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-10 lg:grid-cols-12 lg:items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lg:col-span-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
									children: "What it looks like now"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl",
									children: "One flow from landing intake to invoice, cash, and stock visibility."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "lg:col-span-6 lg:col-start-7 text-base text-ink-soft",
								children: "The catch is weighed. The batch is tracked. Cold-room status updates automatically. Sales, payment reconciliation, and stock health all sit in the same live platform."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-6",
							children: [
								{
									label: "Landing",
									value: "07:15",
									detail: "A boat comes in"
								},
								{
									label: "Weigh-in",
									value: "07:40",
									detail: "Scale update"
								},
								{
									label: "Cold room",
									value: "08:05",
									detail: "Batch tracked"
								},
								{
									label: "Sale",
									value: "11:30",
									detail: "Receipt opened"
								},
								{
									label: "M-Pesa",
									value: "11:42",
									detail: "STK sent"
								},
								{
									label: "Owner",
									value: "12:00",
									detail: "Live view"
								}
							].map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: `aqua-hover-lift aqua-parallax-surface ${idx === 0 ? "rounded-xl bg-plum-deep p-5 text-cream shadow-[var(--shadow-lift)]" : "rounded-xl bg-paper p-5 shadow-[var(--shadow-border)]"}`,
								style: { transform: `translateY(${Math.min(scrollY * .02 * (idx + 1), 18)}px)` },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: idx === 0 ? "text-[10px] tracking-[0.2em] text-lilac uppercase" : "text-[10px] tracking-[0.2em] text-muted uppercase",
										children: step.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-display text-3xl italic",
										children: step.value
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: idx === 0 ? "mt-2 text-sm text-lilac" : "mt-2 text-sm text-muted",
										children: step.detail
									})
								]
							}, step.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "aqua-hover-lift aqua-parallax-surface rounded-xl bg-paper p-5 shadow-[var(--shadow-border)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-10 items-center justify-center rounded-md bg-lilac-soft text-plum",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 font-display text-xl italic text-plum-deep",
										children: f.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: f.body
									})
								]
							}, f.title))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-plum-deep text-cream",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid w-full max-w-[1440px] gap-0 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/aqua/market-ice.jpg",
							alt: "Fresh lake fish on ice",
							className: "h-72 w-full object-cover lg:h-full"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-center px-6 py-14 sm:px-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] tracking-[0.22em] text-lilac uppercase",
									children: "Daily board"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-4xl italic",
									children: "What the house can see in one glance."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 grid gap-3 sm:grid-cols-3",
									children: [
										{
											label: "On ice",
											value: "1,420 kg"
										},
										{
											label: "Cash flow",
											value: "KES 421k"
										},
										{
											label: "Alerts",
											value: "2 reorder"
										}
									].map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-cream/15 bg-cream/5 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] tracking-[0.18em] text-lilac uppercase",
											children: stat.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 font-display text-2xl italic text-cream",
											children: stat.value
										})]
									}, stat.label))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-6 space-y-2 text-sm",
									children: [
										"Automatic reorder SMS at the line you set",
										"Spoilage score from age and hold temperature",
										"Season flag for fulu and lungfish"
									].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-4 shrink-0 text-lilac" }), t]
									}, t))
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "border-t border-border bg-plum-deep py-12 text-cream",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-8 md:grid-cols-[1.5fr_0.9fr_0.9fr_1.3fr]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaLogo, {
										invert: true,
										size: "sm"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 max-w-sm text-sm leading-6 text-lilac",
										children: "Aqua keeps the fish-house operation visible from landing to final payment."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 flex items-center gap-2 text-sm text-lilac",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4" }), "Mobile-first ops"]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-medium tracking-[0.22em] text-lilac uppercase",
									children: "Explore"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-4 space-y-3 text-sm text-cream/85",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setActiveTab("home"),
											className: "hover:text-lilac",
											children: "Home"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setActiveTab("trace"),
											className: "hover:text-lilac",
											children: "Traceability"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setActiveTab("desk"),
											className: "hover:text-lilac",
											children: "The desk"
										}) })
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-medium tracking-[0.22em] text-lilac uppercase",
									children: "Ops"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-4 space-y-3 text-sm text-cream/85",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Landing intake" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Cold-chain alerts" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Daily sales pulse" })
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-cream/15 bg-cream/5 p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] font-medium tracking-[0.22em] text-lilac uppercase",
											children: "Need the desk?"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-3 font-display text-2xl italic text-cream",
											children: "Open the house floor."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "sm",
											variant: "cream",
											className: "mt-5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/enter",
												children: ["Staff portal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
											})
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3 border-t border-cream/15 pt-5 text-sm text-lilac md:flex-row md:items-center md:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 Aqua" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setActiveTab("home"),
										className: "hover:text-cream",
										children: "Privacy"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setActiveTab("trace"),
										className: "hover:text-cream",
										children: "Terms"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setActiveTab("desk"),
										className: "hover:text-cream",
										children: "Support"
									})
								]
							})]
						})]
					})
				})
			] });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-cream text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/70 bg-cream/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaLogo, { size: "sm" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-2 overflow-x-auto text-sm text-ink-soft md:flex",
							children: LANDING_TABS.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setActiveTab(tab.id),
								className: ["aqua-tab-pill rounded-full px-3 py-2 transition-colors", activeTab === tab.id ? "bg-plum text-cream shadow-[0_8px_20px_rgba(91,44,145,0.18)]" : "hover:bg-paper hover:text-plum"].join(" "),
								children: tab.label
							}, tab.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/client",
									children: "Customer shop"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/enter",
									children: ["Staff portal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border bg-paper/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex w-full max-w-[1440px] gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-10 md:hidden",
					children: LANDING_TABS.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setActiveTab(tab.id),
						className: ["aqua-tab-pill rounded-full px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors", activeTab === tab.id ? "bg-plum text-cream shadow-[0_8px_20px_rgba(91,44,145,0.18)]" : "bg-cream text-ink-soft"].join(" "),
						children: tab.label
					}, tab.id))
				})
			}),
			renderTabContent()
		]
	});
}
//#endregion
export { Home as component };
