'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, Filter } from 'lucide-react'

interface ShopProduct {
  id: number
  category: string
  slug?: string
  name: string
  description: string
  price: string
  minOrder: number
  image: string
  specs: string[]
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'usb', name: 'USB Cables' },
    { id: 'hdmi', name: 'HDMI & Display' },
    { id: 'power', name: 'Power Cables' },
    { id: 'ethernet', name: 'Ethernet & Network' },
    { id: 'audio', name: 'Audio Cables' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'industrial', name: 'Industrial' }
  ]

  const products: ShopProduct[] = [
    {
      id: 1,
      category: 'usb',
      slug: 'usb-c-to-usb-c-cable',
      name: 'USB-C to USB-C Cable',
      description: 'High-speed USB-C cable with 100W power delivery',
      price: '$12.99',
      minOrder: 50,
      image: '🔌',
      specs: ['USB 3.2 Gen 2', '10Gbps', '100W PD', 'Custom lengths']
    },
    {
      id: 2,
      category: 'usb',
      slug: 'usb-c-to-lightning-cable',
      name: 'USB-C to Lightning Cable',
      description: 'MFi certified charging cable for Apple devices',
      price: '$15.99',
      minOrder: 50,
      image: '⚡',
      specs: ['MFi Certified', 'Fast charging', 'Durable braiding', 'Custom colors']
    },
    {
      id: 3,
      category: 'hdmi',
      slug: 'hdmi-2-1-cable',
      name: 'HDMI 2.1 Cable',
      description: '8K @ 60Hz, 4K @ 120Hz support cable',
      price: '$18.99',
      minOrder: 25,
      image: '📺',
      specs: ['HDMI 2.1', '48Gbps', 'eARC', 'Custom lengths']
    },
    {
      id: 4,
      category: 'hdmi',
      name: 'DisplayPort 1.4 Cable',
      description: 'High-performance display cable for monitors',
      price: '$16.99',
      minOrder: 25,
      image: '🖥️',
      specs: ['DP 1.4', '8K ready', 'HDR', 'Custom connectors']
    },
    {
      id: 5,
      category: 'power',
      name: 'AC Power Cable (IEC C13)',
      description: 'Standard computer power cable',
      price: '$4.99',
      minOrder: 100,
      image: '🔋',
      specs: ['15A rated', 'UL listed', 'Various lengths', 'Bulk pricing']
    },
    {
      id: 6,
      category: 'power',
      name: 'DC Power Cable Assembly',
      description: 'Custom DC power cables with barrel connectors',
      price: '$8.99',
      minOrder: 50,
      image: '⚡',
      specs: ['5.5x2.1mm', '12V/24V', 'Custom gauges', 'Various connectors']
    },
    {
      id: 7,
      category: 'ethernet',
      name: 'Cat6A Ethernet Cable',
      description: 'High-speed network cable for 10Gbps',
      price: '$6.99',
      minOrder: 100,
      image: '🌐',
      specs: ['Cat6A', '10Gbps', 'Shielded', 'Custom colors']
    },
    {
      id: 8,
      category: 'ethernet',
      name: 'Fiber Optic Patch Cable',
      description: 'Single/multi-mode fiber cables',
      price: '$24.99',
      minOrder: 20,
      image: '💫',
      specs: ['LC/SC connectors', 'Single/Multi-mode', 'Low loss', 'Custom lengths']
    },
    {
      id: 9,
      category: 'audio',
      name: 'XLR Microphone Cable',
      description: 'Professional balanced audio cable',
      price: '$11.99',
      minOrder: 50,
      image: '🎤',
      specs: ['3-pin XLR', 'Balanced', 'Low noise', 'Various lengths']
    },
    {
      id: 10,
      category: 'audio',
      name: '3.5mm Audio Cable',
      description: 'Stereo auxiliary cable with gold connectors',
      price: '$5.99',
      minOrder: 100,
      image: '🎧',
      specs: ['Gold plated', 'Stereo', 'Flexible', 'Bulk available']
    },
    {
      id: 11,
      category: 'automotive',
      name: 'Automotive Wire Harness',
      description: 'Custom automotive wiring assemblies',
      price: 'Quote',
      minOrder: 10,
      image: '🚗',
      specs: ['Waterproof', 'Temperature rated', 'Custom design', 'ISO certified']
    },
    {
      id: 12,
      category: 'automotive',
      name: 'OBD-II Diagnostic Cable',
      description: 'Vehicle diagnostic interface cables',
      price: '$22.99',
      minOrder: 25,
      image: '🔧',
      specs: ['16-pin connector', 'CAN compatible', 'Shielded', 'Custom protocols']
    },
    {
      id: 13,
      category: 'industrial',
      name: 'Industrial Control Cable',
      description: 'Multi-conductor control cables for automation',
      price: 'Quote',
      minOrder: 100,
      image: '⚙️',
      specs: ['Shielded', 'Oil resistant', 'Flex rated', 'Custom cores']
    },
    {
      id: 14,
      category: 'industrial',
      name: 'Sensor Cable Assembly',
      description: 'Industrial sensor connection cables',
      price: '$13.99',
      minOrder: 50,
      image: '📡',
      specs: ['M12 connectors', 'IP67 rated', 'PVC/PUR jacket', 'Custom lengths']
    },
    {
      id: 15,
      category: 'industrial',
      name: 'Motor Power Cable',
      description: 'Heavy-duty motor connection cables',
      price: 'Quote',
      minOrder: 25,
      image: '⚡',
      specs: ['High current', 'Flexible', 'Temperature rated', 'Custom voltage']
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Custom Cable Shop
          </h1>
          <p className="text-xl sm:text-2xl text-slate-200 max-w-3xl mx-auto">
            Browse our most popular custom cable products. All cables can be customized to your exact specifications.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="section-padding bg-slate-50 border-b">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <span className="font-semibold text-slate-900">Categories:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-8">
            <p className="text-slate-600">
              Showing <span className="font-semibold">{filteredProducts.length}</span> products
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-soft hover:shadow-large transition-shadow overflow-hidden group">
                {/* Product Image */}
                {product.slug ? (
                  <Link href={`/shop/${product.slug}`} className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-8xl group-hover:scale-105 transition-transform">
                    {product.image}
                  </Link>
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-8xl group-hover:scale-105 transition-transform">
                    {product.image}
                  </div>
                )}

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {product.slug ? (
                      <Link href={`/shop/${product.slug}`} className="hover:underline underline-offset-4">
                        {product.name}
                      </Link>
                    ) : (
                      product.name
                    )}
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.specs.slice(0, 2).map((spec, index) => (
                      <span key={index} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Price & MOQ */}
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-primary-500">
                        {product.price}
                      </div>
                      <div className="text-xs text-slate-500">
                        MOQ: {product.minOrder} units
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/quote?product=${encodeURIComponent(product.name)}`}
                    className="btn-primary w-full justify-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-slate-600 mb-4">No products found</p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Custom Cable CTA */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Don't See What You Need?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              We can manufacture any custom cable to your exact specifications. Upload your design or tell us what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="btn-primary text-lg">
                Get Custom Quote
              </Link>
              <Link href="/contact" className="btn border-2 border-primary-500 text-primary-500 hover:bg-primary-50 text-lg">
                Talk to an Engineer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
