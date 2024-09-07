import { Kumbh_Sans } from "next/font/google";
import '@/styles/globals.css'
import Providers from "@/components/Provider";

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce",
  description: "E-commerce web app for online shopping",
  author: "ChineduCode"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kumbh_sans.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
