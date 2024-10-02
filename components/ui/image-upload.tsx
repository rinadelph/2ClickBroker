'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

interface ImageUploadProps {
  onUpload: (files: File[]) => void
  maxFiles?: number
}

export const ImageUpload = ({ onUpload, maxFiles = 5 }: ImageUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles.slice(0, maxFiles))
  }, [onUpload, maxFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? 'Drop the images here ...'
          : `Drag 'n' drop some images here, or click to select images`}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Supports: JPG, JPEG, PNG, GIF (Max {maxFiles} files)
      </p>
    </div>
  )
}