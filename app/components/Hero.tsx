"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Github, Users, Star, GitFork } from "lucide-react";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [githubStats, setGithubStats] = useState({ stars: 0, contributors: 0 });

  useEffect(() => {
    setMounted(true);
    
    // Fetch GitHub stats
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/MystiQ-Universe/mystiQ-universe');
        const data = await response.json();
        setGithubStats({
          stars: data.stargazers_count || 0,
          contributors: 0, // Will fetch separately if needed
        });
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
      }
    };
    
    fetchGitHubStats();
  }, []);

  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs - Static positions */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            transform: `perspective(500px) rotateX(60deg) scale(2)`,
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title */}
        <div className="mb-6 overflow-hidden">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 animate-fadeInUp"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #6b7280 50%, #1f2937 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.2))",
              animation: "fadeInUp 1s ease-out",
            }}
          >
            ParaDark
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 font-light tracking-wide animate-fadeInUp"
          style={{
            animationDelay: "0.2s",
            opacity: 0,
            animation: "fadeInUp 1s ease-out 0.2s forwards",
          }}
        >
          Where Reality <span className="text-cyan-400 font-semibold">Breaks</span>. Where Myths <span className="text-purple-400 font-semibold">Begin</span>.
        </p>

        {/* Description */}
        <p
          className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-fadeInUp"
          style={{
            animationDelay: "0.4s",
            opacity: 0,
            animation: "fadeInUp 1s ease-out 0.4s forwards",
          }}
        >
          Dive into a collaborative universe of dimensional rifts, cosmic mysteries, and 
          legends born from the void. Your story matters here.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fadeInUp"
          style={{
            animationDelay: "0.6s",
            opacity: 0,
            animation: "fadeInUp 1s ease-out 0.6s forwards",
          }}
        >
          <a
            href="https://github.com/MystiQ-Universe/mystiQ-universe"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 flex items-center gap-2"
            style={{
              background: "linear-gradient(to right, #06b6d4, #3b82f6)",
            }}
          >
            <span className="relative z-10">Explore the Universe</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(to right, #22d3ee, #60a5fa)",
              }}
            />
          </a>

          <a
            href="https://github.com/MystiQ-Universe/mystiQ-universe/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-transparent border-2 border-cyan-500/50 text-cyan-400 font-semibold rounded-lg transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-400 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 flex items-center gap-2"
          >
            <span>Contribute Your Myth</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* GitHub Stats - Simple & Clean */}
        {mounted && (
          <div
            className="flex flex-wrap gap-6 justify-center items-center animate-fadeInUp"
            style={{
              animationDelay: "0.8s",
              opacity: 0,
              animation: "fadeInUp 1s ease-out 0.8s forwards",
            }}
          >
            {/* Stars */}
            <a
              href="https://github.com/MystiQ-Universe/mystiQ-universe/stargazers"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Github className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              <span className="text-white/90 font-semibold text-base">2</span>
            </a>

            {/* Forks */}
            <a
              href="https://github.com/MystiQ-Universe/mystiQ-universe/fork"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <GitFork className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              <span className="text-white/90 font-semibold text-base">1</span>
            </a>

            {/* Contributors */}
            <a
              href="https://github.com/MystiQ-Universe/mystiQ-universe/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Users className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              <span className="text-white/90 font-semibold text-base">2</span>
            </a>

            {/* Pull Requests */}
            <a
              href="https://github.com/MystiQ-Universe/mystiQ-universe/pulls"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"/>
              </svg>
              <span className="text-white/90 font-semibold text-base">0</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;

