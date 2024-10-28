'use client';

import type { Metadata } from "next";
import { Noto_Sans, Allerta_Stencil } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import ThemeSwitchSheet from "@/components/theme-toggle/theme-switch-sheet";
import { ThemeProvider } from "@/providers/theme-provider";
import QueryProvider from "@/providers/query-provider";
import Navbar from "@/components/navbar";
import LoadingWrapper from "@/components/loading-wrapper";
import { configureAmplify } from '@/lib/aws-config'

configureAmplify()

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const allertaStencil = Allerta_Stencil({
  subsets: ["latin"],
  variable: "--font-allerta-stencil",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryProvider>
          <body
            className={`${notoSans.variable} ${allertaStencil.variable} font-sans antialiased`}
          >
            <LoadingWrapper>
              <Navbar />
              {children}
              <ThemeSwitchSheet />
              <Footer />
            </LoadingWrapper>
          </body>
        </QueryProvider>
      </ThemeProvider>
    </html>
  );
}
