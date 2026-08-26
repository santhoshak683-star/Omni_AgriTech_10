import React from 'react';
import { motion } from 'motion/react';

interface AnimatedCowIconProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showRadar?: boolean;
}

export const AnimatedCowIcon: React.FC<AnimatedCowIconProps> = ({
  size = 'md',
  className = '',
  showRadar = true,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Telemetry Radar Pulse Waves in the background */}
      {showRadar && (
        <>
          <motion.div
            className="absolute inset-0 rounded-2xl bg-emerald-500/15"
            animate={{
              scale: [1, 1.45, 1.6],
              opacity: [0.7, 0.25, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-2xl bg-emerald-400/20"
            animate={{
              scale: [1, 1.25, 1.35],
              opacity: [0.6, 0.2, 0],
            }}
            transition={{
              duration: 2.2,
              delay: 0.6,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </>
      )}

      {/* Main Animated Cow Icon Container */}
      <motion.div
        className={`${sizeClasses[size]} relative z-10 rounded-2xl bg-linear-to-b from-slate-900 via-slate-800 to-slate-950 p-1.5 shadow-md flex items-center justify-center border border-slate-700/60 overflow-hidden cursor-pointer`}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.08,
          rotate: [-1, 2, -2, 0],
          transition: { duration: 0.4 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Subtle grid line backdrop inside badge */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:6px_6px] opacity-15 pointer-events-none" />

        {/* Vector Cow Face with Animated Features */}
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-slate-100 drop-shadow-xs"
        >
          {/* Horns */}
          <path
            d="M17 21C14 13 19 8 23 11C21 15 20 18 20 21"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M47 21C50 13 45 8 41 11C43 15 44 18 44 21"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Left Ear - Gentle Twitch Motion */}
          <motion.g
            animate={{
              rotate: [0, -6, 0, 4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '18px 23px' }}
          >
            <path
              d="M18 24C10 23 6 28 8 32C11 34 16 30 18 26"
              fill="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
            <path
              d="M16 25C11 25 8 28 10 30C12 31 15 29 16 27"
              fill="#FDA4AF"
            />
          </motion.g>

          {/* Right Ear with Smart IoT Ear Tag */}
          <motion.g
            animate={{
              rotate: [0, 5, 0, -3, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
            style={{ transformOrigin: '46px 23px' }}
          >
            <path
              d="M46 24C54 23 58 28 56 32C53 34 48 30 46 26"
              fill="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
            <path
              d="M48 25C53 25 56 28 54 30C52 31 49 29 48 27"
              fill="#FDA4AF"
            />
            
            {/* Smart Ear-Tag Sensor Hardware (Yellow IoT Tag) */}
            <rect
              x="53"
              y="29"
              width="6.5"
              height="8"
              rx="1.5"
              fill="#10B981"
              stroke="#059669"
              strokeWidth="0.8"
            />
            {/* Blinking IoT Tag LED */}
            <circle cx="56.2" cy="33" r="1.3" fill="#A7F3D0" className="animate-ping" />
            <circle cx="56.2" cy="33" r="1" fill="#FFFFFF" />
          </motion.g>

          {/* Cow Head Base */}
          <path
            d="M20 23C20 18 44 18 44 23C47 31 46 43 43 49C40 54 24 54 21 49C18 43 17 31 20 23Z"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="1.2"
          />

          {/* Holstein Black Cow Spots Pattern */}
          <path
            d="M20 24C24 22 28 25 29 29C29 34 23 37 20 35C18 31 18 27 20 24Z"
            fill="#1E293B"
          />
          <path
            d="M44 23C41 23 38 26 39 30C40 33 44 35 44 32Z"
            fill="#1E293B"
          />
          <path
            d="M28 20C33 19 36 21 34 24C32 26 29 24 28 20Z"
            fill="#1E293B"
          />

          {/* Cow Eyes (Expressive & Friendly) */}
          <circle cx="26" cy="33" r="2.3" fill="#0F172A" />
          <circle cx="25.2" cy="32.2" r="0.8" fill="#FFFFFF" />
          <circle cx="38" cy="33" r="2.3" fill="#0F172A" />
          <circle cx="37.2" cy="32.2" r="0.8" fill="#FFFFFF" />

          {/* Cheerful Eye Lashes / Brows */}
          <path d="M24 29.5C25.5 28.5 27.5 28.8 28.5 29.5" stroke="#64748B" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M35.5 29.5C36.5 28.8 38.5 28.5 40 29.5" stroke="#64748B" strokeWidth="0.8" strokeLinecap="round" />

          {/* Snout / Muzzle */}
          <rect
            x="22"
            y="38"
            width="20"
            height="14"
            rx="7"
            fill="#FBCFE8"
            stroke="#F472B6"
            strokeWidth="1"
          />

          {/* Nostrils */}
          <circle cx="28" cy="45" r="1.6" fill="#BE185D" />
          <circle cx="36" cy="45" r="1.6" fill="#BE185D" />

          {/* Subtle Smile */}
          <path
            d="M30 48C31.5 49.5 32.5 49.5 34 48"
            stroke="#DB2777"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>

        {/* Live telemetry active beacon badge */}
        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900 shadow-xs" />
      </motion.div>
    </div>
  );
};
