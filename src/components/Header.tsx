"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-serif text-xl font-medium tracking-wide text-foreground"
          >
            <Image
              src="/bb.png"
              alt="Bambite Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-18">
          <Link
            href="#philosophy"
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="#philosophy"
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            About Us
          </Link>
          <Link
            href="#menu"
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            Menu
          </Link>
          <Link
            href="#menu"
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="#menu"
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            Career
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 border-b border-foreground">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm py-1 w-48 placeholder:text-muted-foreground"
              autoFocus
            />
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="p-1 hover:text-muted-foreground transition-colors"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* <CartSheet /> */}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2"
            aria-label={isSearchOpen ? "Close search" : "Open search"}
          >
            <Search className="w-5 h-5" />
          </button>
          {/* <CartSheet /> */}
          <button
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex items-center gap-2 border-b border-foreground">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm py-2 flex-1 placeholder:text-muted-foreground"
              autoFocus
            />
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="p-1"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border">
          <div className="flex flex-col px-6 py-4 gap-4">
            <Link
              href="#philosophy"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Philosophy
            </Link>
            <Link
              href="#menu"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="#reserve"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Reserve
            </Link>
            <Link
              href="#contact"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
