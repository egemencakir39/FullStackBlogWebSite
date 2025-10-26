import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/redux/reduxProvider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
        <Header />
        <main className="container mx-auto px-4">{children}</main>
        <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
