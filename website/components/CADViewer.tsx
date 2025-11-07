'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, AlertCircle, RotateCw, ZoomIn, ZoomOut } from 'lucide-react'

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

export default function CADViewer({
  onFileUpload,
  initialFile,
  allowedFormats = ['.step', '.stp', '.sldprt', '.f3d', '.fcstd', '.obj', '.stl'],
  showControls = true,
}: CADViewerProps) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [canRender3D, setCanRender3D] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)

  // Initialize Three.js scene
  useEffect(() => {
    if (!uploadedFile || !canRender3D || !canvasRef.current) return

    let mounted = true
    let animationId: number

    const initScene = async () => {
      try {
        // Dynamically import Three.js
        const THREE = await import('three')
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')

        if (!mounted || !canvasRef.current) return

        // Create scene
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x1e293b)

        // Create camera
        const camera = new THREE.PerspectiveCamera(
          75,
          canvasRef.current.clientWidth / canvasRef.current.clientHeight,
          0.1,
          1000
        )
        camera.position.set(5, 5, 5)

        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        canvasRef.current.appendChild(renderer.domElement)

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
        directionalLight2.position.set(-5, -5, -5)
        scene.add(directionalLight2)

        // Add grid
        const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222)
        scene.add(gridHelper)

        // Add axes helper
        const axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper)

        // Load model
        const extension = uploadedFile.name.split('.').pop()?.toLowerCase()

        if (extension === 'stl') {
          const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js')
          const loader = new STLLoader()

          const geometry = await new Promise<THREE.BufferGeometry>((resolve, reject) => {
            loader.load(
              uploadedFile.url,
              (geo) => resolve(geo),
              undefined,
              (err) => reject(err)
            )
          })

          // Center the geometry
          geometry.center()

          const material = new THREE.MeshPhongMaterial({
            color: 0x3b82f6,
            specular: 0x111111,
            shininess: 200,
          })

          const mesh = new THREE.Mesh(geometry, material)
          scene.add(mesh)

          // Fit camera to object
          const box = new THREE.Box3().setFromObject(mesh)
          const size = box.getSize(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)
          const fov = camera.fov * (Math.PI / 180)
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
          cameraZ *= 1.5 // Add some padding
          camera.position.set(cameraZ, cameraZ, cameraZ)
          camera.lookAt(0, 0, 0)
        } else {
          // For other formats, show a placeholder cube
          const geometry = new THREE.BoxGeometry(2, 2, 2)
          const material = new THREE.MeshPhongMaterial({ color: 0x3b82f6 })
          const cube = new THREE.Mesh(geometry, material)
          scene.add(cube)
        }

        // Add orbit controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.screenSpacePanning = false
        controls.minDistance = 1
        controls.maxDistance = 100

        // Animation loop
        const animate = () => {
          if (!mounted) return
          animationId = requestAnimationFrame(animate)
          controls.update()
          renderer.render(scene, camera)
        }
        animate()

        // Handle window resize
        const handleResize = () => {
          if (!canvasRef.current) return
          camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight
          camera.updateProjectionMatrix()
          renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight)
        }
        window.addEventListener('resize', handleResize)

        sceneRef.current = { scene, camera, renderer, controls, handleResize }

      } catch (err) {
        console.error('3D rendering error:', err)
        setError('Failed to render 3D view. Your browser may not support WebGL.')
      }
    }

    initScene()

    return () => {
      mounted = false
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (sceneRef.current) {
        window.removeEventListener('resize', sceneRef.current.handleResize)
        if (sceneRef.current.renderer && canvasRef.current) {
          canvasRef.current.removeChild(sceneRef.current.renderer.domElement)
        }
        sceneRef.current.renderer?.dispose()
        sceneRef.current = null
      }
    }
  }, [uploadedFile, canRender3D])

  const parseCADFile = async (file: File) => {
    setLoading(true)
    setError('')

    try {
      const extension = file.name.split('.').pop()?.toLowerCase()

      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type || extension || 'unknown',
        url: URL.createObjectURL(file),
      })

      // Check if we can render this format in 3D
      if (extension === 'stl' || extension === 'obj') {
        setCanRender3D(true)
      } else {
        setCanRender3D(false)
      }

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
    setCanRender3D(false)
    setError('')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const getFormatInfo = () => {
    const extension = uploadedFile?.name.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'step':
      case 'stp':
        return 'STEP files require server-side processing for full 3D visualization. A preview geometry is shown.'
      case 'sldprt':
        return 'SolidWorks files require server-side processing for full 3D visualization. A preview geometry is shown.'
      case 'f3d':
        return 'Fusion 360 files require server-side processing for full 3D visualization. A preview geometry is shown.'
      case 'fcstd':
        return 'FreeCAD files require server-side processing for full 3D visualization. A preview geometry is shown.'
      case 'stl':
        return 'STL file loaded successfully. Use mouse to rotate, zoom, and pan the view.'
      case 'obj':
        return 'OBJ file loaded successfully. Use mouse to rotate, zoom, and pan the view.'
      default:
        return ''
    }
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
                  {formatFileSize(uploadedFile.size)} • {uploadedFile.type.toUpperCase() || 'CAD File'}
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

          {/* 3D Viewer Canvas */}
          <div
            ref={canvasRef}
            className="flex-1 bg-slate-900 rounded-b-xl overflow-hidden"
            style={{ minHeight: '600px', width: '100%' }}
          />

          {/* Info Message */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>ℹ️ Info:</strong> {getFormatInfo()}
            </p>
          </div>

          {/* Controls Info */}
          {canRender3D && showControls && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <RotateCw className="w-5 h-5 text-primary-500" />
                  <span className="font-semibold text-slate-900">Rotate</span>
                </div>
                <p className="text-xs text-slate-600">Left click + drag</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <ZoomIn className="w-5 h-5 text-primary-500" />
                  <span className="font-semibold text-slate-900">Zoom</span>
                </div>
                <p className="text-xs text-slate-600">Mouse wheel</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Upload className="w-5 h-5 text-primary-500" />
                  <span className="font-semibold text-slate-900">Pan</span>
                </div>
                <p className="text-xs text-slate-600">Right click + drag</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
