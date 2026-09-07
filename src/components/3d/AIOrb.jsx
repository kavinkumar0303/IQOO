import React from 'react';
import { motion } from 'framer-motion';

export const AIOrb = ({ size = "md", pulse = true, state = "idle", className = "" }) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-14 h-14",
    lg: "w-24 h-24",
    xl: "w-36 h-36"
  };

  const coreSize = {
    sm: "w-4 h-4",
    md: "w-7 h-7",
    lg: "w-12 h-12",
    xl: "w-18 h-18"
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Outer Pulse Wave */}
      {pulse && (
        <motion.div
          animate={{
            scale: [1, 1.45, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF1681] via-[#FF7A00] to-[#FFD84D] blur-md"
        />
      )}

      {/* Rotating Particle Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-1 rounded-full border border-dashed border-[#FFD84D]/60"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2.5 rounded-full border border-[#FF1681]/50"
      />

      {/* Ambient Inner Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#EC087F] via-[#FF7A00] to-[#FFC928] opacity-80 blur-sm shadow-glow-pink" />

      {/* Dense Core */}
      <motion.div
        animate={{
          scale: [0.95, 1.08, 0.95],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`relative z-10 ${coreSize[size]} rounded-full bg-gradient-to-br from-white via-[#FFD84D] to-[#FF7A00] shadow-inner flex items-center justify-center`}
      >
        {/* Core highlight */}
        <div className="w-1.5 h-1.5 rounded-full bg-white blur-[0.5px] -translate-y-0.5 -translate-x-0.5" />
      </motion.div>

      {/* Floating Sparkles */}
      <motion.div
        animate={{ y: [-3, 3, -3], x: [2, -2, 2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FFD84D] shadow-glow-yellow"
      />
      <motion.div
        animate={{ y: [3, -3, 3], x: [-2, 2, -2] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-[#FF1681] shadow-glow-pink"
      />
    </div>
  );
};
