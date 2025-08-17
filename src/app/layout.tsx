import { cookies } from "next/headers";

import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { type Metadata } from "next";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title: "موسسه من حقیقی",
  description: "موسسه من حقیقی",
  icons: [{ rel: "icon", url: "/assets/logo.png" }],
};

const font = localFont({
  src: [
    {
      path: "./(font)/YekanBakh-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./(font)/YekanBakh.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./(font)/YekanBakh-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return (
    <html lang="fa" dir="rtl" className={font.className}>
      <body>
        <Navbar isAuth={!!token} />
        {children}
        <Footer />
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
