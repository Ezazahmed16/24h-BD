import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "News Hub | Nextjs",
  description: "News Hub is a news website built with Nextjs and Tailwindcss",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
        <NextTopLoader />
      </body>
    </html>
  );
}
