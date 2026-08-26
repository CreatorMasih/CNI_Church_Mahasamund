import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, BookOpen, HeartHandshake, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function ServiceInfo() {
  const { data } = useCms();
  const info = data.serviceInfo || {};

  return (
    <section id="service" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.75 }}
        className="rounded-2xl p-4 sm:p-6 shadow-xl"
        style={{
          background: '#FFFDF8',
          border: '1.5px solid rgba(184, 148, 74, 0.35)',
          boxShadow: '0 12px 40px rgba(126, 38, 52, 0.08)',
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          {/* 1. SUNDAY SERVICE */}
          <a
            href="#about"
            className="group flex items-start space-x-3.5 p-3.5 rounded-xl transition-all hover:bg-ivory"
            style={{ border: '1px solid rgba(184, 148, 74, 0.18)', minHeight: '52px' }}
          >
            <div
              className="p-2.5 rounded-lg flex-shrink-0 transition-transform group-hover:scale-105"
              style={{ background: 'rgba(126, 38, 52, 0.08)', color: '#7E2634' }}
            >
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-widest" style={{ color: '#B8944A' }}>
                🕊 SUNDAY SERVICE
              </span>
              <h3 className="text-base font-serif font-bold text-[#17202B] group-hover:text-[#7E2634] transition-colors">
                Sunday Worship
              </h3>
              <p className="text-xs font-semibold" style={{ color: '#7E2634' }}>
                {info.sundayTiming || 'Sunday • 8:00 AM'}
              </p>
            </div>
          </a>

          {/* 2. NEXT EVENT */}
          <a
            href="#events"
            className="group flex items-start space-x-3.5 p-3.5 rounded-xl transition-all hover:bg-ivory"
            style={{ border: '1px solid rgba(184, 148, 74, 0.18)', minHeight: '52px' }}
          >
            <div
              className="p-2.5 rounded-lg flex-shrink-0 transition-transform group-hover:scale-105"
              style={{ background: 'rgba(184, 148, 74, 0.12)', color: '#B8944A' }}
            >
              <Calendar className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-widest" style={{ color: '#B8944A' }}>
                📅 NEXT EVENT
              </span>
              <h3 className="text-base font-serif font-bold text-[#17202B] group-hover:text-[#7E2634] transition-colors">
                Youth Fellowship
              </h3>
              <span
                className="inline-block mt-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold tracking-wider"
                style={{ background: 'rgba(126, 38, 52, 0.08)', color: '#7E2634' }}
              >
                {info.youthTiming || 'Saturday • 6:00 PM'}
              </span>
            </div>
          </a>

          {/* 3. VERSE OF THE DAY */}
          <div
            className="flex items-start space-x-3.5 p-3.5 rounded-xl"
            style={{ border: '1px solid rgba(184, 148, 74, 0.18)' }}
          >
            <div
              className="p-2.5 rounded-lg flex-shrink-0"
              style={{ background: 'rgba(126, 38, 52, 0.08)', color: '#7E2634' }}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-widest" style={{ color: '#B8944A' }}>
                📖 VERSE OF THE DAY
              </span>
              <blockquote className="text-xs font-serif italic text-[#17202B] leading-snug line-clamp-2 mt-0.5">
                "{info.verseOfDay || 'The Lord is my shepherd; I shall not want.'}"
              </blockquote>
              <span className="block text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: '#7E2634' }}>
                {info.verseOfDayReference || '— Psalm 23:1'}
              </span>
            </div>
          </div>

          {/* 4. PRAYER REQUEST */}
          <a
            href="#prayer"
            className="group flex items-start space-x-3.5 p-3.5 rounded-xl transition-all bg-ivory/50 hover:bg-ivory"
            style={{ border: '1px solid rgba(184, 148, 74, 0.3)', minHeight: '52px' }}
          >
            <div
              className="p-2.5 rounded-lg flex-shrink-0 transition-transform group-hover:scale-105"
              style={{ background: '#7E2634', color: '#FFFDF9' }}
            >
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-widest" style={{ color: '#B8944A' }}>
                🙏 PRAYER REQUEST
              </span>
              <h3 className="text-base font-serif font-bold text-[#17202B] group-hover:text-[#7E2634] transition-colors">
                Share Your Request
              </h3>
              <div className="flex items-center space-x-1 text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: '#7E2634' }}>
                <span>SEND PRAYER</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

        </div>
      </motion.div>
    </section>
  );
}
