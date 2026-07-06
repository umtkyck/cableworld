import { FieldValue } from 'firebase-admin/firestore'
import { getAdminDb, isAdminConfigured } from '@/lib/firebase-admin'
import type { CreateOrderInput, OrderRecord } from '@/lib/orders/types'

function docToOrder(id: string, data: FirebaseFirestore.DocumentData): OrderRecord {
  return {
    id,
    orderRef: String(data.orderRef ?? id),
    userId: data.userId,
    customerEmail: String(data.customerEmail ?? ''),
    customerName: data.customerName,
    quoteId: data.quoteId,
    status: data.status,
    paymentMethod: data.paymentMethod,
    subtotal: Number(data.subtotal ?? 0),
    shippingCost: Number(data.shippingCost ?? 0),
    total: Number(data.total ?? 0),
    items: Array.isArray(data.items) ? data.items : [],
    shipping: data.shipping,
    stripePaymentIntentId: data.stripePaymentIntentId,
    tracking: data.tracking ?? null,
    estimatedDelivery: data.estimatedDelivery ?? null,
    deliveryDate: data.deliveryDate ?? null,
    createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
  }
}

export async function createOrder(input: CreateOrderInput): Promise<OrderRecord | null> {
  if (!isAdminConfigured()) {
    console.warn('[orders] FIREBASE_SERVICE_ACCOUNT_JSON not set — order not persisted:', input.orderRef)
    return null
  }

  const db = getAdminDb()
  const ref = db.collection('orders').doc(input.orderRef)
  const existing = await ref.get()
  if (existing.exists) {
    return docToOrder(existing.id, existing.data()!)
  }

  const payload = {
    ...input,
    tracking: null,
    estimatedDelivery: null,
    deliveryDate: null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }

  await ref.set(payload)
  const saved = await ref.get()
  return docToOrder(saved.id, saved.data()!)
}

export async function updateOrderStatus(
  orderRef: string,
  status: CreateOrderInput['status'],
  extra: Partial<OrderRecord> = {}
): Promise<void> {
  if (!isAdminConfigured()) return
  const db = getAdminDb()
  await db.collection('orders').doc(orderRef).set(
    { status, ...extra, updatedAt: FieldValue.serverTimestamp() },
    { merge: true }
  )
}

export async function getOrdersForUser(userId: string, email: string): Promise<OrderRecord[]> {
  if (!isAdminConfigured()) return []

  const db = getAdminDb()
  const byUser = await db.collection('orders').where('userId', '==', userId).limit(50).get()
  const byEmail = email
    ? await db.collection('orders').where('customerEmail', '==', email).limit(50).get()
    : null

  const map = new Map<string, OrderRecord>()
  for (const doc of byUser.docs) {
    map.set(doc.id, docToOrder(doc.id, doc.data()))
  }
  if (byEmail) {
    for (const doc of byEmail.docs) {
      map.set(doc.id, docToOrder(doc.id, doc.data()))
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function getAllOrders(limit = 50): Promise<OrderRecord[]> {
  if (!isAdminConfigured()) return []
  const db = getAdminDb()
  const snap = await db.collection('orders').orderBy('createdAt', 'desc').limit(limit).get()
  return snap.docs.map((doc) => docToOrder(doc.id, doc.data()))
}

export async function getOrderStats(): Promise<{
  openOrders: number
  revenue30d: number
  totalOrders: number
}> {
  if (!isAdminConfigured()) {
    return { openOrders: 0, revenue30d: 0, totalOrders: 0 }
  }

  const orders = await getAllOrders(200)
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
  const openStatuses = new Set(['awaiting_payment', 'pending', 'processing'])

  return {
    openOrders: orders.filter((o) => openStatuses.has(o.status)).length,
    revenue30d: orders
      .filter((o) => new Date(o.createdAt).getTime() >= thirtyDaysAgo && o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0),
    totalOrders: orders.length,
  }
}

export async function getOrderByPaymentIntent(paymentIntentId: string): Promise<OrderRecord | null> {
  if (!isAdminConfigured()) return null
  const db = getAdminDb()
  const snap = await db
    .collection('orders')
    .where('stripePaymentIntentId', '==', paymentIntentId)
    .limit(1)
    .get()
  if (snap.empty) return null
  const doc = snap.docs[0]
  return docToOrder(doc.id, doc.data())
}
