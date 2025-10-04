import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RootClientLayout from "./RootClientLayout"; // Imports the client wrapper

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  // Define metadata here
  title: "Packwiz - Packing Supplies",
  description: "Canadian supplier of affordable packing and moving supplies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <RootClientLayout>
          <Header />
          <main>{children}</main>
          <Footer />
        </RootClientLayout>
      </body>
    </html>
  );
}
