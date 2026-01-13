
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-full border-4 border-[#FFCC00] bg-[#003366] ${className} shadow-lg`}>
      <div className="text-center">
        <div className="text-[10px] font-bold text-[#FFCC00] leading-none uppercase tracking-tighter">Alpha</div>
        <div className="text-[10px] font-bold text-[#FFCC00] leading-none uppercase tracking-tighter">Tech</div>
      </div>
      {/* Decorative inner rings */}
      <div className="absolute inset-1 rounded-full border border-[#FFCC00]/30 pointer-events-none"></div>
    </div>
  );
};

export default Logo;
