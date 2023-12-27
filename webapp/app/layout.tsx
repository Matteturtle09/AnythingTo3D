import type { Metadata } from 'next'
import { Fira_Code, Fira_Sans, Inter, Lato, Rubik_80s_Fade } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/navbar'

const font = Lato({ subsets: ['latin'], weight: '400'})

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
      <body className={font.className}>
        <Navbar userName={"Username"} title={"Anything to 3D"} avatarUrl={"https://api.dicebear.com/7.x/notionists-neutral/svg?seed=Berrystatus.org"}/>
        {children}
      </body>
    </html>
  )
}
