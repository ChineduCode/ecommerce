import { Kumbh_Sans } from "next/font/google";
import '@/styles/globals.css'
import Providers from "@/components/Provider";
import { AuthProvider } from "@/utils/context/auth/AuthContext";
import { WishlistProvider } from "@/utils/context/wishlist/wishlistContext";

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
          <AuthProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
