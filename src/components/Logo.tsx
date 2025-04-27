
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  variant = 'light' 
}) => {
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl'
  };
  
  const colorClasses = {
    light: 'text-white',
    dark: 'text-blokdoc-dark'
  };
  
  return (
    <div className={`font-bold ${sizeClasses[size]} ${colorClasses[variant]} flex items-center`}>
      <div className="relative flex items-center">
        <span className="text-blokdoc-cyan">Blok</span>
        <span className="logo-text text-blokdoc-purple transition-all duration-300">Doc</span>
        <div className="ml-2 bg-gradient-to-r from-blokdoc-cyan to-blokdoc-purple h-4 w-4 rounded-full animate-pulse-glow"></div>
      </div>
    </div>
  );
};

export default Logo;
