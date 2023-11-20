import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Server Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="">
      <body>
        <div className="navbar bg-base-300 mb-5">
          <Link href={"/dashboard"} className={"btn btn-ghost text-xl"}>Server Dashboard</Link>
        </div>
        {children}
      </body>
    </html>
  )
}
