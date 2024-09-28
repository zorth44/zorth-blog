"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import { FaHome } from 'react-icons/fa'; // 确保已安装 react-icons

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <header className="bg-background shadow-md border-b border-puzzle-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo or site title with new effects */}
          <Link 
            href="/"
            className="relative py-2 px-4 font-bold text-xl group"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <div className="relative z-10 transition-all duration-300 w-32 h-8 flex items-center justify-center">
              {isLogoHovered ? (
                <FaHome className="text-2xl absolute" />
              ) : (
                <span className="absolute whitespace-nowrap">Zorth Blog</span>
              )}
            </div>
            <span 
              className={`
                absolute inset-0 bg-primary/10 rounded-full
                transform transition-all duration-300 ease-in-out
                ${isLogoHovered ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
              `}
            />
          </Link>

          {/* Mobile menu button */}
          <MobileMenu />

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-8 justify-center flex-grow">
            <MenuLink href="/home" text="Home" isActive={pathname === '/home'} />
            <MenuLink href="/about" text="About" isActive={pathname === '/about'} />
            <MenuLink href="/contact" text="Contact" isActive={pathname === '/contact'} />
          </nav>
        </div>
      </div>
    </header>
  );
};

const MenuLink: React.FC<{ href: string; text: string; isActive: boolean }> = ({ href, text, isActive }) => {
  return (
    <Link 
      href={href} 
      className={`
        relative py-2 px-4 font-bold text-lg
        transition-all duration-300 ease-in-out
        group
        ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}
      `}
    >
      <span className="relative z-10">{text}</span>
      <span 
        className={`
          absolute inset-0 bg-primary/10 rounded-full
          transition-gpu
          ${isActive 
            ? 'scale-100 opacity-100' 
            : 'scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100'}
        `}
      />
    </Link>
  );
};

export default Header;