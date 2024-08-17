import { Roboto } from "next/font/google";
import '@/styles/globals.css'

const roboto = Roboto({ subsets: ["latin"], weight: ['100', '300', '400', '500', '700', '900'] });

export const metadata = {
  title: "Ecommerce",
  description: "E-commerce web app for online shopping",
  author: "ChineduCode"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
