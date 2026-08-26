import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Phone, Mail, Compass } from 'lucide-react';

export default function VisitModal({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
          style={{ background: 'rgba(23, 32, 43, 0.75)', backdropFilter: 'blur(10px)' }}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full sm:max-w-2xl z-10 overflow-hidden"
          style={{
            background: '#FFFDF8',
            borderRadius: '24px 24px 0 0',
          }}
        >
          <div className="hidden sm:block absolute inset-0 rounded-2xl pointer-events-none" style={{ borderRadius: '16px', border: '1.5px solid rgba(184, 148, 74, 0.35)' }} />

          {/* Drag handle pill on mobile */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(184, 148, 74, 0.4)' }} />
          </div>

          <div className="max-h-[90vh] overflow-y-auto p-5 sm:p-8">

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex items-center justify-center rounded-full transition-colors"
              style={{ color: '#7E2634', background: 'rgba(126, 38, 52, 0.08)', border: '1px solid rgba(184, 148, 74, 0.3)', width: '44px', height: '44px' }}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 pr-10">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: '#7E2634' }}>
                ✝ YOU ARE MOST WELCOME
              </span>
              <h3 className="font-serif font-bold text-[#17202B]" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
                Plan Your Visit to{' '}
                <span className="text-[#7E2634]">CNI Church Mahasamund</span>
              </h3>
              <p className="text-sm text-[#6E6A63] mt-2 max-w-md mx-auto leading-relaxed">
                We look forward to welcoming you and your family with open arms to St. Peter's Church.
              </p>
            </div>

            {/* Schedule & Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">

              {/* Service Schedule */}
              <div className="p-4 sm:p-5 rounded-xl" style={{ background: '#F6F1E7', border: '1px solid rgba(184, 148, 74, 0.25)' }}>
                <div className="flex items-center space-x-2.5 mb-3" style={{ color: '#7E2634' }}>
                  <Clock className="w-5 h-5 flex-shrink-0" />
                  <h4 className="font-serif text-lg font-bold text-[#17202B]">Service Schedule</h4>
                </div>
                <ul className="space-y-2.5 text-sm">
                  {[
                    ['Sunday Main Service', '8:00 AM – 10:00 AM'],
                    ['Sunday School', '7:00 AM – 8:00 AM'],
                    ['Youth Fellowship', 'Sat 6:00 PM'],
                    ["Women's Prayer", 'Wed 5:00 PM'],
                  ].map(([label, time]) => (
                    <li key={label} className="flex items-center justify-between py-1.5 border-b border-gold/15">
                      <span className="text-[#17202B] font-medium">{label}</span>
                      <span className="font-bold text-xs" style={{ color: '#7E2634' }}>{time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location & Contact */}
              <div className="p-4 sm:p-5 rounded-xl" style={{ background: '#F6F1E7', border: '1px solid rgba(184, 148, 74, 0.25)' }}>
                <div className="flex items-center space-x-2.5 mb-3" style={{ color: '#7E2634' }}>
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <h4 className="font-serif text-lg font-bold text-[#17202B]">Location & Contact</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <p className="text-[#17202B] leading-relaxed">
                    Station Road / Church Campus, Mahasamund, Chhattisgarh — 493445
                  </p>
                  <a href="tel:+917723XXXXX" className="flex items-center space-x-2 font-medium" style={{ color: '#7E2634' }}>
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>+91 7723 XXXXX</span>
                  </a>
                  <a href="mailto:info@cnichurchmahasamund.org" className="flex items-start space-x-2 font-medium text-xs break-all" style={{ color: '#7E2634' }}>
                    <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>info@cnichurchmahasamund.org</span>
                  </a>
                </div>
              </div>
            </div>

            {/* What to expect */}
            <div className="flex items-start space-x-3 p-4 rounded-xl mb-5 text-sm" style={{ background: 'rgba(126, 38, 52, 0.06)', border: '1px solid rgba(126, 38, 52, 0.2)' }}>
              <Compass className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#7E2634]" />
              <div>
                <span className="font-bold text-[#17202B] block mb-1">Your first visit</span>
                <span className="text-[#6E6A63] leading-relaxed">Friendly greeters, peaceful acoustic worship hymns, clear Bible-based preaching, and warm fellowship after service.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-1">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors active:scale-95"
                style={{ color: '#6E6A63', border: '1.5px solid rgba(184, 148, 74, 0.3)', minHeight: '48px' }}
              >
                Close
              </button>
              <a
                href="https://maps.google.com/?q=St+Peters+Church+Mahasamund"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-center transition-all hover:brightness-110 active:scale-95 shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
                  color: '#FFFDF9',
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Open in Google Maps
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
}
