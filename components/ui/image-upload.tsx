'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

interface ImageUploadProps {
  onUpload: (files: File[]) => void
}

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles)
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif']
    }
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive ? 'Drop the images here' : 'Drag and drop images here, or click to select files'}
      </p>
    </div>
  )
}