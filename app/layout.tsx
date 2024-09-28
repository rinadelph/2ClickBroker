import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '2ClickBroker',
  description: 'Your trusted real estate brokerage platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Add this script tag to load the CSS file on the client side */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                import('mapbox-gl/dist/mapbox-gl.css');
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-100`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}