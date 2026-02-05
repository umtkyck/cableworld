'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Trash2, Download, Save, Calculator, Zap, Cable as CableIcon, Circle, Check } from 'lucide-react'
import TestServicesAddOn from '@/components/TestServicesAddOn'
import { useCart } from '@/context/CartContext'

interface Connector {
  id: string
  name: string
  manufacturer: string
  partNumber: string
  pins: number
  price: number
  supplier: 'DigiKey' | 'Mouser' | 'McMaster'
  type: 'Male' | 'Female'
}

interface CableType {
  id: string
  name: string
  awg: number
  conductors: number
  price: number
  partNumber: string
  supplier: 'DigiKey' | 'Mouser' | 'McMaster'
}

interface CrimpPin {
  id: string
  name: string
  partNumber: string
  awg: string
  price: number
  supplier: 'DigiKey' | 'Mouser' | 'McMaster'
}

interface PinConnection {
  from: number
  to: number
  wireColor: string
}

export default function CableDesignerPage() {
  const router = useRouter()
  const { addItem } = useCart()

  // Component selections
  const [connectorA, setConnectorA] = useState<Connector | null>(null)
  const [connectorB, setConnectorB] = useState<Connector | null>(null)
  const [selectedCable, setSelectedCable] = useState<CableType | null>(null)
  const [selectedCrimp, setSelectedCrimp] = useState<CrimpPin | null>(null)
  const [cableLength, setCableLength] = useState<number>(1)

  // Pin connections
  const [connections, setConnections] = useState<PinConnection[]>([])
  const [selectedFromPin, setSelectedFromPin] = useState<number | null>(null)

  // Test services
  const [testServicesTotal, setTestServicesTotal] = useState<number>(0)

  // Search
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSupplier, setSearchSupplier] = useState<'DigiKey' | 'Mouser' | 'McMaster'>('DigiKey')

  // UI State
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [addedToCart, setAddedToCart] = useState(false)

  // Sample data - In production, these would come from APIs
  const connectors: Connector[] = [
    { id: '1', name: 'D-Sub 9 Pin', manufacturer: 'TE Connectivity', partNumber: 'A-DS 09 A/KG-T4-S', pins: 9, price: 2.45, supplier: 'DigiKey', type: 'Male' },
    { id: '2', name: 'D-Sub 9 Pin', manufacturer: 'TE Connectivity', partNumber: 'A-DS 09 LL/KG-P', pins: 9, price: 2.65, supplier: 'DigiKey', type: 'Female' },
    { id: '3', name: 'JST 4 Pin', manufacturer: 'JST', partNumber: 'B4B-XH-A', pins: 4, price: 0.48, supplier: 'Mouser', type: 'Female' },
    { id: '4', name: 'Molex 6 Pin', manufacturer: 'Molex', partNumber: '22-01-3067', pins: 6, price: 0.95, supplier: 'DigiKey', type: 'Male' },
    { id: '5', name: 'Phoenix 8 Pin', manufacturer: 'Phoenix Contact', partNumber: '1757019', pins: 8, price: 4.20, supplier: 'McMaster', type: 'Male' },
    { id: '6', name: 'Amphenol 12 Pin', manufacturer: 'Amphenol', partNumber: 'C091-31D012-100-2', pins: 12, price: 8.95, supplier: 'DigiKey', type: 'Female' },
  ]

  const cables: CableType[] = [
    { id: '1', name: '4C 22 AWG Shielded', awg: 22, conductors: 4, price: 1.25, partNumber: 'C2919A-100', supplier: 'DigiKey' },
    { id: '2', name: '6C 24 AWG Unshielded', awg: 24, conductors: 6, price: 0.85, partNumber: 'BEL-1192A-100', supplier: 'Mouser' },
    { id: '3', name: '8C 20 AWG Shielded', awg: 20, conductors: 8, price: 2.15, partNumber: '8418-100', supplier: 'McMaster' },
    { id: '4', name: '2C 18 AWG Power', awg: 18, conductors: 2, price: 0.95, partNumber: 'C2413A-100', supplier: 'DigiKey' },
  ]

  const crimpPins: CrimpPin[] = [
    { id: '1', name: 'D-Sub Crimp Pin', partNumber: '66505-2', awg: '22-26', price: 0.12, supplier: 'DigiKey' },
    { id: '2', name: 'JST Crimp Terminal', partNumber: 'SXH-001T-P0.6', awg: '26-30', price: 0.08, supplier: 'Mouser' },
    { id: '3', name: 'Molex Crimp Terminal', partNumber: '08-50-0114', awg: '20-24', price: 0.10, supplier: 'DigiKey' },
    { id: '4', name: 'Phoenix Crimp Pin', partNumber: '3240015', awg: '18-22', price: 0.15, supplier: 'McMaster' },
  ]

  const wireColors = ['Red', 'Black', 'White', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple', 'Brown', 'Gray']

  const handleAddConnection = (toPin: number) => {
    if (selectedFromPin === null) return

    const existingConnection = connections.find(c => c.from === selectedFromPin)
    if (existingConnection) {
      // Update existing connection
      setConnections(connections.map(c =>
        c.from === selectedFromPin ? { ...c, to: toPin } : c
      ))
    } else {
      // Add new connection
      const colorIndex = connections.length % wireColors.length
      setConnections([...connections, {
        from: selectedFromPin,
        to: toPin,
        wireColor: wireColors[colorIndex]
      }])
    }
    setSelectedFromPin(null)
  }

  const handleRemoveConnection = (from: number) => {
    setConnections(connections.filter(c => c.from !== from))
  }

  const calculateQuote = () => {
    let total = 0

    if (connectorA) total += connectorA.price
    if (connectorB) total += connectorB.price
    if (selectedCable) total += selectedCable.price * cableLength
    if (selectedCrimp) total += selectedCrimp.price * connections.length * 2 // 2 crimps per connection

    // Labor cost (per connection)
    const laborPerConnection = 2.50
    total += connections.length * laborPerConnection

    // Assembly overhead
    const overhead = total * 0.15
    total += overhead

    // Add test services
    total += testServicesTotal

    return total
  }

  const handleSaveDesign = () => {
    const design = {
      id: `design-${Date.now()}`,
      savedAt: new Date().toISOString(),
      connectorA,
      connectorB,
      selectedCable,
      selectedCrimp,
      cableLength,
      connections,
      testServicesTotal,
      totalPrice: calculateQuote()
    }

    // Save to localStorage
    const savedDesigns = JSON.parse(localStorage.getItem('cableDesigns') || '[]')
    savedDesigns.push(design)
    localStorage.setItem('cableDesigns', JSON.stringify(savedDesigns))

    setSaveMessage('Design saved successfully!')
    setTimeout(() => setSaveMessage(null), 3000)
  }

  const handleExportBOM = () => {
    const bomItems = []

    if (connectorA) {
      bomItems.push({
        partNumber: connectorA.partNumber,
        description: `${connectorA.name} (${connectorA.type})`,
        manufacturer: connectorA.manufacturer,
        supplier: connectorA.supplier,
        quantity: 1,
        unitPrice: connectorA.price,
        total: connectorA.price
      })
    }

    if (connectorB) {
      bomItems.push({
        partNumber: connectorB.partNumber,
        description: `${connectorB.name} (${connectorB.type})`,
        manufacturer: connectorB.manufacturer,
        supplier: connectorB.supplier,
        quantity: 1,
        unitPrice: connectorB.price,
        total: connectorB.price
      })
    }

    if (selectedCable) {
      bomItems.push({
        partNumber: selectedCable.partNumber,
        description: selectedCable.name,
        manufacturer: 'Various',
        supplier: selectedCable.supplier,
        quantity: cableLength,
        unitPrice: selectedCable.price,
        total: selectedCable.price * cableLength
      })
    }

    if (selectedCrimp && connections.length > 0) {
      bomItems.push({
        partNumber: selectedCrimp.partNumber,
        description: selectedCrimp.name,
        manufacturer: 'Various',
        supplier: selectedCrimp.supplier,
        quantity: connections.length * 2,
        unitPrice: selectedCrimp.price,
        total: selectedCrimp.price * connections.length * 2
      })
    }

    // Create CSV
    const headers = ['Part Number', 'Description', 'Manufacturer', 'Supplier', 'Qty', 'Unit Price', 'Total']
    const rows = bomItems.map(item => [
      item.partNumber,
      item.description,
      item.manufacturer,
      item.supplier,
      item.quantity,
      `$${item.unitPrice.toFixed(2)}`,
      `$${item.total.toFixed(2)}`
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cable-bom-${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleAddToCart = () => {
    if (!connectorA || !connectorB) {
      setSaveMessage('Please select both connectors first')
      setTimeout(() => setSaveMessage(null), 3000)
      return
    }

    const designName = `Custom Cable: ${connectorA.name} to ${connectorB.name}`
    addItem({
      id: `custom-cable-${Date.now()}`,
      name: designName,
      price: calculateQuote(),
      quantity: 1
    })

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Cable Designer</h1>
              <p className="text-lg text-slate-600">
                Design your custom cable harness and get instant pricing
              </p>
            </div>
            <div className="flex gap-3 items-center">
              {saveMessage && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  {saveMessage}
                </span>
              )}
              <button onClick={handleSaveDesign} className="btn-secondary flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Design
              </button>
              <button onClick={handleExportBOM} className="btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export BOM
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left Panel - Component Selection */}
          <div className="lg:col-span-3 space-y-4">

            {/* Part Search */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Search className="w-5 h-5 text-primary-500" />
                Part Search
              </h3>

              <div className="space-y-3">
                <select
                  value={searchSupplier}
                  onChange={(e) => setSearchSupplier(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="DigiKey">Digi-Key</option>
                  <option value="Mouser">Mouser</option>
                  <option value="McMaster">McMaster-Carr</option>
                </select>

                <input
                  type="text"
                  placeholder="Enter part number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />

                <button className="w-full btn-primary text-sm py-2">
                  <Search className="w-4 h-4 inline mr-2" />
                  Search
                </button>
              </div>
            </div>

            {/* Connector A Selection */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Connector A (Side 1)</h3>
              <select
                value={connectorA?.id || ''}
                onChange={(e) => setConnectorA(connectors.find(c => c.id === e.target.value) || null)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm mb-2"
              >
                <option value="">Select Connector...</option>
                {connectors.map(conn => (
                  <option key={conn.id} value={conn.id}>
                    {conn.name} - {conn.pins}P ({conn.type})
                  </option>
                ))}
              </select>
              {connectorA && (
                <div className="text-xs space-y-1 bg-slate-50 p-3 rounded">
                  <p><strong>P/N:</strong> {connectorA.partNumber}</p>
                  <p><strong>Manufacturer:</strong> {connectorA.manufacturer}</p>
                  <p><strong>Supplier:</strong> {connectorA.supplier}</p>
                  <p><strong>Price:</strong> ${connectorA.price.toFixed(2)}</p>
                </div>
              )}
            </div>

            {/* Connector B Selection */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Connector B (Side 2)</h3>
              <select
                value={connectorB?.id || ''}
                onChange={(e) => setConnectorB(connectors.find(c => c.id === e.target.value) || null)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm mb-2"
              >
                <option value="">Select Connector...</option>
                {connectors.map(conn => (
                  <option key={conn.id} value={conn.id}>
                    {conn.name} - {conn.pins}P ({conn.type})
                  </option>
                ))}
              </select>
              {connectorB && (
                <div className="text-xs space-y-1 bg-slate-50 p-3 rounded">
                  <p><strong>P/N:</strong> {connectorB.partNumber}</p>
                  <p><strong>Manufacturer:</strong> {connectorB.manufacturer}</p>
                  <p><strong>Supplier:</strong> {connectorB.supplier}</p>
                  <p><strong>Price:</strong> ${connectorB.price.toFixed(2)}</p>
                </div>
              )}
            </div>

            {/* Cable Selection */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Cable Type</h3>
              <select
                value={selectedCable?.id || ''}
                onChange={(e) => setSelectedCable(cables.find(c => c.id === e.target.value) || null)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm mb-2"
              >
                <option value="">Select Cable...</option>
                {cables.map(cable => (
                  <option key={cable.id} value={cable.id}>
                    {cable.name}
                  </option>
                ))}
              </select>

              <div className="mt-3">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Length (meters)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={cableLength}
                  onChange={(e) => setCableLength(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              {selectedCable && (
                <div className="text-xs space-y-1 bg-slate-50 p-3 rounded mt-3">
                  <p><strong>P/N:</strong> {selectedCable.partNumber}</p>
                  <p><strong>AWG:</strong> {selectedCable.awg}</p>
                  <p><strong>Conductors:</strong> {selectedCable.conductors}</p>
                  <p><strong>Price/m:</strong> ${selectedCable.price.toFixed(2)}</p>
                </div>
              )}
            </div>

            {/* Crimp Pin Selection */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Crimp Pins/Terminals</h3>
              <select
                value={selectedCrimp?.id || ''}
                onChange={(e) => setSelectedCrimp(crimpPins.find(c => c.id === e.target.value) || null)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm mb-2"
              >
                <option value="">Select Crimp Pin...</option>
                {crimpPins.map(crimp => (
                  <option key={crimp.id} value={crimp.id}>
                    {crimp.name} ({crimp.awg} AWG)
                  </option>
                ))}
              </select>
              {selectedCrimp && (
                <div className="text-xs space-y-1 bg-slate-50 p-3 rounded">
                  <p><strong>P/N:</strong> {selectedCrimp.partNumber}</p>
                  <p><strong>AWG Range:</strong> {selectedCrimp.awg}</p>
                  <p><strong>Supplier:</strong> {selectedCrimp.supplier}</p>
                  <p><strong>Price:</strong> ${selectedCrimp.price.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Center Panel - Pin Mapping */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary-500" />
                Pin Mapping Diagram
              </h3>

              {!connectorA || !connectorB ? (
                <div className="text-center py-16 text-slate-500">
                  <CableIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Select connectors to start mapping pins</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                    <p><strong>How to connect:</strong> Click a pin on Connector A, then click the corresponding pin on Connector B</p>
                  </div>

                  {/* Pin Diagram */}
                  <div className="grid grid-cols-2 gap-8">
                    {/* Connector A Pins */}
                    <div>
                      <div className="text-center mb-4">
                        <h4 className="font-semibold text-slate-900">{connectorA.name}</h4>
                        <p className="text-xs text-slate-600">Side 1</p>
                      </div>
                      <div className="space-y-2">
                        {Array.from({ length: connectorA.pins }, (_, i) => i + 1).map(pin => {
                          const connection = connections.find(c => c.from === pin)
                          const isSelected = selectedFromPin === pin
                          return (
                            <button
                              key={pin}
                              onClick={() => setSelectedFromPin(isSelected ? null : pin)}
                              className={`
                                w-full p-3 rounded-lg border-2 transition flex items-center justify-between
                                ${isSelected ? 'border-primary-500 bg-primary-50' : 'border-slate-300 hover:border-primary-400'}
                                ${connection ? 'bg-green-50 border-green-500' : ''}
                              `}
                            >
                              <span className="flex items-center gap-2">
                                <Circle className={`w-3 h-3 ${connection ? 'fill-green-500 text-green-500' : 'text-slate-400'}`} />
                                <span className="font-medium">Pin {pin}</span>
                              </span>
                              {connection && (
                                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: connection.wireColor.toLowerCase(), color: 'white' }}>
                                  {connection.wireColor}
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Connector B Pins */}
                    <div>
                      <div className="text-center mb-4">
                        <h4 className="font-semibold text-slate-900">{connectorB.name}</h4>
                        <p className="text-xs text-slate-600">Side 2</p>
                      </div>
                      <div className="space-y-2">
                        {Array.from({ length: connectorB.pins }, (_, i) => i + 1).map(pin => {
                          const connection = connections.find(c => c.to === pin)
                          return (
                            <button
                              key={pin}
                              onClick={() => selectedFromPin !== null && handleAddConnection(pin)}
                              disabled={selectedFromPin === null}
                              className={`
                                w-full p-3 rounded-lg border-2 transition flex items-center justify-between
                                ${selectedFromPin !== null ? 'border-slate-300 hover:border-primary-400 cursor-pointer' : 'border-slate-200 opacity-50 cursor-not-allowed'}
                                ${connection ? 'bg-green-50 border-green-500' : ''}
                              `}
                            >
                              <span className="flex items-center gap-2">
                                <Circle className={`w-3 h-3 ${connection ? 'fill-green-500 text-green-500' : 'text-slate-400'}`} />
                                <span className="font-medium">Pin {pin}</span>
                              </span>
                              {connection && (
                                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: connection.wireColor.toLowerCase(), color: 'white' }}>
                                  {connection.wireColor}
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Connection List */}
                  {connections.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-slate-900 mb-3">Active Connections ({connections.length})</h4>
                      <div className="space-y-2">
                        {connections.map(conn => (
                          <div key={conn.from} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm">
                              <strong>Pin {conn.from}</strong> → <strong>Pin {conn.to}</strong>
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: conn.wireColor.toLowerCase(), color: 'white' }}>
                                {conn.wireColor}
                              </span>
                              <button
                                onClick={() => handleRemoveConnection(conn.from)}
                                className="p-1 hover:bg-red-100 rounded text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Quote */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-primary-50 to-accent-blue-50 rounded-xl shadow-md p-6 sticky top-8">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary-500" />
                Instant Quote
              </h3>

              <div className="space-y-3 mb-6">
                {connectorA && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Connector A:</span>
                    <span className="font-medium">${connectorA.price.toFixed(2)}</span>
                  </div>
                )}
                {connectorB && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Connector B:</span>
                    <span className="font-medium">${connectorB.price.toFixed(2)}</span>
                  </div>
                )}
                {selectedCable && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Cable ({cableLength}m):</span>
                    <span className="font-medium">${(selectedCable.price * cableLength).toFixed(2)}</span>
                  </div>
                )}
                {selectedCrimp && connections.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Crimp Pins ({connections.length * 2}):</span>
                    <span className="font-medium">${(selectedCrimp.price * connections.length * 2).toFixed(2)}</span>
                  </div>
                )}
                {connections.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Labor ({connections.length} conn):</span>
                    <span className="font-medium">${(connections.length * 2.50).toFixed(2)}</span>
                  </div>
                )}
                {connectorA && connectorB && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Overhead (15%):</span>
                    <span className="font-medium">${(calculateQuote() * 0.15 / 1.15).toFixed(2)}</span>
                  </div>
                )}
                {testServicesTotal > 0 && (
                  <div className="flex justify-between text-sm border-t border-slate-200 pt-3 mt-3">
                    <span className="text-slate-600 font-semibold">Test Services:</span>
                    <span className="font-semibold text-green-600">${testServicesTotal.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-slate-300 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total:</span>
                  <span className="text-3xl font-bold text-primary-600">
                    ${calculateQuote().toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Lead time: 5-7 business days
                </p>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full btn-primary py-3 mb-3 flex items-center justify-center gap-2"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>

              <button className="w-full btn-secondary py-3">
                Request Custom Quote
              </button>

              {/* Design Summary */}
              <div className="mt-6 pt-6 border-t border-slate-300">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Design Summary</h4>
                <div className="text-xs space-y-2 text-slate-600">
                  <p>✓ Connectors: {connectorA && connectorB ? '2' : connectorA || connectorB ? '1' : '0'} selected</p>
                  <p>✓ Cable: {selectedCable ? 'Selected' : 'Not selected'}</p>
                  <p>✓ Connections: {connections.length} mapped</p>
                  <p>✓ Crimp Pins: {selectedCrimp ? 'Selected' : 'Not selected'}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Test Services Section */}
        <div className="mt-8">
          <TestServicesAddOn
            onSelectionChange={(total) => setTestServicesTotal(total)}
          />
        </div>
      </div>
    </div>
  )
}
