'use client'

import React, { useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, AlertCircle } from 'lucide-react'

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
  const [preview, setPreview] = useState<string>('')

  // Parse different CAD file formats
  const parseCADFile = async (file: File) => {
    setLoading(true)
    setError('')

    try {
      const extension = file.name.split('.').pop()?.toLowerCase()

      // Create file info
      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type || extension || 'unknown',
        url: URL.createObjectURL(file),
      })

      // Set a preview message based on file type
      let previewMessage = ''
      switch (extension) {
        case 'step':
        case 'stp':
          previewMessage = 'STEP file uploaded successfully. Full 3D rendering requires additional processing.'
          break
        case 'sldprt':
          previewMessage = 'SolidWorks file uploaded successfully. Full 3D rendering requires additional processing.'
          break
        case 'f3d':
          previewMessage = 'Fusion 360 file uploaded successfully. Full 3D rendering requires additional processing.'
          break
        case 'fcstd':
          previewMessage = 'FreeCAD file uploaded successfully. Full 3D rendering requires additional processing.'
          break
        case 'stl':
          previewMessage = 'STL file uploaded successfully. 3D preview will be available soon.'
          break
        case 'obj':
          previewMessage = 'OBJ file uploaded successfully. 3D preview will be available soon.'
          break
        default:
          throw new Error(`Unsupported file format: ${extension}`)
      }

      setPreview(previewMessage)

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
    setPreview('')
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

          {/* Preview Area */}
          <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 rounded-b-xl overflow-hidden min-h-[500px] flex items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-primary-600" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                File Uploaded Successfully
              </h3>

              <p className="text-slate-600 mb-6">
                {preview}
              </p>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-semibold text-slate-900 mb-3">File Details</h4>
                <div className="space-y-2 text-sm text-left">
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-600">Filename:</span>
                    <span className="font-medium text-slate-900">{uploadedFile.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-600">Size:</span>
                    <span className="font-medium text-slate-900">{formatFileSize(uploadedFile.size)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Format:</span>
                    <span className="font-medium text-slate-900">{uploadedFile.type.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
                <p className="text-sm text-blue-800">
                  <strong>Next Steps:</strong> Advanced 3D rendering with orbit controls, zoom, and rotation
                  will be available in the next update. For now, you can use this viewer to verify your file upload.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
