'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react'

export default function QuotePage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles])
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
    await new Promise(resolve => setTimeout(resolve, 2000))
    setUploading(false)
    setUploadComplete(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
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
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${uploadComplete ? 'bg-accent-green' : 'bg-primary-500'} text-white font-bold`}>
                1
              </div>
              <div className="text-sm ml-2 mr-8 font-medium">Upload</div>
            </div>
            <div className={`h-1 w-24 ${uploadComplete ? 'bg-accent-green' : 'bg-slate-300'}`} />
            <div className="flex items-center ml-8">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${uploadComplete ? 'bg-primary-500' : 'bg-slate-300'} text-white font-bold`}>
                2
              </div>
              <div className="text-sm ml-2 mr-8 font-medium">Review</div>
            </div>
            <div className="h-1 w-24 bg-slate-300" />
            <div className="flex items-center ml-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-300 text-white font-bold">
                3
              </div>
              <div className="text-sm ml-2 font-medium">Quote</div>
            </div>
          </div>
        </div>

        {!uploadComplete ? (
          <div className="bg-white rounded-2xl shadow-soft p-8 lg:p-12">
            {/* Upload Zone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
                ${isDragActive ? 'border-accent-green bg-accent-green/5' : 'border-slate-300 hover:border-accent-green'}`}
            >
              <input {...getInputProps()} />
              <div className="w-20 h-20 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-accent-green" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {isDragActive ? 'Drop files here' : 'Drag & drop your files here'}
              </h3>
              <p className="text-slate-600 mb-4">or click to browse from your computer</p>
              <p className="text-sm text-slate-500">
                Supports: CAD (.dxf, .dwg), PDF, Excel (.xls, .xlsx), Images (.png, .jpg)
              </p>
              <p className="text-xs text-slate-400 mt-2">Maximum file size: 100MB</p>
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Uploaded Files ({files.length})</h3>
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-accent-green" />
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
                        className="p-2 hover:bg-red-50 rounded-lg transition"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="btn-primary w-full mt-6 text-lg disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing Files...
                    </>
                  ) : (
                    'Continue to Review'
                  )}
                </button>
              </div>
            )}

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-green/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-accent-green" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">Secure Upload</h4>
                <p className="text-sm text-slate-600">Your files are encrypted and protected</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-accent-blue" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">AI-Powered</h4>
                <p className="text-sm text-slate-600">Automatic component recognition</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-yellow/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-accent-yellow" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">Instant Results</h4>
                <p className="text-sm text-slate-600">Quote ready in under 60 seconds</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-soft p-8 lg:p-12 text-center">
            <div className="w-20 h-20 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-accent-green" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Files Uploaded Successfully!</h2>
            <p className="text-xl text-slate-600 mb-8">
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
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Need help with your upload?</h4>
              <p className="text-blue-800 text-sm mb-3">
                Our team is here to assist you. If you have questions about file formats or need
                design assistance, we're just a click away.
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                Contact Support →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
