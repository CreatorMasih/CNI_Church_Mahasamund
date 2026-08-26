import React from 'react';
import { motion } from 'framer-motion';

export default function BibleVerse() {
  const lineVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.35, duration: 1.1, ease: 'easeOut' },
    }),
  };

  return (
    <section
      className="relative w-full min-h-[80vh] py-20 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #4E1822 0%, #17202B 50%, #232E3C 100%)' }}
    >
      {/* Golden Sunset Halo behind Cross */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(216, 188, 118, 0.3) 0%, rgba(184, 148, 74, 0.12) 50%, transparent 75%)',
          }}
        />
      </div>

      {/* Subtle Soft Drifting Clouds */}
      <motion.div
        animate={{ x: [0, 25, 0], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-cover bg-center pointer-events-none mix-blend-overlay opacity-10"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80')" }}
      />

      {/* Cross Silhouette */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 100 140"
          className="h-[70%] max-h-[550px] w-auto"
          style={{ opacity: 0.22, filter: 'drop-shadow(0 0 35px rgba(216, 188, 118, 0.5))' }}
        >
          <rect x="44" y="10" width="12" height="120" rx="2" fill="#D8BC76" />
          <rect x="15" y="38" width="70" height="12" rx="2" fill="#D8BC76" />
        </svg>
      </div>

      {/* Top & Bottom Fade Transitions */}
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #F0E8D7, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #F6F1E7, transparent)' }}
      />

      {/* Scripture Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-4"
        >
          <motion.div custom={0} variants={lineVariants} className="flex justify-center mb-4">
            <span className="text-2xl font-serif text-gold-soft">✝</span>
          </motion.div>

          <motion.h2
            custom={1}
            variants={lineVariants}
            className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-warm-white tracking-wide font-medium leading-tight"
          >
            "I am the way,"
          </motion.h2>

          <motion.h2
            custom={2}
            variants={lineVariants}
            className="text-3xl sm:text-5xl md:text-6xl font-serif italic tracking-wide font-bold leading-tight text-gold-soft"
            style={{ textShadow: '0 0 25px rgba(216, 188, 118, 0.4)' }}
          >
            "the truth,"
          </motion.h2>

          <motion.h2
            custom={3}
            variants={lineVariants}
            className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-warm-white tracking-wide font-medium leading-tight"
          >
            "and the life."
          </motion.h2>

          <motion.p
            custom={4}
            variants={lineVariants}
            className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold pt-4 text-gold"
          >
            — John 14:6
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
