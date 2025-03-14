import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import Header from "@/components/fragments/header";
import Footer from "@/components/fragments/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MediConnect",
  description: "Healthcare Platform",
  title: "MediConnect - Healthcare Management System",
  description:
    "A comprehensive clinic management system for patients and healthcare providers",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
