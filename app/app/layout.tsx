import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import Navbar from '@/components/ui/navbar'
import './globals.css'

const font = Lato({subsets: ['latin'], weight: "700"})

export const metadata: Metadata = {
  title: '3D generation tool',
  description: 'Generate 3D shapes using AI',
}

let menus = [
  { title: "Home", path: "/your-path" },
  { title: "Blog", path: "/your-path" },
  { title: "About Us", path: "/your-path" },
  { title: "Contact Us", path: "/your-path" },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={font.className}>
        <Navbar menus={menus} isLoggedIn={true} title='AnythingTo3D' avatarUrl='https://api.dicebear.com/7.x/notionists-neutral/svg?seed=test'></Navbar>
        {children}
      </body>
    </html>
  )
}
