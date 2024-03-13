import { Inter } from "next/font/google";
import SiteWrapper from "../components/SiteWrapper";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Study Guide",
  description: "Study guide for some crane certification",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <body className={inter.className}>
        <SiteWrapper>
          <Header />
          {children}
          <Footer />
        </SiteWrapper>
      </body>
    </html>
  );
}
