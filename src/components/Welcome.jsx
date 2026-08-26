import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowUpRight, Shield } from 'lucide-react';

import { useCms } from '../context/CmsContext';

export default function Welcome({ onOpenVisit }) {
  const { data } = useCms();
  const about = data.about || {};
  const churchPhoto = about.photo || '/church.jpg';
  return (
    <section
      id="about"
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FFFDF8 0%, #F6F1E7 60%, #F0E8D7 100%)' }}
    >
      {/* Background Subtle Cross Watermark Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 100 140" className="w-[600px] h-[800px] text-[#7E2634] fill-current">
          <rect x="44" y="10" width="12" height="120" rx="2" />
          <rect x="15" y="38" width="70" height="12" rx="2" />
        </svg>
      </div>

      {/* Warm Ambient Glows */}
      <div
        className="absolute top-10 right-10 w-[450px] h-[450px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(216, 188, 118, 0.18) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(126, 38, 52, 0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Storytelling Heading & Narrative ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Eyebrow */}
            <div
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] justify-center lg:justify-start"
              style={{ color: '#7E2634' }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: '#B8944A' }} />
              <span>OUR STORY & HERITAGE</span>
            </div>

            {/* Gold Divider Line */}
            <div
              className="w-16 h-[2px] mx-auto lg:mx-0"
              style={{ background: 'linear-gradient(to right, #7E2634, #B8944A)' }}
            />

            {/* Main Headline */}
            <h2
              className="font-serif font-bold text-[#17202B] tracking-tight leading-[1.08]"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)' }}
            >
              More Than a Church.{' '}
              <span className="italic font-light text-[#7E2634] block">
                A Family in Christ.
              </span>
            </h2>

            {/* Narrative text */}
            <p className="text-[#6E6A63] text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Standing gracefully in Mahasamund, <strong className="font-semibold text-[#17202B]">St. Peter's Church (CNI Church Mahasamund)</strong> has been a sacred beacon of faith, hope, and Christian unity since 1909. Under the Church of North India (CNI) Diocese of Chhattisgarh, our parish continues to preach the Gospel of grace and nurture generations in biblical truth.
            </p>

            <p className="text-[#6E6A63] text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              Whether you are seeking spiritual sanctuary, meaningful fellowship, youth guidance, or a place to serve your neighbors, you will find open doors and warm hearts waiting for you.
            </p>

            {/* Heritage Highlights Strip */}
            <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg mx-auto lg:mx-0 text-left border-t border-gold/20">
              <div>
                <span className="block font-serif text-2xl font-bold text-[#7E2634]">1909</span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6E6A63]">Established</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-[#B8944A]">CNI</span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6E6A63]">Diocese of C.G.</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-[#17202B]">100+</span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6E6A63]">Parish Families</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <button
                onClick={onOpenVisit}
                className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg transition-all duration-300 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
                  color: '#FFFDF9',
                  minHeight: '48px',
                  boxShadow: '0 4px 20px rgba(126, 38, 52, 0.3)',
                }}
              >
                <span>PLAN A VISIT THIS SUNDAY</span>
                <ArrowUpRight className="w-4 h-4 text-gold-soft" />
              </button>
            </div>
          </motion.div>

          {/* ── RIGHT: Real Church Photo + Asymmetrical Floating Scripture Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Soft Warm Frame Backing */}
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(184, 148, 74, 0.2), rgba(126, 38, 52, 0.12))',
              }}
            />

            {/* Main Photo Frame */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl group"
              style={{ border: '4px solid #FFFDF8' }}
            >
              <img
                src={CHURCH_PHOTO}
                alt="St. Peter's Church — CNI Church Mahasamund"
                loading="lazy"
                className="w-full object-cover block transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  height: 'clamp(280px, 45vw, 480px)',
                  objectPosition: 'center 20%',
                  filter: 'brightness(1.06) contrast(1.05) saturate(1.1)',
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-20"
                style={{ background: 'linear-gradient(to top, rgba(23, 32, 43, 0.5), transparent)' }}
              />

              {/* Photo Title Overlay */}
              <div className="absolute bottom-4 left-4">
                <span
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
                  style={{
                    background: 'rgba(23, 32, 43, 0.7)',
                    color: '#D8BC76',
                    border: '1px solid rgba(216, 188, 118, 0.4)',
                  }}
                >
                  <Shield className="w-3 h-3 text-gold" />
                  <span>ST. PETER'S CHURCH, MAHASAMUND</span>
                </span>
              </div>
            </div>

            {/* Floating Scripture Card (Overlapping Asymmetrically) */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -top-6 -right-2 sm:-right-6 max-w-[210px] p-4 rounded-2xl shadow-xl"
              style={{
                background: '#FFFDF8',
                border: '1.5px solid rgba(184, 148, 74, 0.35)',
                boxShadow: '0 10px 30px rgba(78, 24, 34, 0.12)',
              }}
            >
              <div className="flex items-center space-x-1.5 mb-1.5" style={{ color: '#7E2634' }}>
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span className="text-[9px] font-bold uppercase tracking-widest">HOLY SCRIPTURE</span>
              </div>
              <p className="font-serif italic text-[#17202B] text-xs leading-snug">
                "Let all that you do be done in love."
              </p>
              <span
                className="block text-right text-[9px] uppercase tracking-wider font-bold mt-1.5"
                style={{ color: '#B8944A' }}
              >
                — 1 Cor 16:14
              </span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
