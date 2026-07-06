export type OrderStatus =
  | 'awaiting_payment'
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type PaymentMethod = 'card' | 'bank'

export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface OrderShipping {
  carrierName?: string
  service?: string
  amount?: number
  address?: {
    name: string
    street1: string
    street2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
}

export interface OrderRecord {
  id: string
  orderRef: string
  userId?: string
  customerEmail: string
  customerName?: string
  quoteId?: string
  status: OrderStatus
  paymentMethod: PaymentMethod
  subtotal: number
  shippingCost: number
  total: number
  items: OrderItem[]
  shipping?: OrderShipping
  stripePaymentIntentId?: string
  tracking?: string | null
  estimatedDelivery?: string | null
  deliveryDate?: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateOrderInput {
  orderRef: string
  userId?: string
  customerEmail: string
  customerName?: string
  quoteId?: string
  status: OrderStatus
  paymentMethod: PaymentMethod
  subtotal: number
  shippingCost: number
  total: number
  items: OrderItem[]
  shipping?: OrderShipping
  stripePaymentIntentId?: string
}
