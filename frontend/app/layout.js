import { Kumbh_Sans } from "next/font/google";
import '@/styles/globals.css'
import Providers from "@/components/Provider";
import { WishlistProvider } from "@/utils/context/wishlist/wishlistContext";
import { CartProvider } from "@/utils/context/cart/cartContext";
import { CountProvider } from "@/utils/context/count/countcontext";
import { ResponseProvider } from "@/utils/context/ResponseContext";
import { UXProvider } from "@/utils/context/ux/uxContext";
import { ProfileProvider } from "@/utils/context/profile/profileContext";

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
          <ProfileProvider>
            <UXProvider>
              <CountProvider>
                <CartProvider>
                  <WishlistProvider>
                    <ResponseProvider>
                      {children}
                    </ResponseProvider>
                  </WishlistProvider>
                </CartProvider>
              </CountProvider>
            </UXProvider>
          </ProfileProvider>
        </Providers>
      </body>
    </html>
  );
}
