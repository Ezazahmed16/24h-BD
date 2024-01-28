import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "24H Bangladesh",
  description: "24H Bangladesh is a news website built with Nextjs and Tailwindcss",
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
