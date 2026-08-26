import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function Memorial() {
  const { data } = useCms();
  const [litCandles, setLitCandles] = useState([1]);

  const memorials = data.memorials || [];

  const toggleCandle = (id) => {
    setLitCandles(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="memorial"
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1D2733 0%, #4E1822 60%, #321017 100%)' }}
    >
      {/* Warm Center Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(216, 188, 118, 0.18) 0%, rgba(184, 148, 74, 0.06) 50%, transparent 80%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#D8BC76' }}>
            <Sparkles className="w-3.5 h-3.5 text-gold-soft" />
            <span>HONORING DEPARTED SAINTS</span>
          </div>
          <h2 className="font-serif font-bold text-white tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            IN LOVING MEMORY
          </h2>
          <div className="w-12 h-[2px] mx-auto" style={{ background: 'linear-gradient(to right, #D8BC76, #B8944A)' }} />

          <blockquote className="font-serif italic text-[#FFFDF9]/90 pt-3 leading-relaxed" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            "Blessed are those who mourn, for they shall be comforted."
          </blockquote>
          <span className="block text-[11px] uppercase tracking-[0.25em] font-bold pt-1 text-gold-soft">
            — Matthew 5:4
          </span>
        </div>

        {/* Tribute Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {memorials.map((item) => {
            const isLit = litCandles.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="p-6 sm:p-8 rounded-3xl relative flex flex-col justify-between shadow-2xl"
                style={{
                  background: 'rgba(23, 32, 43, 0.85)',
                  border: '1.5px solid rgba(216, 188, 118, 0.3)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* Top Gold Accent Line */}
                <div className="absolute top-0 left-8 right-8 h-[1.5px] rounded-full" style={{ background: 'linear-gradient(to right, transparent, rgba(216, 188, 118, 0.5), transparent)' }} />

                <div>
                  {/* Candle Display & Interactive Button */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      {/* Animated Candle Flame */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3.5 h-5 rounded-t-full rounded-b-sm mb-0.5 transition-all ${isLit ? 'animate-flame' : ''}`}
                          style={{
                            background: isLit
                              ? 'linear-gradient(to top, #D8BC76, #FFA500, #FF6B00)'
                              : 'rgba(216, 188, 118, 0.2)',
                            boxShadow: isLit
                              ? '0 0 12px rgba(255, 140, 0, 0.7), 0 0 25px rgba(216, 188, 118, 0.4)'
                              : 'none',
                          }}
                        />
                        <div
                          className="w-3 h-8 rounded-sm"
                          style={{
                            background: isLit
                              ? 'linear-gradient(to bottom, #FFF8DC, #F5E6A3)'
                              : '#3a2d24',
                            border: '1px solid rgba(216, 188, 118, 0.3)',
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-soft">
                        {item.years}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleCandle(item.id)}
                      className="px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all active:scale-95"
                      style={{
                        minHeight: '40px',
                        ...(isLit
                          ? { background: 'rgba(216, 188, 118, 0.18)', color: '#D8BC76', border: '1px solid rgba(216, 188, 118, 0.5)' }
                          : { background: 'rgba(255, 255, 255, 0.05)', color: '#9E9A91', border: '1px solid rgba(216, 188, 118, 0.2)' }),
                      }}
                    >
                      {isLit ? '🕯️ Candle Lit' : 'Light Candle'}
                    </button>
                  </div>

                  <h3 className="font-serif font-bold text-white text-xl sm:text-2xl mb-3 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EBE4D5]/80 leading-relaxed mb-6 font-light">
                    {item.tribute}
                  </p>
                </div>

                <div className="pt-4 text-xs font-serif italic text-gold-soft border-t border-gold/20">
                  {item.verse}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
