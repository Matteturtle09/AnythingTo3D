import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'

const font = Lato({subsets: ['latin'], weight: "700"})

export const metadata: Metadata = {
  title: '3D generation tool',
  description: 'Generate 3D shapes using AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={font.className}>{children}</body>
    </html>
  )
}
