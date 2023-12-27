import type { Metadata } from 'next'
import { Fira_Code, Fira_Sans, Inter, Lato, Rubik_80s_Fade } from 'next/font/google'
import './globals.css'

const font = Fira_Sans({ subsets: ['latin'], weight: '400'})

export const metadata: Metadata = {
  title: '3D generation tool',
  description: 'A tool to generate 3D models with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
