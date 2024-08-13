import { Inter } from "next/font/google";
import '@/styles/globals.css'

const inter = Inter({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata = {
  title: "Ecommerce",
  description: "E-commerce web app for online shopping",
  author: "ChineduCode"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
