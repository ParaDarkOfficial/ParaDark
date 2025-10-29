"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loreDropdownOpen, setLoreDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={scrolled ? {
        boxShadow: '0 1px 0 0 rgba(34, 211, 238, 0.4)'
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image
                src="/paradark-logo.png"
                alt="ParaDark Logo"
                fill
                className="object-contain transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300"
              />
            </div>
            <span 
              className="text-xl md:text-2xl font-bold bg-clip-text text-transparent transition-all duration-300"
              style={{
                background: "linear-gradient(to right, #ffffff, #9ca3af, #374151)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ParaDark
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Home
            </Link>

            {/* Lore Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setLoreDropdownOpen(true)}
              onMouseLeave={() => setLoreDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium">
                <span>Lore</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    loreDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div 
                className={`absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-lg border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/10 overflow-hidden transition-all duration-200 ${
                  loreDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <Link
                  href="/lore/canon"
                  className="block px-4 py-3 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors duration-200"
                >
                  Canon
                </Link>
                <Link
                  href="/lore/community"
                  className="block px-4 py-3 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors duration-200"
                >
                  Community Stories
                </Link>
                <Link
                  href="/lore/characters"
                  className="block px-4 py-3 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors duration-200"
                >
                  Characters
                </Link>
                <Link
                  href="/lore/locations"
                  className="block px-4 py-3 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors duration-200"
                >
                  Locations
                </Link>
                <Link
                  href="/lore/artifacts"
                  className="block px-4 py-3 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors duration-200"
                >
                  Artifacts
                </Link>
              </div>
            </div>

            <a
              href="https://github.com/MystiQ-Universe/mystiQ-universe/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Contribute
            </a>

            <a
              href="https://github.com/MystiQ-Universe/mystiQ-universe/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Community
            </a>

            <a
              href="https://github.com/MystiQ-Universe/mystiQ-universe#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              About
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-cyan-500/20">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-gray-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div className="space-y-2">
              <button
                className="flex items-center justify-between w-full text-gray-300 hover:text-cyan-400 transition-colors py-2"
                onClick={() => setLoreDropdownOpen(!loreDropdownOpen)}
              >
                <span>Lore</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    loreDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {loreDropdownOpen && (
                <div className="pl-4 space-y-2">
                  <Link
                    href="/lore/canon"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Canon
                  </Link>
                  <Link
                    href="/lore/community"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Community Stories
                  </Link>
                  <Link
                    href="/lore/characters"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Characters
                  </Link>
                  <Link
                    href="/lore/locations"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Locations
                  </Link>
                  <Link
                    href="/lore/artifacts"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Artifacts
                  </Link>
                </div>
              )}
            </div>
            <a
              href="https://github.com/MystiQ-Universe/mystiQ-universe/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contribute
            </a>
            <a
              href="https://github.com/MystiQ-Universe/mystiQ-universe/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </a>
            <a
              href="https://github.com/MystiQ-Universe/mystiQ-universe#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
