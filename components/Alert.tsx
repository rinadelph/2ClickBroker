import React from 'react'

type AlertProps = {
  message: string
  type: 'success' | 'error'
}

export function Alert({ message, type }: AlertProps) {
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100'
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700'

  return (
    <div className={`${bgColor} ${textColor} px-4 py-3 rounded relative`} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  )
}