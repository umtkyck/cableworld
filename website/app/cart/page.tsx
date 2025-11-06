'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-slate-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Your Cart is Empty</h1>
          <p className="text-slate-600 mb-8">Add some products to get started</p>
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
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-soft">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                    {item.image}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                    <div className="text-2xl font-bold text-primary-500 mb-4">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
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

            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 font-semibold"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-soft sticky top-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary-500">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full justify-center mb-4">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>

              <Link href="/shop" className="btn border-2 border-slate-300 text-slate-700 w-full justify-center">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
