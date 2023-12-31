import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

const lato = Lato({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "NBA Stats",
  description: "NBA Stats site",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Header />
        <Navbar />
        <div className="container container-main h-screen bg-base-100">
          {children}
          <ToastContainer limit={1} autoClose={1000} />
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
