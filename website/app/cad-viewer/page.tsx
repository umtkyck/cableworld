'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Upload, CheckCircle } from 'lucide-react'

// Dynamically import CADViewer with no SSR to avoid Three.js server-side rendering issues
const CADViewer = dynamic(() => import('@/components/CADViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <p className="text-sm text-slate-600">Loading CAD Viewer...</p>
      </div>
    </div>
  ),
})

export default function CADViewerPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileUpload = (file: File) => {
    setUploadedFiles(prev => [...prev, file])
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
            <Box className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            CAD File Viewer
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Upload and preview your CAD files directly in your browser.
            Supports STEP, SolidWorks, Fusion 360, FreeCAD, and more.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Drag & Drop Upload</h3>
            <p className="text-sm text-slate-600">
              Simply drag your CAD files into the viewer or click to browse
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Box className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Interactive 3D View</h3>
            <p className="text-sm text-slate-600">
              Rotate, zoom, and inspect your designs from every angle
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Multiple Formats</h3>
            <p className="text-sm text-slate-600">
              Support for STEP, SolidWorks, Fusion 360, FreeCAD, STL, and OBJ
            </p>
          </div>
        </div>

        {/* CAD Viewer */}
        <div className="bg-white rounded-2xl shadow-large p-8">
          <CADViewer
            onFileUpload={handleFileUpload}
            allowedFormats={['.step', '.stp', '.sldprt', '.f3d', '.fcstd', '.stl', '.obj']}
            showControls={true}
          />
        </div>

        {/* Supported Formats */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Supported File Formats</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">CAD Formats</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span><strong>STEP (.step, .stp)</strong> - ISO standard CAD format</span>
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span><strong>SolidWorks (.sldprt)</strong> - SolidWorks part files</span>
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span><strong>Fusion 360 (.f3d)</strong> - Autodesk Fusion 360 files</span>
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span><strong>FreeCAD (.fcstd)</strong> - FreeCAD project files</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-3">3D Model Formats</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span><strong>STL (.stl)</strong> - Stereolithography format</span>
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span><strong>OBJ (.obj)</strong> - Wavefront 3D object file</span>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Some CAD formats (STEP, SolidWorks, Fusion 360, FreeCAD)
                  require server-side processing for full geometry extraction.
                  The viewer currently shows a preview representation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="mt-12 bg-gradient-to-br from-primary-50 to-accent-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Use</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Upload Your File</h3>
              <p className="text-sm text-slate-600">
                Drag and drop your CAD file or click to browse from your computer
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">View in 3D</h3>
              <p className="text-sm text-slate-600">
                Rotate, zoom, and inspect your design from all angles
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Request a Quote</h3>
              <p className="text-sm text-slate-600">
                Export your design or proceed to request a manufacturing quote
              </p>
            </div>
          </div>
        </div>

        {/* Upload History */}
        {uploadedFiles.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Upload History</h2>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-slate-900">{file.name}</p>
                      <p className="text-xs text-slate-600">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
