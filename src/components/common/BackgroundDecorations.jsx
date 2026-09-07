import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export const BackgroundDecorations = () => {
  const { activePage } = useApp();
  if (activePage === 'login') return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Top-Left Giant Concentric Pink & Orange Rings */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 6, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[160px] -left-[160px] w-[540px] h-[540px] rounded-full"
      >
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-[28px] border-[#FF1681]/15 blur-[1px]" />
        {/* Middle Ring */}
        <div className="absolute inset-[60px] rounded-full border-[18px] border-[#FF7A00]/20" />
        {/* Inner Solid Gradient Blob */}
        <div className="absolute inset-[130px] rounded-full bg-gradient-to-br from-[#FF1681]/25 via-[#FF7A00]/20 to-[#FFC928]/15 blur-2xl" />
        {/* Tiny Orbiting Accent Dot */}
        <div className="absolute top-10 right-20 w-4 h-4 rounded-full bg-[#FFD84D] shadow-glow-yellow animate-pulse" />
      </motion.div>

      {/* 2. Top-Right Big Golden-Yellow & Orange Sunburst Circle */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[180px] -right-[140px] w-[620px] h-[620px] rounded-full"
      >
        <div className="absolute inset-0 rounded-full border-[36px] border-[#FFC928]/20 blur-[0.5px]" />
        <div className="absolute inset-[70px] rounded-full border-[16px] border-[#FF7A00]/25" />
        <div className="absolute inset-[150px] rounded-full bg-gradient-to-bl from-[#FFD84D]/30 via-[#FF7A00]/20 to-transparent blur-3xl" />
      </motion.div>

      {/* 3. Bottom-Left Magenta & Purple Glowing Wave Blob */}
      <motion.div
        animate={{
          scale: [1, 1.06, 0.98, 1],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-[200px] -left-[140px] w-[650px] h-[650px] rounded-full"
      >
        <div className="absolute inset-0 rounded-full border-[32px] border-[#E9008C]/15" />
        <div className="absolute inset-[80px] rounded-full border-[20px] border-[#8E168F]/20" />
        <div className="absolute inset-[160px] rounded-full bg-gradient-to-tr from-[#C9009D]/25 via-[#FF1681]/20 to-[#FF8A00]/15 blur-3xl" />
      </motion.div>

      {/* 4. Bottom-Right Hot Pink & Yellow Concentric Rings */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-[150px] -right-[120px] w-[500px] h-[500px] rounded-full"
      >
        <div className="absolute inset-0 rounded-full border-[24px] border-[#FF1681]/20" />
        <div className="absolute inset-[60px] rounded-full border-[14px] border-[#FFD84D]/30" />
        <div className="absolute inset-[120px] rounded-full bg-gradient-to-tl from-[#FF7A00]/25 via-[#FF1681]/20 to-transparent blur-2xl" />
      </motion.div>

      {/* 5. Center Ambient Glow Blends */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-[#FF7A00]/8 via-[#FF1681]/8 to-[#FFD84D]/10 blur-3xl rounded-full" />

      {/* 6. Floating Plus (+) Symbols & Geometric Dots */}
      {/* Plus 1 */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 90, 180] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[22%] left-[12%] text-[#FF7A00]/40 font-bold text-2xl"
      >
        +
      </motion.div>
      {/* Plus 2 */}
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -90, -180] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[68%] right-[14%] text-[#FF1681]/40 font-bold text-3xl"
      >
        +
      </motion.div>
      {/* Plus 3 */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 45, 90] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[45%] right-[28%] text-[#FFC928]/50 font-bold text-xl"
      >
        +
      </motion.div>
      {/* Plus 4 */}
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[28%] left-[24%] text-[#8E168F]/30 font-bold text-2xl"
      >
        +
      </motion.div>

      {/* 7. Floating Glowing Orbs / Dots */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-[35%] left-[8%] w-3.5 h-3.5 rounded-full bg-[#FF7A00] shadow-glow-orange"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute top-[18%] right-[22%] w-4 h-4 rounded-full bg-[#FF1681] shadow-glow-pink"
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 2 }}
        className="absolute bottom-[35%] right-[8%] w-3 h-3 rounded-full bg-[#FFD84D] shadow-glow-yellow"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-[18%] left-[16%] w-3.5 h-3.5 rounded-full bg-[#E9008C] shadow-glow-magenta"
      />

      {/* 8. Subtle Wavy Curved Line SVGs */}
      <svg
        className="absolute top-[28%] left-[3%] w-24 h-12 text-[#FF7A00]/25 stroke-current fill-none stroke-[3]"
        viewBox="0 0 100 40"
      >
        <path d="M0 20 Q25 0 50 20 T100 20" />
      </svg>
      <svg
        className="absolute bottom-[22%] right-[5%] w-28 h-14 text-[#FF1681]/25 stroke-current fill-none stroke-[3]"
        viewBox="0 0 100 40"
      >
        <path d="M0 20 Q25 40 50 20 T100 20" />
      </svg>
    </div>
  );
};
