import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Heart, BookOpen, Music, ShieldCheck, HandHeart, ArrowUpRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const MINISTRY_ICONS = {
  youth: Users,
  women: Heart,
  'sunday-school': BookOpen,
  choir: Music,
  prayer: ShieldCheck,
  community: HandHeart,
};

export default function Ministries() {
  const { data } = useCms();
  const ministries = data.ministries || [];
  return (
    <section id="ministries" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F6F1E7 0%, #FFFDF8 50%, #F0E8D7 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#7E2634' }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#B8944A' }} />
            <span>SERVING GOD & COMMUNITY</span>
          </div>
          <h2 className="font-serif font-bold text-[#17202B] tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Church <span className="italic font-light text-[#7E2634]">Ministries</span>
          </h2>
          <div className="w-12 h-[2px] mx-auto" style={{ background: 'linear-gradient(to right, #7E2634, #B8944A)' }} />
          <p className="text-sm text-[#6E6A63] pt-1">
            Discover your calling and connect with dedicated ministry groups nurturing faith, fellowship, and service.
          </p>
        </div>

        {/* ── ASYMMETRICAL INTERACTIVE EDITORIAL GRID ──
            Card 0 (Youth): Wide 2-col span on sm+
            Card 1 (Women): 1-col
            Card 2 (Sunday School): 1-col
            Card 3 (Choir): Tall card
            Card 4 (Prayer): 1-col
            Card 5 (Community): Wide 2-col span on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINISTRIES.map((min, index) => {
            const IconComponent = MINISTRY_ICONS[min.id] || Sparkles;
            const isWide = index === 0 || index === 5; // Asymmetrical span for first and last

            return (
              <motion.div
                key={min.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-end transform transition-all duration-500 hover:-translate-y-1 shadow-lg ${
                  isWide ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
                style={{
                  height: isWide ? 'clamp(280px, 35vw, 340px)' : 'clamp(300px, 40vw, 380px)',
                  border: '1.5px solid rgba(184, 148, 74, 0.3)',
                  background: '#FFFDF8',
                }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-108"
                  style={{ backgroundImage: `url('${min.image}')` }}
                />

                {/* Dark Burgundy Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17202B]/90 via-[#4E1822]/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                {/* Card Content */}
                <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-end h-full">
                  
                  {/* Top Icon Badge */}
                  <div className="flex items-center justify-between mb-auto">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md"
                      style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', color: '#D8BC76', border: '1px solid rgba(216, 188, 118, 0.3)' }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md opacity-90"
                      style={{ background: 'rgba(23, 32, 43, 0.6)', color: '#D8BC76', border: '1px solid rgba(216, 188, 118, 0.3)' }}
                    >
                      {min.leader}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 pt-4">
                    <h3 className="font-serif font-bold text-[#FFFDF9] transition-colors group-hover:text-gold-soft" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}>
                      {min.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F6F1E7]/80 line-clamp-2 leading-relaxed font-light">
                      {min.description}
                    </p>
                  </div>

                  {/* Bottom Accent Indicator */}
                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-gold/20">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-soft flex items-center space-x-1">
                      <span>LEARN MORE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                    <div className="w-8 h-[2px] bg-gold transition-all duration-500 group-hover:w-16" />
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
