import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, X, Sparkles } from 'lucide-react';
import { EVENTS } from '../data/churchData';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const featuredEvent = EVENTS[0];
  const upcomingEvents = EVENTS.slice(1);

  return (
    <section id="events" className="py-20 sm:py-28 lg:py-32 relative" style={{ background: '#F6F1E7' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#7E2634' }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#B8944A' }} />
            <span>WHAT'S HAPPENING</span>
          </div>
          <h2 className="font-serif font-bold text-[#17202B] tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Upcoming Gatherings & <span className="italic font-light text-[#7E2634]">Events</span>
          </h2>
          <div className="w-12 h-[2px] mx-auto" style={{ background: 'linear-gradient(to right, #7E2634, #B8944A)' }} />
        </div>

        {/* ── ASYMMETRICAL EVENT COMPOSITION ──
            LEFT: 1 Large Featured Event Card (7 cols on lg)
            RIGHT: 2 Smaller Vertically Stacked Event Cards (5 cols on lg) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT: Large Featured Event Card */}
          {featuredEvent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onClick={() => setSelectedEvent(featuredEvent)}
              className="lg:col-span-7 group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-end min-h-[380px] sm:min-h-[440px] transform transition-transform duration-500 hover:-translate-y-1 shadow-xl"
              style={{
                border: '1.5px solid rgba(184, 148, 74, 0.3)',
                background: '#FFFDF8',
              }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${featuredEvent.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17202B]/92 via-[#17202B]/35 to-transparent" />

              {/* Badges */}
              <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
                <span
                  className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md"
                  style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', color: '#FFFDF9' }}
                >
                  FEATURED EVENT • {featuredEvent.date}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-bold text-[#FFFDF9]"
                  style={{ background: 'rgba(23, 32, 43, 0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(216, 188, 118, 0.4)' }}
                >
                  {featuredEvent.category}
                </span>
              </div>

              {/* Featured Content */}
              <div className="relative z-10 p-6 sm:p-8 space-y-3">
                <h3 className="font-serif font-bold text-[#FFFDF9] leading-tight" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>
                  {featuredEvent.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-xs text-[#D8BC76]">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-gold-soft" />
                    <span>{featuredEvent.time}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-gold-soft" />
                    <span>{featuredEvent.location}</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#F6F1E7]/80 line-clamp-2 leading-relaxed font-light">
                  {featuredEvent.description}
                </p>
                <div className="pt-2 flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-soft group-hover:translate-x-1 transition-transform">
                  <span>VIEW FULL DETAILS</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          )}

          {/* RIGHT: 2 Smaller Vertically Stacked Events */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {upcomingEvents.map((evt, idx) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
                onClick={() => setSelectedEvent(evt)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer flex-1 flex flex-col sm:flex-row items-stretch transition-transform duration-400 hover:-translate-y-1 shadow-lg"
                style={{
                  background: '#FFFDF8',
                  border: '1.5px solid rgba(184, 148, 74, 0.25)',
                  minHeight: '190px',
                }}
              >
                {/* Image side */}
                <div className="sm:w-2/5 relative min-h-[160px] sm:min-h-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105"
                    style={{ backgroundImage: `url('${evt.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FFFDF8]/40 hidden sm:block" />
                  <div className="absolute top-3 left-3 sm:hidden z-10">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#7E2634] text-[#FFFDF9]">
                      {evt.date}
                    </span>
                  </div>
                </div>

                {/* Details side */}
                <div className="sm:w-3/5 p-5 flex flex-col justify-between">
                  <div>
                    <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#7E2634' }}>
                      {evt.date} • {evt.category}
                    </span>
                    <h4 className="font-serif font-bold text-[#17202B] text-lg group-hover:text-[#7E2634] transition-colors leading-snug line-clamp-2">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-[#6E6A63] mt-1.5 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span className="truncate">{evt.time}</span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-[#B8944A] pt-3 group-hover:translate-x-1 transition-transform">
                    <span>VIEW EVENT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0"
              style={{ background: 'rgba(23, 32, 43, 0.75)', backdropFilter: 'blur(8px)' }}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl z-10 text-[#17202B]"
              style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.35)', maxHeight: '90vh', overflowY: 'auto' }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#7E2634]">
                    {selectedEvent.category} • {selectedEvent.date}
                  </span>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 rounded-full transition-colors text-[#7E2634] bg-burgundy/10"
                    style={{ minWidth: '40px', minHeight: '40px' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="font-serif font-bold text-[#17202B] text-2xl mb-4">{selectedEvent.title}</h3>

                <div className="relative h-48 rounded-xl overflow-hidden mb-5" style={{ border: '1px solid rgba(184, 148, 74, 0.2)' }}>
                  <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex items-center space-x-3 text-[#17202B]">
                    <Clock className="w-4 h-4 text-[#7E2634]" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[#17202B]">
                    <MapPin className="w-4 h-4 text-[#7E2634]" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#6E6A63] pt-3 border-t border-gold/20">
                    {selectedEvent.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-[#FFFDF9]"
                  style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '50px' }}
                >
                  Close Event Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
