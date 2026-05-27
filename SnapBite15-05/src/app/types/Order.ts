export type OrderStatus =
  | "pending"
  | "production"
  | "sent"
  | "delivered";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;

  items: OrderItem[];

  subtotal: number;
  deliveryFee: number;
  total: number;

  payment: {
    method: string;
    status: string;
  };

  status: OrderStatus;

  statusHistory: {
    status: OrderStatus;
    time: string;
    label: string;
  }[];

  createdAt: string;
  estimatedTime: string;
  notes: string;
}