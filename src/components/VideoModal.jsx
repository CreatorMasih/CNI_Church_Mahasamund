import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, BookOpen } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, videoTitle, videoSubtitle }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
          style={{ background: 'rgba(23, 32, 43, 0.85)', backdropFilter: 'blur(12px)' }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl z-10 p-5 sm:p-6"
          style={{
            background: '#FFFDF8',
            border: '1.5px solid rgba(184, 148, 74, 0.35)',
          }}
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gold/20">
            <div>
              <span className="text-[10px] uppercase tracking-widest block font-bold" style={{ color: '#7E2634' }}>
                {videoSubtitle || "Sermon Broadcast & Media"}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#17202B]">
                {videoTitle || "Walking by Faith — CNI Church Mahasamund"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#7E2634] hover:bg-burgundy/10 rounded-full transition-colors"
              style={{ minWidth: '40px', minHeight: '40px' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Player Container */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#17202B] flex items-center justify-center border border-gold/30">
            <div className="absolute inset-0 bg-gradient-to-t from-[#17202B] via-[#17202B]/70 to-transparent flex flex-col items-center justify-center p-6 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-[#FFFDF9] shadow-2xl animate-pulse"
                style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', border: '1.5px solid #D8BC76' }}
              >
                <Play className="w-7 h-7 ml-1 fill-current" />
              </div>
              <h4 className="text-lg sm:text-xl font-serif text-white mb-2">
                "For where two or three gather in my name, there am I with them."
              </h4>
              <p className="text-xs text-[#EBE4D5]/80 max-w-md mb-4 font-light">
                Watch recorded sermon messages, worship praise melodies, and holy communion reflections from CNI Church Mahasamund.
              </p>
              <span className="inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-full text-gold-soft border border-gold/30" style={{ background: 'rgba(216, 188, 118, 0.12)' }}>
                <BookOpen className="w-3.5 h-3.5" />
                <span>Matthew 18:20 — Sunday Sermon Stream</span>
              </span>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-[#FFFDF9]"
              style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '44px' }}
            >
              Close Broadcast
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
