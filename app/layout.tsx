import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Providers } from "@/components/providers";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoteUp",
  description: "Your Community-Driven Content Ranking Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky bg-opacity-10 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center mx-auto max-w-screen-lg px-4">
                <div className="flex-1">
                  <Link href="/" className="flex items-center space-x-2">
                    <h1 className="text-xl font-bold">VoteUp</h1>
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <ThemeToggle />

                  <Link
                    href="/register"
                    className="text-sm font-medium hover:underline"
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="text-sm font-medium hover:underline"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            {/* Footer */}
            <footer className="border-t border-foreground/10 bg-background/50 backdrop-blur-sm">
              <div className="container mx-auto px-4 py-4">
                <div className="text-center text-sm text-muted-foreground">
                  2024 © Oruchan Asar
                </div>
              </div>
            </footer>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
