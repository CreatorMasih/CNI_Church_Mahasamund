import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Clock, Volume2, BookOpen } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function Sermons({ onOpenVideo }) {
  const { data } = useCms();
  const sermons = data.sermons || {};
  const featured = sermons.featured || {};
  const recent = sermons.recent || [];
  return (
    <section id="sermons" className="py-20 sm:py-28 lg:py-32 relative" style={{ background: '#F6F1E7' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#7E2634' }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#B8944A' }} />
            <span>THE LIVING WORD</span>
          </div>
          <h2 className="font-serif font-bold text-[#17202B] tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Latest Messages & <span className="italic font-light text-[#7E2634]">Sermons</span>
          </h2>
          <div className="w-12 h-[2px] mx-auto" style={{ background: 'linear-gradient(to right, #7E2634, #B8944A)' }} />
          <p className="text-sm text-[#6E6A63] pt-1">
            Listen to inspiring sermons, biblical expositions, and divine wisdom recorded live during Sunday services.
          </p>
        </div>

        {/* ── FEATURED SERMON CARD (LARGE VIDEO BROADCAST VISUAL) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          onClick={() => onOpenVideo(featured.title, featured.date)}
          className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-xl mb-12 flex flex-col lg:flex-row border border-gold/30"
          style={{ background: '#FFFDF8' }}
        >
          {/* Featured Visual */}
          <div className="lg:w-7/12 relative overflow-hidden" style={{ minHeight: 'clamp(240px, 45vw, 420px)' }}>
            <img
              src={featured.image}
              alt={featured.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Soft vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#17202B]/80 via-transparent to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FFFDF8]/40 hidden lg:block" />

            {/* Large Play Message Overlay Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="inline-flex items-center space-x-3 px-6 py-3.5 rounded-full shadow-2xl group-hover:scale-105 transition-transform"
                style={{
                  background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
                  color: '#FFFDF9',
                  border: '1.5px solid rgba(216, 188, 118, 0.4)',
                }}
              >
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-[#17202B]">
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">▶ PLAY MESSAGE</span>
              </div>
            </div>
          </div>

          {/* Featured Details Panel */}
          <div className="lg:w-5/12 p-6 sm:p-10 flex flex-col justify-between" style={{ background: '#FFFDF8' }}>
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-burgundy/10 text-[#7E2634]">
                  {featured.series}
                </span>
                <span className="text-xs font-semibold text-[#B8944A]">
                  {featured.duration}
                </span>
              </div>

              <h3 className="font-serif font-bold text-[#17202B] text-2xl sm:text-3xl mb-3 leading-snug group-hover:text-[#7E2634] transition-colors">
                {featured.title}
              </h3>

              <p className="text-xs font-bold uppercase tracking-wider mb-4 text-[#7E2634]">
                {featured.speaker} — {featured.date}
              </p>

              <p className="text-xs sm:text-sm text-[#6E6A63] leading-relaxed mb-6">
                {featured.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gold/20">
              <div className="flex items-center space-x-1.5 text-xs text-[#6E6A63]">
                <BookOpen className="w-4 h-4 text-gold" />
                <span>Scripture Exposition</span>
              </div>
              <span className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-[#7E2634] group-hover:translate-x-1 transition-transform">
                <Volume2 className="w-4 h-4" />
                <span>WATCH BROADCAST</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── RECENT MESSAGES HORIZONTAL SCROLL ROW ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-xl font-bold text-[#17202B]">Recent Message Archive</h4>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B8944A]">Swipe for more</span>
          </div>

          <div className="flex items-center gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {recent.map((serm, index) => (
              <motion.div
                key={serm.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => onOpenVideo(serm.title, serm.date)}
                className="group flex-shrink-0 w-[260px] sm:w-[300px] rounded-2xl p-4 cursor-pointer transition-transform duration-300 hover:-translate-y-1 shadow-md"
                style={{
                  background: '#FFFDF8',
                  border: '1.5px solid rgba(184, 148, 74, 0.25)',
                }}
              >
                {/* Thumbnail */}
                <div className="relative h-36 rounded-xl overflow-hidden mb-3 border border-gold/20">
                  <img
                    src={serm.image}
                    alt={serm.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#7E2634] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 ml-0.5 fill-current" />
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 text-[#7E2634]">
                  {serm.date} • {serm.duration}
                </span>
                <h5 className="font-serif font-bold text-[#17202B] text-base group-hover:text-[#7E2634] transition-colors line-clamp-2">
                  {serm.title}
                </h5>
                <p className="text-xs text-[#6E6A63] mt-1">{serm.speaker}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
