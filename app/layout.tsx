import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const SITE_URL = "https://www.daycaredirectories.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Daycare Directories — Find the Perfect Childcare City by City",
  description:
    "Find trusted daycare centers, preschools, and childcare providers near you. Browse by state and city across the USA and Canada.",
  openGraph: {
    siteName: "Daycare Directories",
    type: "website",
    title: "Daycare Directories — Find the Perfect Childcare City by City",
    description:
      "Find trusted daycare centers, preschools, and childcare providers near you. Browse by state and city across the USA and Canada.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Daycare Directories",
    url: SITE_URL,
    description:
      "Find trusted daycare centers, preschools, and childcare providers near you. Browse by state and city across the USA and Canada.",
  };

  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8586688641645596"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} min-h-screen antialiased font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
