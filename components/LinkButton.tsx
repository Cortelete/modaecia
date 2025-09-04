import React from 'react';

interface LinkButtonProps {
  href?: string;
  onClick?: () => void;
  text: string;
  icon: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, onClick, text, icon }) => {
  const wrapperClasses = "group rounded-xl p-px bg-animated-border transition-all duration-300 transform hover:scale-105 hover:shadow-stone-500/20";
  const contentClasses = "w-full h-full flex items-center bg-stone-900/80 backdrop-blur-sm rounded-[11px] p-3 sm:p-4 text-white";

  const content = (
    <div className={contentClasses}>
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-stone-300 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <span className="flex-grow text-center text-base sm:text-lg font-semibold tracking-wide">
        {text}
      </span>
    </div>
  );

  const focusClasses = "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-stone-400";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${wrapperClasses} block ${focusClasses}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${wrapperClasses} w-full ${focusClasses}`}>
      {content}
    </button>
  );
};

export default LinkButton;
