import './globals.css'
import Footer from './layout/Footer'
import Navigation from './layout/Navigation'

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
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
