import type { Metadata } from "next";
import {
  Inter,
  Luxurious_Roman,
  Raleway,
  Dancing_Script,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Header/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductContext from "@/context/ProductContext";
const inter = Raleway({ weight: ["400"], subsets: ["latin"] });
const font = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-dance",
});
export const metadata: Metadata = {
  title: "E Cart",
  icons: "fav.ico",
  description: "E Cart, a advanced simple ecommerece site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          socialButtonsPlacement: "bottom",
          shimmer: true,
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} max-w-screen-xl mx-auto`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <ProductContext>
              {/* <Navbar /> */}
              {children}
              <ToastContainer />
            </ProductContext>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
