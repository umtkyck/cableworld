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
    longDescription: 'Professional-grade USB-C to USB-C cable designed for high-speed data transfer and power delivery. Features reinforced connectors, braided cable sheath, and supports the latest USB 3.2 Gen 2 standard. Perfect for charging laptops, tablets, and smartphones while transferring data at blazing speeds.',
    price: 12.99,
    minOrder: 50,
    image: '🔌',
    specs: ['USB 3.2 Gen 2', '10Gbps data transfer', '100W Power Delivery', 'Custom lengths available', 'Braided nylon sheath', 'Reinforced connectors'],
    features: [
      'Supports 4K video output',
      'E-Marker chip for safe charging',
      'Compatible with Thunderbolt 3/4',
      'Durable 10,000+ bend lifespan',
      'RoHS compliant materials'
    ],
    customization: [
      'Length: 0.5m to 5m',
      'Colors: Black, White, Gray, Blue, Red',
      'Custom branding available',
      'Packaging options'
    ],
    reviews: [
      { author: 'Tech Solutions Inc.', rating: 5, text: 'Excellent quality cables. We ordered 500 units and they all passed our QC tests.' },
      { author: 'Startup Hardware Co.', rating: 5, text: 'Fast turnaround time and great customer service. Will order again.' }
    ]
  },
  'usb-c-to-lightning-cable': {
    id: 2,
    category: 'usb',
    name: 'USB-C to Lightning Cable',
    description: 'MFi certified charging cable for Apple devices',
    longDescription: 'Apple MFi certified USB-C to Lightning cable for fast charging and data sync. Officially certified by Apple to work flawlessly with all Lightning devices including iPhone, iPad, and AirPods.',
    price: 15.99,
    minOrder: 50,
    image: '⚡',
    specs: ['MFi Certified', 'Fast charging up to 20W', 'USB 2.0 data transfer', 'Durable braiding', 'Custom lengths', 'Apple certified chip'],
    features: [
      'Official Apple MFi certification',
      'Supports USB Power Delivery',
      'Compatible with all Lightning devices',
      'Reinforced strain relief',
      'Tangle-free design'
    ],
    customization: [
      'Length: 1m to 3m',
      'Colors: White, Black',
      'Custom branding with approval',
      'Retail or bulk packaging'
    ],
    reviews: [
      { author: 'Mobile Accessories Plus', rating: 5, text: 'MFi certification is legit. No issues with iOS updates.' },
      { author: 'Retail Chain Manager', rating: 5, text: 'Great margins and customers love the quality.' }
    ]
  },
  'hdmi-2-1-cable': {
    id: 3,
    category: 'hdmi',
    name: 'HDMI 2.1 Cable',
    description: '8K @ 60Hz, 4K @ 120Hz support cable',
    longDescription: 'Next-generation HDMI 2.1 cable supporting the latest gaming consoles, 8K TVs, and high-refresh displays. Ultra High Speed certification ensures full 48Gbps bandwidth.',
    price: 18.99,
    minOrder: 25,
    image: '📺',
    specs: ['HDMI 2.1 certified', '48Gbps bandwidth', '8K @ 60Hz support', '4K @ 120Hz support', 'eARC support', 'Custom lengths'],
    features: [
      'Variable Refresh Rate (VRR)',
      'Quick Frame Transport (QFT)',
      'Auto Low Latency Mode (ALLM)',
      'Dynamic HDR support',
      'Ultra High Speed certified'
    ],
    customization: [
      'Length: 1m to 10m',
      'Colors: Black, White',
      'Custom connectors available',
      'Premium packaging options'
    ],
    reviews: [
      { author: 'Gaming Accessories Ltd', rating: 5, text: 'Perfect for PS5 and Xbox Series X. Customers report no issues.' },
      { author: 'AV Installer Pro', rating: 5, text: 'Reliable cables for commercial installations.' }
    ]
  }
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Product Not Found</h1>
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
          className="flex items-center gap-2 text-slate-600 hover:text-primary-500 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shop
        </button>
      </div>

      {/* Product Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl aspect-square flex items-center justify-center">
              <div className="text-[200px]">{product.image}</div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <div className="text-sm text-accent-green font-semibold mb-2 uppercase">
                  {product.category}
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent-yellow text-accent-yellow" />
                    ))}
                  </div>
                  <span className="text-slate-600">({product.reviews.length} reviews)</span>
                </div>
                <p className="text-lg text-slate-600 mb-6">
                  {product.longDescription}
                </p>
              </div>

              {/* Price */}
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <div className="text-4xl font-bold text-primary-500 mb-2">
                  ${product.price} <span className="text-lg text-slate-600">/ unit</span>
                </div>
                <div className="text-sm text-slate-600 mb-4">
                  Minimum order: {product.minOrder} units
                </div>

                {/* Quantity Selector */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min={product.minOrder}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                  />
                </div>

                {/* Customization */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Length
                    </label>
                    <select
                      value={selectedLength}
                      onChange={(e) => setSelectedLength(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                    >
                      <option>1m</option>
                      <option>2m</option>
                      <option>3m</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Color
                    </label>
                    <select
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                    >
                      <option>Black</option>
                      <option>White</option>
                      <option>Gray</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>

                <div className="text-2xl font-bold text-slate-900 mb-6">
                  Total: ${totalPrice}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-primary flex-1 justify-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                  <Link
                    href={`/quote?product=${encodeURIComponent(product.name)}&quantity=${quantity}`}
                    className="btn border-2 border-primary-500 text-primary-500 hover:bg-primary-50 flex-1 justify-center"
                  >
                    Get Custom Quote
                  </Link>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-accent-green mx-auto mb-2" />
                  <div className="text-xs text-slate-600">Quality Guaranteed</div>
                </div>
                <div className="text-center">
                  <Truck className="w-8 h-8 text-accent-green mx-auto mb-2" />
                  <div className="text-xs text-slate-600">Fast Shipping</div>
                </div>
                <div className="text-center">
                  <Award className="w-8 h-8 text-accent-green mx-auto mb-2" />
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
          <div className="grid md:grid-cols-2 gap-8">
            {/* Specifications */}
            <div className="bg-white rounded-xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Specifications</h2>
              <ul className="space-y-3">
                {product.specs.map((spec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Customization Options */}
          <div className="bg-white rounded-xl p-8 shadow-soft mt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Customization Options</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {product.customization.map((option, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-yellow text-accent-yellow" />
                  ))}
                </div>
                <p className="text-slate-600 mb-3">{review.text}</p>
                <div className="font-semibold text-slate-900">{review.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
