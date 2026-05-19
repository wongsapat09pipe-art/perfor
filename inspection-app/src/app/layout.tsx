import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ระบบสร้างรายงานตรวจสอบโครงสร้าง',
  description: 'Structural Inspection Report Generator — Performax 13 Tests',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
