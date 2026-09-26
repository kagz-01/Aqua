import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-D2OqzxhJ.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Input } from "./input-Bk0SnP9T.mjs";
import { S as ArrowRight, a as Thermometer, c as Scale, d as QrCode, g as Fish, n as Wallet, o as Smartphone, s as ShieldCheck, u as Radio, x as Bell } from "../_libs/lucide-react.mjs";
import { t as AquaLogo } from "./logo-CxgPjKny.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ct88W3lC.js
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
function Home() {
	const navigate = useNavigate();
	const [code, setCode] = (0, import_react.useState)("AQ-DUNGA-8841");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-cream text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/70 bg-cream/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaLogo, { size: "sm" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden items-center gap-6 text-sm text-ink-soft md:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#product",
									className: "hover:text-plum",
									children: "Product"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#trace",
									className: "hover:text-plum",
									children: "Trace"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#desk",
									className: "hover:text-plum",
									children: "The desk"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/enter",
								children: ["Open workspace", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/aqua/hero-lake.jpg",
						alt: "Dawn boats on a still Kenyan lake",
						className: "absolute inset-0 size-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-plum-deep/72" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto flex min-h-[78dvh] max-w-6xl flex-col justify-end px-4 py-16 sm:px-6 sm:py-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "aqua-rise text-[11px] font-medium tracking-[0.28em] text-lilac uppercase",
								children: "Lakeside fish house OS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "aqua-rise aqua-delay-1 mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-cream italic sm:text-7xl",
								children: "From the landing to the last sale."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "aqua-rise aqua-delay-2 mt-5 max-w-xl text-base text-lilac sm:text-lg",
								children: "Aqua is the cream-and-plum ledger for Kenyan fish houses — stock, M-Pesa, SMS alerts, and a scannable trail from beach to counter."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "aqua-rise aqua-delay-3 mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "cream",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/enter",
										children: ["Enter the desk", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "outline",
									className: "border-cream/40 text-cream hover:bg-cream/10 hover:text-cream",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#trace",
										children: "Look up a batch"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "aqua-rise aqua-delay-4 mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-cream/20 pt-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-[11px] tracking-[0.16em] text-lilac uppercase",
										children: "Beaches"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 font-display text-3xl text-cream italic",
										children: "5"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-[11px] tracking-[0.16em] text-lilac uppercase",
										children: "Live batches"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 font-display text-3xl text-cream italic",
										children: "6"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-[11px] tracking-[0.16em] text-lilac uppercase",
										children: "Till mix"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 font-display text-3xl text-cream italic",
										children: "M-Pesa"
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
					className: "mx-auto flex max-w-6xl gap-8 overflow-x-auto px-4 text-sm tracking-wide text-muted uppercase sm:px-6",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "product",
				className: "mx-auto max-w-6xl px-4 py-20 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-10 lg:grid-cols-12 lg:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
							children: "Why Aqua"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl",
							children: "Built for the beach, not a supermarket back office."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lg:col-span-6 lg:col-start-7 text-base text-ink-soft",
						children: "Notebooks drown, M-Pesa sits in a different pile, and a hotel cannot tell you which boat landed the ngege. Aqua keeps one current: the ice hold, the till, and the trail."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl bg-paper p-5 shadow-[var(--shadow-border)]",
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
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-plum-deep text-cream",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-0 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/aqua/market-ice.jpg",
						alt: "Fresh lake fish on ice",
						className: "h-72 w-full object-cover lg:h-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-center px-6 py-14 sm:px-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-[0.22em] text-lilac uppercase",
								children: "Ice hold"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-4xl italic",
								children: "Stock that updates when the scale does."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-md text-lilac",
								children: "Receive a landing, mint a batch, and Aqua drops the kilos onto the right fish. Sales pull FIFO from the oldest crate so nothing sits too long in the sun."
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "trace",
				className: "mx-auto max-w-6xl px-4 py-20 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center gap-10 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
							children: "Traceability"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl",
							children: "Scan a crate. See the beach."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-ink-soft",
							children: "Try a live batch from Dunga. Hotels, county officers, and walk-in counters all land on the same public trail — no login."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-6 flex flex-col gap-3 sm:flex-row",
							onSubmit: (e) => {
								e.preventDefault();
								const next = code.trim().toUpperCase();
								if (next) navigate({
									to: "/trace/$code",
									params: { code: next }
								});
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: code,
								onChange: (e) => setCode(e.target.value),
								"aria-label": "Batch code",
								className: "font-mono uppercase"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "lg",
								children: "Trace batch"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted",
							children: "Sample codes: AQ-DUNGA-8841 · AQ-SIO-0091 · AQ-HOMA-1109"
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-xl shadow-[var(--shadow-lift)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/aqua/cold-room.jpg",
							alt: "Cold room of silver dagaa",
							className: "h-80 w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 bg-plum-deep/80 p-5 text-cream",
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "desk",
				className: "border-t border-border bg-paper py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
							children: "Three desks"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 max-w-xl font-display text-4xl text-plum-deep italic",
							children: "Owner, house manager, floor — same house, different keys."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-4 md:grid-cols-3",
							children: [
								{
									t: "Floor attendant",
									d: "Weigh-in, STK Push, print a receipt with a QR."
								},
								{
									t: "House manager",
									d: "Ice hold, cold chain, SMS desk, the daily pulse."
								},
								{
									t: "Owner",
									d: "M-Pesa mix, books, and every till in one cream workspace."
								}
							].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-xl bg-cream p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl italic text-plum-deep",
									children: c.t
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: c.d
								})]
							}, c.t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/enter",
									children: ["Choose a desk", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border bg-plum-deep py-10 text-cream",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaLogo, {
							invert: true,
							size: "sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-sm text-sm text-lilac",
							children: "Aqua keeps the lakeside fish house honest — catch, ice, till, trail."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm text-lilac",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4" }), "Daraja · Africa's Talking ready"]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
