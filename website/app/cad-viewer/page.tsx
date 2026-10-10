'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Upload, CheckCircle } from 'lucide-react'

// Dynamically import CADViewer with no SSR to avoid Three.js server-side rendering issues
const CADViewer = dynamic(() => import('@/components/CADViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[500px] items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary-500"></div>
        <p className="text-sm text-slate-600">Loading CAD Viewer...</p>
      </div>
    </div>
  ),
})

export default function CADViewerPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileUpload = (file: File) => {
    setUploadedFiles((prev) => [...prev, file])
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100">
            <Box className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-slate-900">CAD File Viewer</h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            Upload and preview your CAD files directly in your browser. Supports STEP, SolidWorks,
            Fusion 360, FreeCAD, and more.
          </p>
        </div>

        {/* Features */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <Upload className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 font-semibold text-slate-900">Drag & Drop Upload</h3>
            <p className="text-sm text-slate-600">
              Simply drag your CAD files into the viewer or click to browse
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Box className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 font-semibold text-slate-900">Interactive 3D View</h3>
            <p className="text-sm text-slate-600">
              Rotate, zoom, and inspect your designs from every angle
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 font-semibold text-slate-900">Multiple Formats</h3>
            <p className="text-sm text-slate-600">
              Support for STEP, SolidWorks, Fusion 360, FreeCAD, STL, and OBJ
            </p>
          </div>
        </div>

        {/* CAD Viewer */}
        <div className="rounded-2xl bg-white p-8 shadow-large">
          <CADViewer
            onFileUpload={handleFileUpload}
            allowedFormats={['.step', '.stp', '.sldprt', '.f3d', '.fcstd', '.stl', '.obj']}
            showControls={true}
          />
        </div>

        {/* Supported Formats */}
        <div className="mt-12 rounded-xl bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Supported File Formats</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-semibold text-slate-900">CAD Formats</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    <strong>STEP (.step, .stp)</strong> - ISO standard CAD format
                  </span>
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    <strong>SolidWorks (.sldprt)</strong> - SolidWorks part files
                  </span>
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    <strong>Fusion 360 (.f3d)</strong> - Autodesk Fusion 360 files
                  </span>
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    <strong>FreeCAD (.fcstd)</strong> - FreeCAD project files
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-slate-900">3D Model Formats</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    <strong>STL (.stl)</strong> - Stereolithography format
                  </span>
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    <strong>OBJ (.obj)</strong> - Wavefront 3D object file
                  </span>
                </li>
              </ul>

              <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Some CAD formats (STEP, SolidWorks, Fusion 360, FreeCAD)
                  require server-side processing for full geometry extraction. The viewer currently
                  shows a preview representation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="to-accent-blue-50 mt-12 rounded-xl bg-gradient-to-br from-primary-50 p-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">How to Use</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                1
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">Upload Your File</h3>
              <p className="text-sm text-slate-600">
                Drag and drop your CAD file or click to browse from your computer
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                2
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">View in 3D</h3>
              <p className="text-sm text-slate-600">
                Rotate, zoom, and inspect your design from all angles
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                3
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">Request a Quote</h3>
              <p className="text-sm text-slate-600">
                Export your design or proceed to request a manufacturing quote
              </p>
            </div>
          </div>
        </div>

        {/* Upload History */}
        {uploadedFiles.length > 0 && (
          <div className="mt-12 rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Upload History</h2>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-slate-900">{file.name}</p>
                      <p className="text-xs text-slate-600">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{new Date().toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
