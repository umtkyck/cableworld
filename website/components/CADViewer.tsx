'use client'

import React, { useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Grid, Environment } from '@react-three/drei'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, ZoomIn, ZoomOut, RotateCw, Download, AlertCircle } from 'lucide-react'
import * as THREE from 'three'

interface CADViewerProps {
  onFileUpload?: (file: File) => void
  initialFile?: File
  allowedFormats?: string[]
  showControls?: boolean
}

interface UploadedFile {
  name: string
  size: number
  type: string
  url: string
}

// 3D Model component that displays the loaded geometry
function Model({ geometry, color = '#3b82f6' }: { geometry?: THREE.BufferGeometry; color?: string }) {
  if (!geometry) return null

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Scene component with lighting and controls
function Scene({ geometry }: { geometry?: THREE.BufferGeometry }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[10, 10, 10]} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={50}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 10, 0]} intensity={0.5} />

      {/* Environment */}
      <Environment preset="studio" />

      {/* Grid */}
      <Grid
        args={[50, 50]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#6e6e6e"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#9d4b4b"
        fadeDistance={25}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid
      />

      {/* Model */}
      {geometry && <Model geometry={geometry} />}
    </>
  )
}

export default function CADViewer({
  onFileUpload,
  initialFile,
  allowedFormats = ['.step', '.stp', '.sldprt', '.f3d', '.fcstd', '.obj', '.stl'],
  showControls = true,
}: CADViewerProps) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [geometry, setGeometry] = useState<THREE.BufferGeometry>()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Parse different CAD file formats
  const parseCADFile = async (file: File) => {
    setLoading(true)
    setError('')

    try {
      const extension = file.name.split('.').pop()?.toLowerCase()

      // For now, create a placeholder geometry
      // In production, you would use appropriate parsers for each format
      let loadedGeometry: THREE.BufferGeometry

      switch (extension) {
        case 'step':
        case 'stp':
          // STEP file parsing would require opencascade.js or similar
          loadedGeometry = createPlaceholderGeometry('STEP')
          break
        case 'sldprt':
          // SolidWorks file parsing
          loadedGeometry = createPlaceholderGeometry('SolidWorks')
          break
        case 'f3d':
          // Fusion 360 file parsing
          loadedGeometry = createPlaceholderGeometry('Fusion 360')
          break
        case 'fcstd':
          // FreeCAD file parsing
          loadedGeometry = createPlaceholderGeometry('FreeCAD')
          break
        case 'stl':
          // STL file parsing using Three.js STLLoader
          const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js')
          const stlLoader = new STLLoader()
          const arrayBuffer = await file.arrayBuffer()
          loadedGeometry = stlLoader.parse(arrayBuffer)
          break
        case 'obj':
          // OBJ file parsing using Three.js OBJLoader
          loadedGeometry = createPlaceholderGeometry('OBJ')
          break
        default:
          throw new Error(`Unsupported file format: ${extension}`)
      }

      setGeometry(loadedGeometry)
      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type || extension || 'unknown',
        url: URL.createObjectURL(file),
      })

      if (onFileUpload) {
        onFileUpload(file)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load CAD file')
      console.error('CAD file parsing error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Create a placeholder geometry for unsupported formats
  // In production, this would be replaced with actual parsers
  const createPlaceholderGeometry = (format: string): THREE.BufferGeometry => {
    console.log(`Creating placeholder for ${format} format`)

    // Create a simple box as placeholder
    const geometry = new THREE.BoxGeometry(5, 5, 5)

    // Add custom attributes to show this is a placeholder
    geometry.userData = { format, placeholder: true }

    return geometry
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        parseCADFile(acceptedFiles[0])
      }
    },
    accept: {
      'application/octet-stream': allowedFormats,
      'model/step': ['.step', '.stp'],
      'model/stl': ['.stl'],
      'model/obj': ['.obj'],
    },
    multiple: false,
  })

  const handleRemoveFile = () => {
    if (uploadedFile?.url) {
      URL.revokeObjectURL(uploadedFile.url)
    }
    setUploadedFile(null)
    setGeometry(undefined)
    setError('')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Upload Area */}
      {!uploadedFile && (
        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
            transition-all duration-200 ease-in-out
            ${isDragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-slate-300 bg-slate-50 hover:border-primary-400 hover:bg-slate-100'
            }
          `}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center
              ${isDragActive ? 'bg-primary-100' : 'bg-slate-200'}
            `}>
              <Upload className={`w-8 h-8 ${isDragActive ? 'text-primary-600' : 'text-slate-600'}`} />
            </div>

            <div>
              <p className="text-lg font-semibold text-slate-900 mb-2">
                {isDragActive ? 'Drop your CAD file here' : 'Drag & drop your CAD file here'}
              </p>
              <p className="text-sm text-slate-600 mb-4">
                or click to browse
              </p>
              <p className="text-xs text-slate-500">
                Supported formats: {allowedFormats.join(', ')}
              </p>
            </div>
          </div>

          {loading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
              <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                <p className="text-sm text-slate-600">Loading CAD file...</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">Error loading CAD file</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Viewer Area */}
      {uploadedFile && (
        <div className="flex-1 flex flex-col">
          {/* File Info Bar */}
          <div className="bg-white border border-slate-200 rounded-t-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary-500" />
              <div>
                <p className="font-semibold text-slate-900">{uploadedFile.name}</p>
                <p className="text-xs text-slate-600">
                  {formatFileSize(uploadedFile.size)} • {uploadedFile.type || 'CAD File'}
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* 3D Canvas */}
          <div ref={canvasRef} className="flex-1 bg-slate-900 rounded-b-xl overflow-hidden min-h-[500px]">
            <Canvas shadows>
              <Suspense fallback={null}>
                <Scene geometry={geometry} />
              </Suspense>
            </Canvas>
          </div>

          {/* Controls */}
          {showControls && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button className="btn-secondary flex items-center gap-2">
                <ZoomIn className="w-4 h-4" />
                Zoom In
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <ZoomOut className="w-4 h-4" />
                Zoom Out
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <RotateCw className="w-4 h-4" />
                Reset View
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          )}

          {/* Info Message for Placeholder */}
          {geometry?.userData?.placeholder && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Preview Mode:</strong> Full {geometry.userData.format} file parsing requires additional
                server-side processing. This is a placeholder representation of your uploaded file.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
