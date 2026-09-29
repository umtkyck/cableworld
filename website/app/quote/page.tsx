'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react'

export default function QuotePage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/dxf': ['.dxf'],
      'application/dwg': ['.dwg'],
    },
    maxSize: 104857600, // 100MB
  })

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    setUploading(true)
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setUploading(false)
    setUploadComplete(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900 lg:text-5xl">
            Get Your Instant Quote
          </h1>
          <p className="text-xl text-slate-600">
            Upload your cable harness diagram and receive a quote in under 60 seconds
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${uploadComplete ? 'bg-accent-green' : 'bg-primary-500'} font-bold text-white`}
              >
                1
              </div>
              <div className="ml-2 mr-8 text-sm font-medium">Upload</div>
            </div>
            <div className={`h-1 w-24 ${uploadComplete ? 'bg-accent-green' : 'bg-slate-300'}`} />
            <div className="ml-8 flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${uploadComplete ? 'bg-primary-500' : 'bg-slate-300'} font-bold text-white`}
              >
                2
              </div>
              <div className="ml-2 mr-8 text-sm font-medium">Review</div>
            </div>
            <div className="h-1 w-24 bg-slate-300" />
            <div className="ml-8 flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 font-bold text-white">
                3
              </div>
              <div className="ml-2 text-sm font-medium">Quote</div>
            </div>
          </div>
        </div>

        {!uploadComplete ? (
          <div className="rounded-2xl bg-white p-8 shadow-soft lg:p-12">
            {/* Upload Zone */}
            <div
              {...getRootProps()}
              className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all
                ${isDragActive ? 'border-accent-green bg-accent-green/5' : 'border-slate-300 hover:border-accent-green'}`}
            >
              <input {...getInputProps()} />
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-green/10">
                <Upload className="h-10 w-10 text-accent-green" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-slate-900">
                {isDragActive ? 'Drop files here' : 'Drag & drop your files here'}
              </h3>
              <p className="mb-4 text-slate-600">or click to browse from your computer</p>
              <p className="text-sm text-slate-500">
                Supports: CAD (.dxf, .dwg), PDF, Excel (.xls, .xlsx), Images (.png, .jpg)
              </p>
              <p className="mt-2 text-xs text-slate-400">Maximum file size: 100MB</p>
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  Uploaded Files ({files.length})
                </h3>
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-green/10">
                          <FileText className="h-5 w-5 text-accent-green" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{file.name}</div>
                          <div className="text-sm text-slate-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="rounded-lg p-2 transition hover:bg-red-50"
                      >
                        <X className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="btn-primary mt-6 w-full text-lg disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing Files...
                    </>
                  ) : (
                    'Continue to Review'
                  )}
                </button>
              </div>
            )}

            {/* Features */}
            <div className="mt-12 grid gap-6 border-t border-slate-200 pt-12 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-green/10">
                  <CheckCircle className="h-6 w-6 text-accent-green" />
                </div>
                <h4 className="mb-1 font-semibold text-slate-900">Secure Upload</h4>
                <p className="text-sm text-slate-600">Your files are encrypted and protected</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-blue/10">
                  <CheckCircle className="h-6 w-6 text-accent-blue" />
                </div>
                <h4 className="mb-1 font-semibold text-slate-900">AI-Powered</h4>
                <p className="text-sm text-slate-600">Automatic component recognition</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-yellow/10">
                  <CheckCircle className="h-6 w-6 text-accent-yellow" />
                </div>
                <h4 className="mb-1 font-semibold text-slate-900">Instant Results</h4>
                <p className="text-sm text-slate-600">Quote ready in under 60 seconds</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-8 text-center shadow-soft lg:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-green/10">
              <CheckCircle className="h-10 w-10 text-accent-green" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Files Uploaded Successfully!</h2>
            <p className="mb-8 text-xl text-slate-600">
              We're processing your design and matching components...
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn-primary">Continue to Review</button>
              <button className="btn-outline" onClick={() => setUploadComplete(false)}>
                Upload More Files
              </button>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex gap-4">
            <AlertCircle className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
            <div>
              <h4 className="mb-2 font-semibold text-blue-900">Need help with your upload?</h4>
              <p className="mb-3 text-sm text-blue-800">
                Our team is here to assist you. If you have questions about file formats or need
                design assistance, we're just a click away.
              </p>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                Contact Support →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
