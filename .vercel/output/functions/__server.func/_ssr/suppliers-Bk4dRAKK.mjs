import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-NF5EutoH.mjs";
import { a as useAquaRole } from "./role-BsZmttTl.mjs";
import { t as Card } from "./card-C3TFrwOd.mjs";
import { t as getMyAquaRole } from "./market-MTwPjtLG.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as PageHeader } from "./page-header-Db08d1KI.mjs";
import { t as Badge } from "./badge-CagA4FK0.mjs";
import { t as Input } from "./input-BvKihy7W.mjs";
import { t as Label } from "./label-BAlLFZIs.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CZeLWDmx.mjs";
import { _ as recordSupplierPayment, c as listDeliveries, h as recordDelivery, l as listFish, m as listSuppliers, n as addSupplier } from "./queries-CT8ciPVn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { n as kes, r as kg } from "./format-pMYX4z-1.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-BK5kESZO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/suppliers-Bk4dRAKK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var newLine = () => ({
	fishTypeId: "",
	quantityKg: "",
	unitCost: ""
});
function Suppliers() {
	const qc = useQueryClient();
	useAquaRole((state) => state.role);
	const role = useQuery({
		queryKey: ["aqua-staff-role"],
		queryFn: () => getMyAquaRole(),
		enabled: true
	}).data;
	const canManageSuppliers = role === "owner" || role === "manager";
	const canPaySuppliers = role === "owner" || role === "accounts";
	const suppliers = useQuery({
		queryKey: ["suppliers"],
		queryFn: () => listSuppliers()
	});
	const deliveries = useQuery({
		queryKey: ["deliveries"],
		queryFn: () => listDeliveries()
	});
	const fish = useQuery({
		queryKey: ["fish"],
		queryFn: () => listFish()
	});
	const [code, setCode] = (0, import_react.useState)("");
	const [supplierName, setSupplierName] = (0, import_react.useState)("");
	const [supplierKind, setSupplierKind] = (0, import_react.useState)("fisher");
	const [landing, setLanding] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [deliveryOpen, setDeliveryOpen] = (0, import_react.useState)(false);
	const [supplierId, setSupplierId] = (0, import_react.useState)("");
	const [deliveryLanding, setDeliveryLanding] = (0, import_react.useState)("");
	const [tempC, setTempC] = (0, import_react.useState)("2");
	const [note, setNote] = (0, import_react.useState)("");
	const [lines, setLines] = (0, import_react.useState)([newLine()]);
	const [paying, setPaying] = (0, import_react.useState)(null);
	const [paymentAmount, setPaymentAmount] = (0, import_react.useState)("");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("cash");
	const [paymentReference, setPaymentReference] = (0, import_react.useState)("");
	const deliveryTotal = (0, import_react.useMemo)(() => lines.reduce((sum, line) => sum + Number(line.quantityKg || 0) * Number(line.unitCost || 0), 0), [lines]);
	const add = useMutation({
		mutationFn: () => addSupplier({ data: {
			code,
			landingSite: landing,
			boatOrCoop: supplierName,
			supplierKind,
			phone
		} }),
		onSuccess: async () => {
			toast.success("Fisher or supplier added");
			setCode("");
			setSupplierName("");
			setLanding("");
			setPhone("");
			await qc.invalidateQueries({ queryKey: ["suppliers"] });
		},
		onError: (error) => toast.error(error.message)
	});
	const receive = useMutation({
		mutationFn: () => recordDelivery({ data: {
			supplierId: Number(supplierId),
			landingSite: deliveryLanding,
			tempC: Number(tempC),
			note,
			items: lines.map((line) => ({
				fishTypeId: Number(line.fishTypeId),
				quantityKg: Number(line.quantityKg),
				unitCost: Number(line.unitCost)
			}))
		} }),
		onSuccess: async (result) => {
			toast.success(`Delivery ${result.code} recorded · ${kes(result.totalCost)} purchase value`);
			setDeliveryOpen(false);
			setLines([newLine()]);
			setNote("");
			await qc.invalidateQueries();
		},
		onError: (error) => toast.error(error.message)
	});
	const pay = useMutation({
		mutationFn: () => recordSupplierPayment({ data: {
			deliveryId: paying.id,
			amount: Number(paymentAmount),
			method: paymentMethod,
			reference: paymentReference
		} }),
		onSuccess: async ({ balance }) => {
			toast.success(balance > 0 ? `Payment recorded · ${kes(balance)} still due` : "Supplier paid in full");
			setPaying(null);
			setPaymentReference("");
			await qc.invalidateQueries({ queryKey: ["deliveries"] });
		},
		onError: (error) => toast.error(error.message)
	});
	function openDelivery() {
		setSupplierId("");
		setDeliveryLanding("");
		setDeliveryOpen(true);
	}
	function openPayment(delivery) {
		setPaying(delivery);
		setPaymentAmount(delivery.balance.toFixed(2));
		setPaymentMethod("cash");
		setPaymentReference("");
	}
	function updateLine(index, patch) {
		setLines((current) => current.map((line, i) => i === index ? {
			...line,
			...patch
		} : line));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: canPaySuppliers && !canManageSuppliers ? "Accounts payable" : "Fish sourcing",
			title: canPaySuppliers && !canManageSuppliers ? "Settle supplier balances" : "From fisher to ice",
			description: canPaySuppliers && !canManageSuppliers ? "Review landing costs and outstanding balances, then record supplier payments." : "House managers register fish suppliers and receive landings. Supplier balances are reconciled here.",
			action: canManageSuppliers ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: openDelivery,
				disabled: !suppliers.data?.length,
				children: "Record delivery"
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"aria-labelledby": "supplier-list-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 flex items-end justify-between gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
					children: "Supply network"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "supplier-list-title",
					className: "mt-1 font-display text-2xl italic text-plum-deep",
					children: "Fishers, boats and co-ops"
				})] })
			}), suppliers.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-sm text-danger",
				children: "Supplier records could not be loaded."
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: [(suppliers.data ?? []).map((supplier) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-muted",
							children: supplier.code
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-xl italic text-plum-deep",
							children: supplier.boatOrCoop
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: supplier.supplierKind === "fisher" ? "ok" : "outline",
							children: supplier.supplierKind
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: supplier.landingSite
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: supplier.phone || "No phone recorded"
					})
				] }, supplier.id)), suppliers.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "sm:col-span-2 xl:col-span-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Register your first fisher or supplier to start receiving catch."
					})
				}) : null]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: `mt-8 grid items-start gap-4 ${canManageSuppliers ? "xl:grid-cols-[1fr_21rem]" : "xl:grid-cols-1"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
					children: "Receiving ledger"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl italic text-plum-deep",
					children: "Recent landings and amounts due"
				})]
			}), deliveries.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-sm text-danger",
				children: "Delivery records could not be loaded."
			}) }) : deliveries.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: deliveries.data.map((delivery) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-muted",
								children: delivery.code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-xl italic text-plum-deep",
								children: delivery.supplierName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									delivery.supplierCode,
									" · ",
									delivery.landingSite,
									" ·",
									" ",
									formatDistanceToNow(new Date(delivery.receivedAt), { addSuffix: true })
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: delivery.balance <= .01 ? "ok" : delivery.amountPaid > 0 ? "warn" : "danger",
							children: delivery.balance <= .01 ? "Settled" : delivery.amountPaid > 0 ? "Part paid" : "Unpaid"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-border border-y border-border",
						children: delivery.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap justify-between gap-x-4 gap-y-1 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								item.fishName,
								" · ",
								kg(item.quantityKg),
								" · ",
								item.batchCode
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: kes(item.quantityKg * item.unitCost)
							})]
						}, item.batchCode))
					}),
					delivery.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: ["Note: ", delivery.note]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [kg(delivery.totalKg), " · Total "]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: kes(delivery.totalCost) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-3 text-muted",
									children: [
										"Paid ",
										kes(delivery.amountPaid),
										" · Due",
										" "
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: kes(delivery.balance) })
							]
						}), canPaySuppliers && delivery.balance > .01 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => openPayment(delivery),
							children: "Record payment"
						}) : null]
					})
				] }, delivery.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No deliveries recorded yet."
			}) })] }), canManageSuppliers ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl italic text-plum-deep",
					children: "Register supplier"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-5 text-muted",
					children: "Add an individual fisher, boat, or cooperative before recording a delivery."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Supplier type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: supplierKind,
								onValueChange: setSupplierKind,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "fisher",
										children: "Individual fisher"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "boat",
										children: "Boat"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "cooperative",
										children: "Cooperative"
									})
								] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Supplier code",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: code,
								onChange: (event) => setCode(event.target.value),
								placeholder: "FISHER-001",
								maxLength: 40
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: supplierKind === "fisher" ? "Fisher's name" : "Boat or co-op name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: supplierName,
								onChange: (event) => setSupplierName(event.target.value),
								placeholder: "Name used in the ledger"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Usual landing site",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: landing,
								onChange: (event) => setLanding(event.target.value),
								placeholder: "Dunga Beach"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "tel",
								value: phone,
								onChange: (event) => setPhone(event.target.value),
								placeholder: "+254…",
								maxLength: 40
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							disabled: add.isPending || !code.trim() || !supplierName.trim() || !landing.trim(),
							onClick: () => add.mutate(),
							children: "Add supplier"
						})
					]
				})
			] }) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: deliveryOpen && canManageSuppliers,
			onOpenChange: setDeliveryOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-h-[90dvh] overflow-y-auto sm:max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Receive a fisher’s catch" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Weigh each species separately. Accepted weights create stock batches and a purchase payable." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Fisher or supplier",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: supplierId,
										onValueChange: (value) => {
											setSupplierId(value);
											const selected = suppliers.data?.find((supplier) => String(supplier.id) === value);
											if (selected) setDeliveryLanding(selected.landingSite);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose supplier" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (suppliers.data ?? []).map((supplier) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
											value: String(supplier.id),
											children: [
												supplier.boatOrCoop,
												" · ",
												supplier.code
											]
										}, supplier.id)) })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Actual landing site",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: deliveryLanding,
										onChange: (event) => setDeliveryLanding(event.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Receiving temperature (°C)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: -5,
										max: 20,
										step: .1,
										value: tempC,
										onChange: (event) => setTempC(event.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Delivery note (optional)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: note,
										onChange: (event) => setNote(event.target.value),
										maxLength: 500,
										placeholder: "Quality, rejected fish, or other notes"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-medium",
										children: "Species weighed"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "secondary",
										onClick: () => setLines((current) => [...current, newLine()]),
										disabled: lines.length >= 30,
										children: "Add species"
									})]
								}),
								lines.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 rounded-lg border border-border p-3 sm:grid-cols-[1.3fr_0.8fr_1fr_auto]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Fish",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: line.fishTypeId,
												onValueChange: (value) => updateLine(index, { fishTypeId: value }),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Species" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (fish.data ?? []).filter((item) => !lines.some((other, otherIndex) => otherIndex !== index && other.fishTypeId === String(item.id))).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: String(item.id),
													children: item.name
												}, item.id)) })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Accepted kg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												min: .1,
												step: .1,
												value: line.quantityKg,
												onChange: (event) => updateLine(index, { quantityKg: event.target.value })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Purchase KES/kg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												min: 0,
												step: 1,
												value: line.unitCost,
												onChange: (event) => updateLine(index, { unitCost: event.target.value })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-end",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: "ghost",
												size: "sm",
												disabled: lines.length === 1,
												onClick: () => setLines((current) => current.filter((_, i) => i !== index)),
												children: "Remove"
											})
										})
									]
								}, index)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-right text-sm text-muted",
									children: ["Purchase payable: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-ink",
										children: kes(deliveryTotal)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							disabled: receive.isPending || !supplierId || !deliveryLanding.trim() || lines.some((line) => !line.fishTypeId || Number(line.quantityKg) <= 0 || !Number.isFinite(Number(line.unitCost))),
							onClick: () => receive.mutate(),
							children: receive.isPending ? "Recording landing…" : "Record landing and add stock"
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!paying,
			onOpenChange: (open) => !open && setPaying(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Pay supplier" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: paying ? `${paying.supplierName} · ${paying.code} · ${kes(paying.balance)} outstanding` : "" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Amount paid (KES)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: .01,
							max: paying?.balance,
							step: .01,
							value: paymentAmount,
							onChange: (event) => setPaymentAmount(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Payment method",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: paymentMethod,
							onValueChange: setPaymentMethod,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "cash",
									children: "Cash"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "mpesa",
									children: "M-Pesa"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "bank",
									children: "Bank transfer"
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Transaction reference (optional)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: paymentReference,
							onChange: (event) => setPaymentReference(event.target.value),
							maxLength: 100
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						disabled: pay.isPending || Number(paymentAmount) <= 0 || Number(paymentAmount) > (paying?.balance ?? 0),
						onClick: () => pay.mutate(),
						children: "Record supplier payment"
					})
				]
			})] })
		})
	] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { Suppliers as component };
