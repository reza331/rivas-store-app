export interface WalletResponse {
    data: {
        id: string,
        tenantId: string,
        userId: string,
        balance: number
    }
}

export interface CheckoutLine {
    productId: string;
    sku: string;
    vendorId: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    warehouseId: string;
}

export interface FulfillmentGroup {
    vendorId: string;
    items: CheckoutLine[];
    subtotal: number;
}

export interface CheckoutData {
    lines: CheckoutLine[];
    fulfillmentGroups: FulfillmentGroup[];
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
    currency: string;
}

export interface CheckoutResponse {
    data: CheckoutData;
}



export interface OrdersResponse {
    data: {
        items: Order[];
        nextCursor: string | null;
        total: number;
    };
}

export interface Order {
    id: string;
    tenantId: string;
    userId: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    shippingStatus: ShippingStatus;
    items: OrderItem[];
    allocations?: InventoryAllocation[];
    fulfillmentGroups?: FulfillmentGroup[];
    total: number;
    discount?: number;
    shipping?: number;
    subtotal?: number;
    addressId: string | null;
    version: number;
    createdAt: string;
    updatedAt: string;
}

export type OrderStatus =
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned"

export type PaymentStatus =
    | "unpaid"
    | "paid"
    | "failed"
    | "refunded";

export type ShippingStatus =
    | "not_shipped"
    | "shipped"
    | "delivered"
    | "returned";

export interface OrderItem {
    productId: string;
    sku?: string;
    vendorId?: string;
    quantity: number;
    unitPrice: number;
    subtotal?: number;
    warehouseId?: string;
}

export interface InventoryAllocation {
    inventoryId: string;
    productId: string;
    warehouseId: string;
    quantity: number;
}

export interface FulfillmentGroups {
    vendorId: string;
    items: OrderItem[];
    subtotal: number;
}