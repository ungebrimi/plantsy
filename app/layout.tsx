import './globals.css'
import Navbar from './layout/Navbar'

export const metadata = {
  title: 'Plantsy',
  description: 'Your green fingered friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full bg-gray-50'>
      <body className="h-full">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
