import React from 'react'
import './globals.css'

export const metadata = {
  title: '2ClickBroker',
  description: 'Your real estate brokerage platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
