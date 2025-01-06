import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Terminal Directory',
  description: 'A comprehensive directory of computer terminals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black min-h-screen`}>
        <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center px-4">
            <div className="flex gap-4 items-center">
              <Image
                src="/logo.png"
                alt="Terminal Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                termui.sh
              </span>
            </div>
            <div className="ml-auto flex gap-4">
              {/* <Link href="/" className="text-foreground hover:text-primary">Directory</Link> */}
              {/* <Link href="/terminal-cli" className="text-foreground hover:text-primary">Terminal CLI</Link> */}
            </div>
          </div>
        </nav>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

