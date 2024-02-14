import { Inter, Ubuntu, Kumbh_Sans } from 'next/font/google'

const kumbh_sans = Kumbh_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecommerce Website',
  description: 'Ecommerce Website for selling of clothings',
  author: 'ChineduCode'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kumbh_sans.className}>{children}</body>
    </html>
  )
}
