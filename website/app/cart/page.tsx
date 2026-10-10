'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-6 h-24 w-24 text-slate-300" />
          <h1 className="mb-4 text-3xl font-bold text-slate-900">Your Cart is Empty</h1>
          <p className="mb-8 text-slate-600">Add some products to get started</p>
          <Link href="/shop" className="btn-primary inline-flex">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-custom section-padding">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => (
              <div key={item.id} className="rounded-xl bg-white p-6 shadow-soft">
                <div className="flex gap-6">
                  <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-4xl">
                    {item.image}
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold text-slate-900">{item.name}</h3>
                    <div className="mb-4 text-2xl font-bold text-primary-500">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 hover:bg-slate-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 hover:bg-slate-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={clearCart} className="font-semibold text-red-500 hover:text-red-600">
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-xl bg-white p-6 shadow-soft">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">Order Summary</h2>

              <div className="mb-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary-500">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary mb-4 w-full justify-center">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="/shop"
                className="btn w-full justify-center border-2 border-slate-300 text-slate-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
