import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const source_code_pro = Noto_Sans_JP({
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "next-prisma-todo-app",
  description: "Next.js14とprismaを使用したtodoアプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="font-noto-sans-jp">
      <body className="bg-gradient-to-r from-amber-500 to-orange-600 break-words">
        <Header />
        {children}
      </body>
    </html>
  );
}
