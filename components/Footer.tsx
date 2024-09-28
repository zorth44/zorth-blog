import React from 'react';
import Link from 'next/link';
import { FaRss, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background shadow-md border-t border-puzzle-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4 text-sm text-foreground/70">
            <span>© 2019 - {currentYear} By Zorth</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-sm text-foreground/70">Powered by nextjs</span>
            <div className="flex space-x-4">
              <SocialIcon href="#" Icon={FaRss} />
              <SocialIcon href="#" Icon={FaGithub} />
              <SocialIcon href="#" Icon={FaTwitter} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ href: string; text: string }> = ({ href, text }) => {
  return (
    <Link 
      href={href} 
      className="relative py-2 px-3 text-sm font-medium transition-all duration-300 ease-in-out group text-foreground/70 hover:text-primary"
    >
      <span className="relative z-10">{text}</span>
      <span 
        className="absolute inset-0 bg-primary/10 rounded-full transform transition-all duration-300 ease-in-out scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100"
      />
    </Link>
  );
};

const SocialIcon: React.FC<{ href: string; Icon: React.ComponentType<any> }> = ({ href, Icon }) => {
  return (
    <a 
      href={href} 
      className="text-foreground/70 hover:text-primary transition-colors duration-300"
      target="_blank" 
      rel="noopener noreferrer"
    >
      <Icon className="text-lg" />
    </a>
  );
};

export default Footer;