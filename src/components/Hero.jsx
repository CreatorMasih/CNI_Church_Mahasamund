import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronDown, Sparkles, MapPin } from 'lucide-react';

const CHURCH_PHOTO = '/church.jpg';

import { useCms } from '../context/CmsContext';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Hero({ onOpenVideo }) {
  const { data } = useCms();
  const hero = data.hero || {};
  const churchPhoto = hero.image || '/church.jpg';

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden flex flex-col justify-between"
      style={{ minHeight: '100svh', background: '#F6F1E7' }}
    >
      {/* ── SACRED WARM ATMOSPHERIC BACKGROUND ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(165deg, #FFFDF8 0%, #F6F1E7 40%, #EBE4D5 75%, #E3D9C4 100%)',
        }}
      />

      {/* Warm Golden Sunlight Glow emanating from top center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 20%, rgba(216, 188, 118, 0.22) 0%, rgba(184, 148, 74, 0.08) 50%, transparent 80%)',
        }}
      />

      {/* Soft Light Rays */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ opacity: [0.15, 0.32, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-[15%] w-[320px] h-[90%] blur-3xl"
            style={{
              background:
                'linear-gradient(160deg, rgba(216, 188, 118, 0.35), rgba(126, 38, 52, 0.06), transparent)',
            }}
          />
        </div>
      )}

      {/* Floating Gold Particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -25, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{
                duration: 5 + (i % 4),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.6,
              }}
              className="absolute rounded-full"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                top: `${15 + Math.random() * 65}%`,
                left: `${Math.random() * 90}%`,
                background: i % 2 === 0 ? '#B8944A' : '#7E2634',
                filter: 'blur(0.5px)',
              }}
            />
          ))}
        </div>
      )}

      {/* HERO CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 pt-28 pb-10 lg:pt-32 lg:pb-16 flex-grow">

        {/* LEFT Text */}
        <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full"
            style={{
              background: 'rgba(126, 38, 52, 0.08)',
              border: '1px solid rgba(126, 38, 52, 0.25)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#7E2634' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: '#7E2634' }}>
              {hero.welcomeLabel || 'WELCOME HOME'}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="space-y-1"
          >
            <h1 className="font-serif font-bold text-[#17202B] leading-[1.02] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6.8vw, 5.2rem)' }}>
              {hero.mainHeading || 'CNI CHURCH'}{' '}
              <span className="italic font-light text-[#7E2634] block sm:inline">
                {hero.subHeading || 'MAHASAMUND'}
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-base sm:text-lg font-serif italic text-[#6E6A63]"
          >
            "{hero.tagline || 'A Place of Faith, Hope & Love.'}"
          </motion.p>

          <p className="text-xs sm:text-sm text-[#6E6A63] max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
            Welcome to <strong className="font-semibold text-[#17202B]">CNI Church Mahasamund</strong> (St. Peter's Church), a vibrant Christian church in Mahasamund dedicated to God's Word, worship, and community fellowship.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="w-20 h-[2px] mx-auto lg:mx-0"
            style={{ background: 'linear-gradient(to right, #7E2634, #B8944A, transparent)' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="max-w-md mx-auto lg:mx-0"
          >
            <blockquote className="font-serif italic leading-relaxed text-[#17202B] text-sm sm:text-base">
              "{hero.verse || 'For where two or three gather in my name, there am I with them.'}"
            </blockquote>
            <span className="block text-[11px] uppercase tracking-widest font-bold mt-1.5" style={{ color: '#B8944A' }}>
              {hero.verseReference || '— Matthew 18:20'}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto pt-2"
          >
            <a
              href="#about"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-[0.2em] text-center transition-all duration-300 hover:brightness-110 active:scale-95 shadow-md flex items-center justify-center space-x-2"
              style={{
                background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
                color: '#FFFDF9',
                boxShadow: '0 4px 18px rgba(126, 38, 52, 0.35)',
                minHeight: '48px',
              }}
            >
              <span>{hero.primaryCtaText || 'EXPLORE OUR CHURCH'}</span>
            </a>
            <button
              onClick={onOpenVideo}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 flex items-center justify-center space-x-2"
              style={{
                border: '1.5px solid rgba(184, 148, 74, 0.6)',
                color: '#17202B',
                background: 'rgba(255, 253, 248, 0.8)',
                minHeight: '48px',
              }}
            >
              <Play className="w-3.5 h-3.5 text-[#7E2634] fill-current" />
              <span>{hero.secondaryCtaText || 'WATCH OUR STORY'}</span>
            </button>
          </motion.div>
        </div>

        {/* RIGHT Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full lg:w-[48%] flex justify-center"
        >
          <div className="relative w-full max-w-[500px]">
            <div className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(184, 148, 74, 0.25) 0%, rgba(126, 38, 52, 0.1) 70%)' }} />

            <div className="relative overflow-hidden shadow-2xl rounded-2xl group" style={{ border: '4px solid #FFFDF8' }}>
              <motion.img
                src={churchPhoto}
                alt="St. Peter's Church — CNI Church Mahasamund, historic Christian church building in Mahasamund, Chhattisgarh"
                loading="eager"
                className="w-full h-auto object-cover block"
                style={{
                  maxHeight: 'clamp(280px, 42vw, 480px)',
                  objectPosition: 'center 25%',
                  filter: 'brightness(1.05) contrast(1.04) saturate(1.08)',
                }}
              />

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md" style={{ background: 'rgba(23, 32, 43, 0.7)', color: '#D8BC76', border: '1px solid rgba(216, 188, 118, 0.4)' }}>
                  <span>✝</span>
                  <span>ST. PETER'S CHURCH, MAHASAMUND</span>
                </span>
                <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wider backdrop-blur-md" style={{ background: 'rgba(78, 24, 34, 0.75)', color: '#FFFDF9', border: '1px solid rgba(216, 188, 118, 0.3)' }}>
                  EST. {hero.establishedYear || '1909'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll Cue */}
      <div className="relative z-10 flex justify-center pb-6">
        <a href="#service" className="flex flex-col items-center group">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#6E6A63] group-hover:text-[#7E2634] transition-colors mb-1">
            SCROLL TO DISCOVER
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="p-1 rounded-full border border-gold/40 text-[#7E2634]"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
