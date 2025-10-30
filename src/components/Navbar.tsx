"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const { theme } = useTheme();

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className=" bg-gradient-to-bright from-blue-500 to-blue-700 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">News Portal</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-1 items-right">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium mr-2"
            >
              Home
            </Link>
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Categories */}
        <div className="md:hidden pb-4">
          <div className="flex overflow-x-auto space-x-3 py-3 px-1">
            <Link
              href="/"
              className="whitespace-nowrap px-4 py-2 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200 font-medium shadow-sm"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
