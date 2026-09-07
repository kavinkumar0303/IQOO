import React from 'react';

/**
 * LearnIQ Official Brand Education Icon Component
 * 
 * Renders the official education graduate icon with proper sizing,
 * transparent background, and original blue/green/orange colors.
 */
export const LearnIQLogo = ({ 
  className = "w-9 h-9 sm:w-10 sm:h-10 xl:w-11 xl:h-11", 
  alt = "LearnIQ Logo",
  priority = false 
}) => {
  return (
    <img 
      src="/learniq-logo.png" 
      alt={alt}
      className={`object-contain flex-shrink-0 select-none ${className}`}
      loading={priority ? "eager" : "lazy"}
      draggable="false"
    />
  );
};

export default LearnIQLogo;
