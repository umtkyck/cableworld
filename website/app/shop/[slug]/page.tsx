'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingCart, Check, Star, ArrowLeft, Shield, Truck, Award } from 'lucide-react'

// Product data (in real app, fetch from API)
const productDatabase = {
  'usb-c-to-usb-c-cable': {
    id: 1,
    category: 'usb',
    name: 'USB-C to USB-C Cable',
    description: 'High-speed USB-C cable with 100W power delivery',
    longDescription:
      'Professional-grade USB-C to USB-C cable designed for high-speed data transfer and power delivery. Features reinforced connectors, braided cable sheath, and supports the latest USB 3.2 Gen 2 standard. Perfect for charging laptops, tablets, and smartphones while transferring data at blazing speeds.',
    price: 12.99,
    minOrder: 50,
    image: '🔌',
    specs: [
      'USB 3.2 Gen 2',
      '10Gbps data transfer',
      '100W Power Delivery',
      'Custom lengths available',
      'Braided nylon sheath',
      'Reinforced connectors',
    ],
    features: [
      'Supports 4K video output',
      'E-Marker chip for safe charging',
      'Compatible with Thunderbolt 3/4',
      'Durable 10,000+ bend lifespan',
      'RoHS compliant materials',
    ],
    customization: [
      'Length: 0.5m to 5m',
      'Colors: Black, White, Gray, Blue, Red',
      'Custom branding available',
      'Packaging options',
    ],
    reviews: [
      {
        author: 'Tech Solutions Inc.',
        rating: 5,
        text: 'Excellent quality cables. We ordered 500 units and they all passed our QC tests.',
      },
      {
        author: 'Startup Hardware Co.',
        rating: 5,
        text: 'Fast turnaround time and great customer service. Will order again.',
      },
    ],
  },
  'usb-c-to-lightning-cable': {
    id: 2,
    category: 'usb',
    name: 'USB-C to Lightning Cable',
    description: 'MFi certified charging cable for Apple devices',
    longDescription:
      'Apple MFi certified USB-C to Lightning cable for fast charging and data sync. Officially certified by Apple to work flawlessly with all Lightning devices including iPhone, iPad, and AirPods.',
    price: 15.99,
    minOrder: 50,
    image: '⚡',
    specs: [
      'MFi Certified',
      'Fast charging up to 20W',
      'USB 2.0 data transfer',
      'Durable braiding',
      'Custom lengths',
      'Apple certified chip',
    ],
    features: [
      'Official Apple MFi certification',
      'Supports USB Power Delivery',
      'Compatible with all Lightning devices',
      'Reinforced strain relief',
      'Tangle-free design',
    ],
    customization: [
      'Length: 1m to 3m',
      'Colors: White, Black',
      'Custom branding with approval',
      'Retail or bulk packaging',
    ],
    reviews: [
      {
        author: 'Mobile Accessories Plus',
        rating: 5,
        text: 'MFi certification is legit. No issues with iOS updates.',
      },
      {
        author: 'Retail Chain Manager',
        rating: 5,
        text: 'Great margins and customers love the quality.',
      },
    ],
  },
  'hdmi-2-1-cable': {
    id: 3,
    category: 'hdmi',
    name: 'HDMI 2.1 Cable',
    description: '8K @ 60Hz, 4K @ 120Hz support cable',
    longDescription:
      'Next-generation HDMI 2.1 cable supporting the latest gaming consoles, 8K TVs, and high-refresh displays. Ultra High Speed certification ensures full 48Gbps bandwidth.',
    price: 18.99,
    minOrder: 25,
    image: '📺',
    specs: [
      'HDMI 2.1 certified',
      '48Gbps bandwidth',
      '8K @ 60Hz support',
      '4K @ 120Hz support',
      'eARC support',
      'Custom lengths',
    ],
    features: [
      'Variable Refresh Rate (VRR)',
      'Quick Frame Transport (QFT)',
      'Auto Low Latency Mode (ALLM)',
      'Dynamic HDR support',
      'Ultra High Speed certified',
    ],
    customization: [
      'Length: 1m to 10m',
      'Colors: Black, White',
      'Custom connectors available',
      'Premium packaging options',
    ],
    reviews: [
      {
        author: 'Gaming Accessories Ltd',
        rating: 5,
        text: 'Perfect for PS5 and Xbox Series X. Customers report no issues.',
      },
      {
        author: 'AV Installer Pro',
        rating: 5,
        text: 'Reliable cables for commercial installations.',
      },
    ],
  },
  // Add more products as needed
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [quantity, setQuantity] = useState(50)
  const [selectedLength, setSelectedLength] = useState('1m')
  const [selectedColor, setSelectedColor] = useState('Black')

  const product = productDatabase[slug as keyof typeof productDatabase]

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Product Not Found</h1>
          <Link href="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const totalPrice = (product.price * quantity).toFixed(2)

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container-custom pt-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 transition hover:text-primary-500"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Shop
        </button>
      </div>

      {/* Product Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Product Image */}
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
              <div className="text-[200px]">{product.image}</div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <div className="mb-2 text-sm font-semibold uppercase text-accent-green">
                  {product.category}
                </div>
                <h1 className="mb-4 text-4xl font-bold text-slate-900">{product.name}</h1>
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent-yellow text-accent-yellow" />
                    ))}
                  </div>
                  <span className="text-slate-600">({product.reviews.length} reviews)</span>
                </div>
                <p className="mb-6 text-lg text-slate-600">{product.longDescription}</p>
              </div>

              {/* Price */}
              <div className="mb-6 rounded-xl bg-slate-50 p-6">
                <div className="mb-2 text-4xl font-bold text-primary-500">
                  ${product.price} <span className="text-lg text-slate-600">/ unit</span>
                </div>
                <div className="mb-4 text-sm text-slate-600">
                  Minimum order: {product.minOrder} units
                </div>

                {/* Quantity Selector */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Quantity</label>
                  <input
                    type="number"
                    min={product.minOrder}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder)
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  />
                </div>

                {/* Customization */}
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Length</label>
                    <select
                      value={selectedLength}
                      onChange={(e) => setSelectedLength(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    >
                      <option>1m</option>
                      <option>2m</option>
                      <option>3m</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Color</label>
                    <select
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    >
                      <option>Black</option>
                      <option>White</option>
                      <option>Gray</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6 text-2xl font-bold text-slate-900">Total: ${totalPrice}</div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <button className="btn-primary flex-1 justify-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </button>
                  <Link
                    href={`/quote?product=${encodeURIComponent(product.name)}&quantity=${quantity}`}
                    className="btn flex-1 justify-center border-2 border-primary-500 text-primary-500 hover:bg-primary-50"
                  >
                    Get Custom Quote
                  </Link>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Shield className="mx-auto mb-2 h-8 w-8 text-accent-green" />
                  <div className="text-xs text-slate-600">Quality Guaranteed</div>
                </div>
                <div className="text-center">
                  <Truck className="mx-auto mb-2 h-8 w-8 text-accent-green" />
                  <div className="text-xs text-slate-600">Fast Shipping</div>
                </div>
                <div className="text-center">
                  <Award className="mx-auto mb-2 h-8 w-8 text-accent-green" />
                  <div className="text-xs text-slate-600">Certified Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs & Features */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Specifications */}
            <div className="rounded-xl bg-white p-8 shadow-soft">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">Specifications</h2>
              <ul className="space-y-3">
                {product.specs.map((spec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-green" />
                    <span className="text-slate-600">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="rounded-xl bg-white p-8 shadow-soft">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-green" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Customization Options */}
          <div className="mt-8 rounded-xl bg-white p-8 shadow-soft">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Customization Options</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.customization.map((option, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-green" />
                  <span className="text-slate-600">{option}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold text-slate-900">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <div key={index} className="rounded-xl bg-white p-6 shadow-soft">
                <div className="mb-3 flex items-center gap-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent-yellow text-accent-yellow" />
                  ))}
                </div>
                <p className="mb-3 text-slate-600">{review.text}</p>
                <div className="font-semibold text-slate-900">{review.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
