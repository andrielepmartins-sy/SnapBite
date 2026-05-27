"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ChevronRight, LogOut } from "lucide-react";

import Header from "./componentes/Header";
import Baner from "./componentes/Baner";
import ModalAdicionarProduto from "./componentes/ModalAdicionarProduto";

import {
    ordersList,
    ORDER_STATUSES,
    updateOrderStatus,
} from "../data/ordersList";

export default function AdminPage() {
    const [selectedOrderId, setSelectedOrderId] =
        useState<string>("");

    const [filter, setFilter] =
        useState<string>("all");

    const [openModal, setOpenModal] =
        useState(false);

    const [, forceUpdate] = useState(0);

    // CONTADORES
    const counts = useMemo(() => {
        return {
            pending: ordersList.filter(
                (o) => o.status === "pending"
            ).length,

            production: ordersList.filter(
                (o) => o.status === "production"
            ).length,

            sent: ordersList.filter(
                (o) => o.status === "sent"
            ).length,

            delivered: ordersList.filter(
                (o) => o.status === "delivered"
            ).length,
        };
    }, [forceUpdate]);

    // FILTRO
    const filteredOrders = useMemo(() => {
        if (filter === "all") {
            return ordersList;
        }

        return ordersList.filter(
            (order) => order.status === filter
        );
    }, [filter, forceUpdate]);

    // PEDIDO SELECIONADO
    const selectedOrder =
        ordersList.find(
            (o) => o.id === selectedOrderId
        ) || null;

    // AVANÇAR STATUS
    function handleNextStatus(
        orderId: string
    ) {
        const order = ordersList.find(
            (o) => o.id === orderId
        );

        if (!order) return;

        const currentStatus =
            ORDER_STATUSES[
            order.status as keyof typeof ORDER_STATUSES
            ];

        const nextStatus =
            currentStatus?.next;

        if (!nextStatus) return;

        updateOrderStatus(
            orderId,
            nextStatus as keyof typeof ORDER_STATUSES
        );

        forceUpdate((prev) => prev + 1);
    }

    return (
        <main className="min-h-screen bg-[#1A1919] text-white p-6">
            <div className="max-w-[1500px] mx-auto">
                <Header
                    onOpenModal={() =>
                        setOpenModal(true)
                    }
                />

                <Baner counts={counts} />

                <ModalAdicionarProduto
                    open={openModal}
                    onClose={() =>
                        setOpenModal(false)
                    }
                />

                {/* filtros */}
                <div className="flex gap-4 mb-8 overflow-x-auto text-sm font-semibold">
                    {[
                        {
                            label: "Todos",
                            value: "all",
                        },
                        {
                            label: "Recebidos",
                            value: "pending",
                        },
                        {
                            label: "Produção",
                            value: "production",
                        },
                        {
                            label: "Enviados",
                            value: "sent",
                        },
                        {
                            label: "Entregues",
                            value: "delivered",
                        },
                    ].map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() =>
                                setFilter(tab.value)
                            }
                            className={`px-5 py-2 rounded-xl transition whitespace-nowrap ${filter === tab.value
                                ? "bg-orange-500 text-white"
                                : "bg-[#222121] text-gray-400 hover:text-white"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-[420px_1fr] gap-8">
                    {/* LISTA PEDIDOS */}
                    <section className="flex flex-col gap-5">
                        {filteredOrders.map((order) => {
                            const currentStatus =
                                ORDER_STATUSES[
                                order.status as keyof typeof ORDER_STATUSES
                                ];

                            return (
                                <button
                                    key={order.id}
                                    onClick={() =>
                                        setSelectedOrderId(
                                            order.id
                                        )
                                    }
                                    className={`text-left rounded-3xl p-5 border transition ${selectedOrder?.id ===
                                        order.id
                                        ? "border-orange-500 bg-[#222121]"
                                        : "border-[#2D2B2B] bg-[#1E1D1D]"
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-3xl font-black">
                                                {order.id}
                                            </h2>

                                            <span className="bg-[#2D2B2B] text-xs px-3 py-1 rounded-full mt-2 inline-block">
                                                {
                                                    currentStatus.label
                                                }
                                            </span>
                                        </div>

                                        <ChevronRight />
                                    </div>

                                    <div className="flex justify-between mt-5 text-sm text-gray-400">
                                        <div>
                                            <p>Cliente</p>
                                            <span className="text-white font-semibold">
                                                {
                                                    order.customerName
                                                }
                                            </span>
                                        </div>

                                        <div className="text-right">
                                            <p>Total</p>

                                            <span className="text-orange-500 font-black text-xl">
                                                R${" "}
                                                {order.total
                                                    .toFixed(2)
                                                    .replace(
                                                        ".",
                                                        ","
                                                    )}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </section>

                    {/* PRONTUÁRIO */}
                    {selectedOrder && (
                        <section className="bg-[#1E1D1D] rounded-[40px] border border-[#2D2B2B] p-10">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    {/* voltar */}
                                    <button
                                        onClick={() =>
                                            setSelectedOrderId(
                                                ""
                                            )
                                        }
                                        className="mb-5 text-gray-400 hover:text-white transition"
                                    >
                                        <ArrowLeft />
                                    </button>

                                    <h1 className="text-5xl font-black mb-4">
                                        Prontuário do
                                        Pedido
                                    </h1>

                                    <p className="text-xs uppercase tracking-[4px] text-orange-500">
                                        protocolo
                                    </p>

                                    <h2 className="text-7xl font-black">
                                        {
                                            selectedOrder.id
                                        }
                                    </h2>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <span className="bg-purple-600 text-purple-300 px-5 py-3 rounded-full text-sm font-semibold">
                                        {
                                            ORDER_STATUSES[
                                                selectedOrder.status as keyof typeof ORDER_STATUSES
                                            ].label
                                        }
                                    </span>

                                    <button
                                        onClick={() =>
                                            window.location.assign(
                                                "/"
                                            )
                                        }
                                        className="text-zinc-400 hover:text-red-500 transition"
                                    >
                                        <LogOut
                                            size={22}
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <p className="text-xs uppercase text-gray-500 mb-3">
                                        Informações do
                                        cliente
                                    </p>

                                    <div className="space-y-2 text-lg">
                                        <p>
                                            {
                                                selectedOrder.customerName
                                            }
                                        </p>

                                        <p>
                                            {
                                                selectedOrder.customerPhone
                                            }
                                        </p>

                                        <p>
                                            {
                                                selectedOrder.customerEmail
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs uppercase text-gray-500 mb-3">
                                        Local de
                                        entrega
                                    </p>

                                    <p>
                                        {
                                            selectedOrder.address
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs uppercase text-gray-500 mb-3">
                                        Pedido
                                    </p>

                                    <div className="space-y-3">
                                        {selectedOrder.items.map(
                                            (
                                                item,
                                                index
                                            ) => (
                                                <div
                                                    key={
                                                        index
                                                    }
                                                    className="flex justify-between bg-[#222121] rounded-2xl p-4"
                                                >
                                                    <span>
                                                        {
                                                            item.quantity
                                                        }
                                                        x{" "}
                                                        {
                                                            item.name
                                                        }
                                                    </span>

                                                    <span>
                                                        R${" "}
                                                        {(
                                                            item.price *
                                                            item.quantity
                                                        )
                                                            .toFixed(
                                                                2
                                                            )
                                                            .replace(
                                                                ".",
                                                                ","
                                                            )}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                        handleNextStatus(
                                            selectedOrder.id
                                        )
                                    }
                                    className="w-full bg-orange-500 hover:opacity-90 transition py-5 rounded-3xl font-bold text-lg"
                                >
                                    Avançar Pedido
                                </button>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}