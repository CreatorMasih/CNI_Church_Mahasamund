import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Sparkles, Music, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { WORSHIP_SONG } from '../data/churchData';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function WorshipWithUs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [imgSrc, setImgSrc] = useState(WORSHIP_SONG.thumbnail);
  const iframeRef = useRef(null);

  // Lock body scroll when video modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  // Keyboard escape key support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autoplay handler: Attempt to start sound on first user click anywhere on page
  useEffect(() => {
    const handleFirstInteraction = () => {
      setIsMuted(false);
    };
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Autoplay Embed URL (plays automatically on page load with autoplay=1)
  const autoplayUrl = `https://www.youtube.com/embed/${WORSHIP_SONG.id}?autoplay=1&mute=${isMuted ? 1 : 0}&enablejsapi=1&rel=0`;

  return (
    <section
      id="worship-with-us"
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, #FFFDF8 0%, #F6F1E7 50%, #F0E8D7 100%)',
      }}
    >
      {/* Warm Golden Sunlight Radial Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(216, 188, 118, 0.2) 0%, rgba(184, 148, 74, 0.08) 55%, transparent 80%)',
        }}
      />

      {/* Subtle Floating Gold Particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.65, 0.2] }}
              transition={{
                duration: 5 + (i % 4),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.75,
              }}
              className="absolute rounded-full"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                top: `${20 + Math.random() * 60}%`,
                left: `${Math.random() * 90}%`,
                background: i % 2 === 0 ? '#B8944A' : '#D8BC76',
                filter: 'blur(0.5px)',
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── CINEMATIC 2-COLUMN LAYOUT (Desktop) / STACKED (Mobile) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── LEFT SIDE: Text, Scripture & Action Button ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Eyebrow with Cross Icon */}
            <div
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full justify-center lg:justify-start"
              style={{
                background: 'rgba(126, 38, 52, 0.08)',
                border: '1px solid rgba(184, 148, 74, 0.3)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.28em]"
                style={{ color: '#7E2634' }}
              >
                A MOMENT OF WORSHIP
              </span>
            </div>

            {/* Gold Divider Line */}
            <div
              className="w-16 h-[2px] mx-auto lg:mx-0"
              style={{ background: 'linear-gradient(to right, #7E2634, #B8944A)' }}
            />

            {/* Main Heading */}
            <h2
              className="font-serif font-bold text-[#17202B] tracking-tight leading-[1.08]"
              style={{ fontSize: 'clamp(2.1rem, 5.5vw, 3.8rem)' }}
            >
              Worship <span className="italic font-light text-[#7E2634]">With Us</span>
            </h2>

            {/* Short Premium Description */}
            <p className="text-[#6E6A63] text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              {WORSHIP_SONG.description}
            </p>

            {/* Bible Verse in Elegant Italic Serif */}
            <div
              className="p-5 rounded-2xl max-w-xl mx-auto lg:mx-0 shadow-sm text-left relative overflow-hidden"
              style={{
                background: '#FFFDF8',
                border: '1.5px solid rgba(184, 148, 74, 0.28)',
                boxShadow: '0 6px 20px rgba(184, 148, 74, 0.08)',
              }}
            >
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-[#7E2634] to-[#B8944A]" />
              <blockquote className="font-serif italic text-base sm:text-lg leading-relaxed text-[#17202B] pl-2">
                "{WORSHIP_SONG.verse}"
              </blockquote>
              <span
                className="block text-right text-xs uppercase tracking-widest font-bold mt-2"
                style={{ color: '#B8944A' }}
              >
                {WORSHIP_SONG.reference}
              </span>
            </div>

            {/* Play Worship Button & Audio Sound Controls */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.22em] transition-all duration-300 active:scale-95 shadow-xl group"
                style={{
                  background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
                  color: '#FFFDF9',
                  border: '1.5px solid rgba(216, 188, 118, 0.4)',
                  minHeight: '52px',
                  boxShadow: '0 8px 25px rgba(126, 38, 52, 0.35)',
                }}
              >
                <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-[#17202B] group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                </div>
                <span>OPEN FULL BROADCAST</span>
              </button>

              {/* Sound Toggle Pill */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="inline-flex items-center space-x-2 px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                style={{
                  background: isMuted ? 'rgba(126, 38, 52, 0.1)' : 'rgba(184, 148, 74, 0.15)',
                  border: '1px solid rgba(184, 148, 74, 0.4)',
                  color: '#7E2634',
                  minHeight: '48px',
                }}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#7E2634]" /> : <Volume2 className="w-4 h-4 text-gold animate-bounce" />}
                <span>{isMuted ? 'UNMUTE SOUND' : 'SOUND ON'}</span>
              </button>
            </div>
          </motion.div>

          {/* ── RIGHT SIDE: Autoplay Video Player Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            {/* Subtle Golden Glow Halo behind Video Card */}
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(184, 148, 74, 0.25) 0%, rgba(126, 38, 52, 0.12) 70%)',
              }}
            />

            {/* Video Frame with Autoplay YouTube iFrame embedded */}
            <div
              className="group relative w-full rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500"
              style={{
                border: '3px solid #FFFDF8',
                boxShadow: '0 20px 60px rgba(184, 148, 74, 0.2), 0 6px 20px rgba(23, 32, 43, 0.15)',
                borderRadius: '24px',
              }}
            >
              {/* Aspect Ratio 16:9 Player Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#17202B]">
                <iframe
                  ref={iframeRef}
                  src={autoplayUrl}
                  title="Worship With Us — CNI Church Mahasamund"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0 pointer-events-auto"
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <span
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
                    style={{
                      background: 'rgba(23, 32, 43, 0.8)',
                      color: '#D8BC76',
                      border: '1px solid rgba(216, 188, 118, 0.35)',
                    }}
                  >
                    <Music className="w-3.5 h-3.5 text-gold-soft" />
                    <span>AUTOPLAYING WORSHIP</span>
                  </span>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="pointer-events-auto p-2 rounded-lg backdrop-blur-md transition-colors"
                    style={{
                      background: 'rgba(126, 38, 52, 0.85)',
                      color: '#FFFDF9',
                      border: '1px solid rgba(216, 188, 118, 0.4)',
                    }}
                    title="Expand Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </motion.div>

        </div>

      </div>

      {/* ── CINEMATIC VIDEO LIGHTBOX / MODAL ── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">

            {/* Dark Elegant Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0"
              style={{ background: 'rgba(23, 32, 43, 0.92)', backdropFilter: 'blur(16px)' }}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl z-10 p-4 sm:p-6"
              style={{
                background: '#FFFDF8',
                border: '2px solid rgba(184, 148, 74, 0.35)',
              }}
            >
              {/* Header inside modal */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gold/20">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', color: '#D8BC76' }}
                  >
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest block" style={{ color: '#7E2634' }}>
                      CNI CHURCH MAHASAMUND — WORSHIP
                    </span>
                    <h3 className="font-serif font-bold text-[#17202B] text-base sm:text-xl">
                      {WORSHIP_SONG.title}
                    </h3>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2.5 rounded-full transition-colors"
                  style={{
                    color: '#7E2634',
                    background: 'rgba(126, 38, 52, 0.08)',
                    border: '1px solid rgba(184, 148, 74, 0.3)',
                    minWidth: '44px',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Close worship video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* YouTube Responsive 16:9 iFrame */}
              <div
                className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#17202B] shadow-inner"
                style={{ border: '1.5px solid rgba(184, 148, 74, 0.25)' }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${WORSHIP_SONG.id}?autoplay=1&mute=0&rel=0`}
                  title="Worship With Us — CNI Church Mahasamund"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Modal Footer Description */}
              <div className="mt-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6E6A63]">
                <p className="font-serif italic text-sm text-[#17202B]">
                  "{WORSHIP_SONG.verse}" {WORSHIP_SONG.reference}
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all text-[#FFFDF9]"
                  style={{
                    background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
                    minHeight: '44px',
                  }}
                >
                  Close Video
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
