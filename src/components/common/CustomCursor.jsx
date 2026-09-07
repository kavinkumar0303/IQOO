import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export const CustomCursor = () => {
  const { activePage } = useApp();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    // If on login page or touch device, do not attach cursor listeners
    if (activePage === 'login') return;
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'
      ) {
        setCursorVariant('button');
      } else if (target.closest('.interactive-card') || target.closest('.glass-card')) {
        setCursorVariant('card');
      } else if (target.closest('canvas') || target.closest('.interactive-3d')) {
        setCursorVariant('canvas3d');
      } else {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice || activePage === 'login') return null;

  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      width: 12,
      height: 12,
      backgroundColor: '#FF7A00',
      transition: { type: 'spring', mass: 0.1, damping: 20, stiffness: 400 },
    },
    button: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      width: 40,
      height: 40,
      backgroundColor: 'rgba(255, 22, 129, 0.25)',
      border: '2px solid #FF1681',
      transition: { type: 'spring', mass: 0.15, damping: 18, stiffness: 350 },
    },
    card: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: 'rgba(255, 122, 0, 0.15)',
      border: '1.5px dashed #FF7A00',
      transition: { type: 'spring', mass: 0.2, damping: 20, stiffness: 300 },
    },
    canvas3d: {
      x: mousePosition.x - 28,
      y: mousePosition.y - 28,
      width: 56,
      height: 56,
      backgroundColor: 'rgba(255, 201, 40, 0.2)',
      border: '2px solid #FFD84D',
      transition: { type: 'spring', mass: 0.2, damping: 18, stiffness: 350 },
    }
  };

  const ringVariants = {
    default: {
      x: mousePosition.x - 18,
      y: mousePosition.y - 18,
      width: 36,
      height: 36,
      borderColor: 'rgba(255, 122, 0, 0.4)',
      transition: { type: 'spring', mass: 0.4, damping: 28, stiffness: 200 },
    },
    button: {
      x: mousePosition.x - 28,
      y: mousePosition.y - 28,
      width: 56,
      height: 56,
      borderColor: 'rgba(255, 22, 129, 0.6)',
      transition: { type: 'spring', mass: 0.3, damping: 22, stiffness: 220 },
    },
    card: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      width: 64,
      height: 64,
      borderColor: 'rgba(255, 122, 0, 0.5)',
      transition: { type: 'spring', mass: 0.35, damping: 24, stiffness: 200 },
    },
    canvas3d: {
      x: mousePosition.x - 36,
      y: mousePosition.y - 36,
      width: 72,
      height: 72,
      borderColor: 'rgba(255, 216, 77, 0.7)',
      transition: { type: 'spring', mass: 0.3, damping: 20, stiffness: 220 },
    }
  };

  return (
    <>
      {/* Outer Spring Follower Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-opacity-40"
        variants={ringVariants}
        animate={cursorVariant}
      />

      {/* Main Core Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full shadow-lg"
        variants={variants}
        animate={cursorVariant}
      />

      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="pointer-events-none fixed z-[9997] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FF1681] bg-[#FF7A00]/20"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 32,
            height: 32,
          }}
        />
      ))}
    </>
  );
};
