import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import ScrollToTop from "@/components/shared/scroll-top";
import Chatbot from "@/components/shared/chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BROADPARK HOTELS",
  description: "BROADPARK HOTELS Website Located at Mbale Vihiga County",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="">
          <div className="min-h-screen">{children}</div>
        </div>
        <ScrollToTop />
        <Chatbot />
        <Footer />
        <ToastContainer position="top-right" />
      </body>
    </html>
  );
}
