"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-black/90 backdrop-blur-sm border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-8 h-8">
                <Image
                  src="/paradark-logo.png"
                  alt="ParaDark Logo"
                  fill
                  className="object-contain transition-transform group-hover:scale-110 duration-300"
                />
              </div>
              <span 
                className="text-xl font-bold bg-clip-text text-transparent"
                style={{
                  background: "linear-gradient(to right, #ffffff, #9ca3af, #374151)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ParaDark
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Where Reality Breaks. Where Myths Begin.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/lore" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Lore
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/MystiQ-Universe/mystiQ-universe/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  Contribute
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/MystiQ-Universe/mystiQ-universe#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/MystiQ-Universe/mystiQ-universe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/paradark"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/MystiQ-Universe/mystiQ-universe/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Discussions"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ParaDark Universe. Open Source Project.
            </p>
            <a
              href="https://github.com/MystiQ-Universe/mystiQ-universe/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
            >
              MIT License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
