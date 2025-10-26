// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "NewsPortal",
  description: "Latest news from various categories",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              NewsPortal
            </Link>

            <ul className="flex gap-4">
              {[
                "business",
                "technology",
                "sports",
                "health",
                "entertainment",
              ].map((cat) => (
                <li key={cat}>
                  <a
                    href={`/category/${cat}`}
                    className="capitalize hover:underline"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-6">{children}</main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 shadow-inner mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} NewsPortal. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
