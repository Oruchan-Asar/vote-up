import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/user-nav";
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
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center mx-auto">
                <div className="flex-1">
                  <Link href="/" className="flex items-center space-x-2">
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                      VoteUp
                    </h1>
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <UserNav />
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            {/* Footer */}
            <footer className="border-t border-foreground/10 bg-background/50 backdrop-blur-sm">
              <div className="container mx-auto px-4 py-8">
                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} VoteUp. All rights reserved.
                  </div>
                  <div className="flex space-x-6">
                    <Link
                      href="/privacy"
                      className="text-sm text-muted-foreground hover:text-foreground transition"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/terms"
                      className="text-sm text-muted-foreground hover:text-foreground transition"
                    >
                      Terms of Service
                    </Link>
                  </div>
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
