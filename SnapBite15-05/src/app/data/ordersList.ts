import { Order, OrderStatus } from "../types/Order";

export const ordersList: Order[] = [
  {
    id: "ORD-001",
    userId: "u1",
    customerName: "João Silva",
    customerEmail: "joao@email.com",
    customerPhone: "(11) 99999-0001",
    address: "Rua das Flores, 123",
    items: [
      {
        productId: "h1",
        name: "Classic Smash",
        price: 32.9,
        quantity: 2,
      },
    ],
    subtotal: 65.8,
    deliveryFee: 5,
    total: 70.8,

    payment: {
      method: "pix",
      status: "approved",
    },

    status: "pending",

    statusHistory: [
      {
        status: "pending",
        time: "18:05",
        label: "Pedido recebido",
      },
    ],

    createdAt: new Date().toISOString(),
    estimatedTime: "30-45 min",
    notes: "",
  },
];

export const ORDER_STATUSES: Record<
  OrderStatus,
  {
    label: string;
    color: string;
    icon: string;
    next: OrderStatus | null;
  }
> = {
  pending: {
    label: "Recebido",
    color: "blue",
    icon: "📥",
    next: "production",
  },

  production: {
    label: "Em Produção",
    color: "purple",
    icon: "🍔",
    next: "sent",
  },

  sent: {
    label: "Enviado",
    color: "pink",
    icon: "🚚",
    next: "delivered",
  },

  delivered: {
    label: "Entregue",
    color: "green",
    icon: "✅",
    next: null,
  },
};

export function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus
) {
  const order = ordersList.find(
    (o) => o.id === orderId
  );

  if (!order) return;

  order.status = newStatus;

  const now = new Date();

  const time = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  order.statusHistory.push({
    status: newStatus,
    time,
    label: ORDER_STATUSES[newStatus].label,
  });
}