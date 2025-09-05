
import React from 'react';

interface LinkButtonProps {
  href?: string;
  onClick?: () => void;
  text: string;
  icon: React.ReactNode;
  theme: 'dark' | 'light';
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, onClick, text, icon, theme }) => {
  const baseClasses = `group w-full rounded-xl flex items-center p-3 sm:p-4 transition-all duration-300 transform hover:scale-105`;
  
  const themeClasses = theme === 'dark' 
    ? "animate-light-marble backdrop-blur-xl text-black shadow-lg shadow-black/15 hover:shadow-xl hover:shadow-black/20"
    : "bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg hover:shadow-gray-500/40";
  
  const combinedClasses = `${baseClasses} ${themeClasses}`;

  const iconBaseClasses = "flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors duration-300";
  const iconThemeClasses = theme === 'dark'
    ? "text-neutral-800 group-hover:text-black"
    : "text-neutral-300 group-hover:text-white";
  const iconClasses = `${iconBaseClasses} ${iconThemeClasses}`;

  const content = (
    <>
      <div className={iconClasses}>
        {icon}
      </div>
      <span className="flex-grow text-center text-base sm:text-lg font-semibold tracking-wide">
        {text}
      </span>
    </>
  );

  const focusClasses = "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-gray-400";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${combinedClasses} ${focusClasses}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${combinedClasses} ${focusClasses}`}>
      {content}
    </button>
  );
};

export default LinkButton;
