import React from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';

export const LoadingScreen = ({ fullScreen = true, message = "Preparando a galeria...", fadeIn = false }) => {
  return (
    <motion.div
      className={`cinematic-loading-container ${fullScreen ? 'full-screen' : 'inline-container'}`}
      initial={{ opacity: fadeIn ? 0 : 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
      transition={{ duration: 0.6 }}
    >
      {/* ── 1. Vinheta Escura (Vignette) ── */}
      <div className="cinematic-vignette" />

      {/* ── 2. Efeito Analógico (Grain Forte) ── */}
      <svg className="cinematic-grain" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-loading-cinematic">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-loading-cinematic)" />
      </svg>

      <div className="cinematic-content-wrapper">
        
        {/* ── 3. Luzes Vermelhas (The Glows Móveis) ── */}
        <motion.div
          className="cinematic-red-glow glow-center"
          animate={{ 
            scale: [1, 1.15, 1], 
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="cinematic-red-glow glow-top-right"
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.1, 0.3, 0.1],
            y: [0, 40, 0],
            x: [0, -30, 0]
          }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="cinematic-red-glow glow-bottom-left"
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.1, 0.35, 0.1],
            y: [0, -50, 0],
            x: [0, 30, 0]
          }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        />

        {/* ── 4. Logo ── */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="cinematic-logo-container"
        >
          <motion.img
            src="/logo.png"
            alt="Selezione"
            className="cinematic-logo"
            animate={{
              opacity: [0.6, 1, 0.6],
              filter: [
                "brightness(0) invert(1) drop-shadow(0 0 5px color-mix(in srgb, var(--color-paper) 5%, transparent))",
                "brightness(0) invert(1) drop-shadow(0 0 20px color-mix(in srgb, var(--color-paper) 30%, transparent))",
                "brightness(0) invert(1) drop-shadow(0 0 5px color-mix(in srgb, var(--color-paper) 5%, transparent))"
              ]
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* ── 5. Progresso Elegante ── */}
        <div className="cinematic-progress-area">
          <motion.div
            className="cinematic-progress-line-track"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <motion.div
              className="cinematic-progress-line-fill"
              animate={{ x: ["-100%", "250%"] }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          </motion.div>

          {message && (
            <motion.p
              className="cinematic-loading-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              {message}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
