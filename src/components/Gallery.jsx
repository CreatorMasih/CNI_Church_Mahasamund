import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/churchData';

const CATEGORIES = ['ALL', 'WORSHIP', 'CELEBRATIONS', 'YOUTH', 'FELLOWSHIP', 'OUTREACH'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = activeCategory === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => {
        if (activeCategory === 'CELEBRATIONS') return item.category === 'Celebration' || item.category === 'Christmas' || item.category === 'Easter';
        if (activeCategory === 'OUTREACH') return item.category === 'Community';
        return item.category.toUpperCase() === activeCategory;
      });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowRight') setLightboxIndex((p) => (p + 1) % filteredItems.length);
      else if (e.key === 'ArrowLeft') setLightboxIndex((p) => (p - 1 + filteredItems.length) % filteredItems.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <section id="gallery" className="py-20 sm:py-28 lg:py-32 relative" style={{ background: '#F6F1E7' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#7E2634' }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#B8944A' }} />
            <span>MOMENTS & MEMORIES</span>
          </div>
          <h2 className="font-serif font-bold text-[#17202B] tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            LIFE AT OUR <span className="italic font-light text-[#7E2634]">CHURCH</span>
          </h2>
          <div className="w-12 h-[2px] mx-auto" style={{ background: 'linear-gradient(to right, #7E2634, #B8944A)' }} />
          <p className="text-sm text-[#6E6A63] pt-1">
            Glimpses of sacred worship, vibrant youth gatherings, sisterhood fellowship, and community service.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95"
              style={{
                minHeight: '40px',
                ...(activeCategory === cat
                  ? { background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', color: '#FFFDF9', boxShadow: '0 4px 15px rgba(126, 38, 52, 0.25)' }
                  : { background: '#FFFDF8', color: '#6E6A63', border: '1px solid rgba(184, 148, 74, 0.3)' }),
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Masonry Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                transition={{ duration: 0.35 }}
                onClick={() => setLightboxIndex(index)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                  item.aspect === 'tall' ? 'sm:row-span-2' : ''
                }`}
                style={{
                  height: item.aspect === 'tall' ? 'clamp(260px, 40vw, 420px)' : 'clamp(140px, 22vw, 250px)',
                  boxShadow: '0 4px 20px rgba(23, 32, 43, 0.08)',
                  border: '3px solid #FFFDF8',
                }}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
                    style={{ background: 'rgba(255, 253, 248, 0.9)', color: '#7E2634', backdropFilter: 'blur(4px)' }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Hover Reveal */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#17202B]/85 via-[#17202B]/20 to-transparent" />

                <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-white">
                  <h3 className="text-sm font-serif font-bold text-white leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-1.5 mt-1.5 text-gold-soft">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="text-[9px] uppercase tracking-wider font-bold">VIEW FULL PHOTO</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0"
              style={{ background: 'rgba(23, 32, 43, 0.95)', backdropFilter: 'blur(16px)' }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-4xl flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-14 right-0 p-2.5 rounded-full text-white/80 hover:text-gold transition-colors"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={() => setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full text-white hover:text-gold transition-colors"
                style={{ background: 'rgba(23, 32, 43, 0.7)', border: '1px solid rgba(216, 188, 118, 0.3)' }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredItems.length)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full text-white hover:text-gold transition-colors"
                style={{ background: 'rgba(23, 32, 43, 0.7)', border: '1px solid rgba(216, 188, 118, 0.3)' }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Image */}
              <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black" style={{ maxHeight: '72vh', border: '2px solid rgba(216, 188, 118, 0.3)' }}>
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="w-full h-full object-contain mx-auto"
                  style={{ maxHeight: '72vh' }}
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-soft block mb-1">
                  {filteredItems[lightboxIndex].category} — CNI CHURCH MAHASAMUND
                </span>
                <h3 className="text-xl font-serif text-white">
                  {filteredItems[lightboxIndex].title}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
