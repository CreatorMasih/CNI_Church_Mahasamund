import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, ShieldCheck, Sparkles, Heart } from 'lucide-react';

import { useCms } from '../context/CmsContext';

export default function Prayer() {
  const { addPrayerRequest } = useCms();
  const [formData, setFormData] = useState({ name: '', contact: '', request: '', isPrivate: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.request.trim()) return;
    setLoading(true);
    addPrayerRequest(formData);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 800);
  };

  const handleReset = () => {
    setFormData({ name: '', contact: '', request: '', isPrivate: false });
    setSubmitted(false);
  };

  return (
    <section
      id="prayer"
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #4E1822 0%, #17202B 60%, #1D2733 100%)' }}
    >
      {/* Gentle Candlelight Ambient Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.96, 1.04, 0.96] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(216, 188, 118, 0.22) 0%, rgba(184, 148, 74, 0.08) 50%, transparent 80%)' }}
        />
      </div>

      {/* Floating Gold Sparks */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -22, 0], opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
            className="absolute rounded-full"
            style={{
              width: `${2 + (i % 2)}px`,
              height: `${2 + (i % 2)}px`,
              top: `${Math.random() * 85 + 5}%`,
              left: `${Math.random() * 90}%`,
              background: '#D8BC76',
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#D8BC76' }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#D8BC76' }} />
            <span>HEARTFUL INTERCESSION</span>
          </div>
          <h2 className="font-serif font-bold text-white tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            How Can We <span className="italic font-light text-gold-soft">Pray for You?</span>
          </h2>
          <div className="w-12 h-[2px] mx-auto" style={{ background: 'linear-gradient(to right, #D8BC76, #B8944A)' }} />
          <p className="text-sm sm:text-base text-[#EBE4D5]/80 max-w-lg mx-auto pt-1 font-light leading-relaxed">
            You are not alone. Whatever trial, joy, or intention you carry today, our prayer team will stand with you in faith.
          </p>
        </div>

        {/* Sacred Form Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="relative rounded-3xl p-6 sm:p-10 shadow-2xl"
          style={{
            background: 'rgba(23, 32, 43, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(216, 188, 118, 0.35)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          {/* Top Gold Line */}
          <div className="absolute top-0 left-10 right-10 h-[2px] rounded-full" style={{ background: 'linear-gradient(to right, transparent, #D8BC76, transparent)' }} />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D8BC76]">
                      Your Name <span className="text-white/50 font-normal normal-case">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Brother John"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
                      style={{
                        background: 'rgba(126, 38, 52, 0.25)',
                        border: '1px solid rgba(216, 188, 118, 0.3)',
                        fontSize: '16px',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#D8BC76'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(216, 188, 118, 0.3)'; }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D8BC76]">
                      Phone or Email <span className="text-white/50 font-normal normal-case">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Contact for follow-up"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
                      style={{
                        background: 'rgba(126, 38, 52, 0.25)',
                        border: '1px solid rgba(216, 188, 118, 0.3)',
                        fontSize: '16px',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#D8BC76'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(216, 188, 118, 0.3)'; }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D8BC76]">
                    Prayer Request <span style={{ color: '#D8BC76' }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your heartfelt prayer request here..."
                    value={formData.request}
                    onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none transition-colors leading-relaxed resize-none"
                    style={{
                      background: 'rgba(126, 38, 52, 0.25)',
                      border: '1px solid rgba(216, 188, 118, 0.3)',
                      fontSize: '16px',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#D8BC76'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(216, 188, 118, 0.3)'; }}
                  />
                </div>

                <label
                  htmlFor="private-check"
                  className="flex items-center space-x-3 cursor-pointer py-1"
                  style={{ minHeight: '44px' }}
                >
                  <input
                    type="checkbox"
                    id="private-check"
                    checked={formData.isPrivate}
                    onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: '#B8944A' }}
                  />
                  <span className="flex items-center space-x-1.5 text-xs text-[#EBE4D5]/90">
                    <ShieldCheck className="w-4 h-4 text-gold-soft flex-shrink-0" />
                    <span>Keep my request strictly confidential with the Pastor</span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl font-bold text-xs uppercase tracking-[0.25em] flex items-center justify-center space-x-2 transition-all hover:brightness-110 active:scale-95 shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
                    color: '#FFFDF9',
                    border: '1px solid rgba(216, 188, 118, 0.4)',
                    minHeight: '54px',
                    boxShadow: '0 6px 20px rgba(126, 38, 52, 0.4)',
                  }}
                >
                  {loading ? (
                    <span>SUBMITTING PRAYER...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-gold-soft" />
                      <span>SEND PRAYER REQUEST</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                  style={{ background: 'rgba(216, 188, 118, 0.15)', border: '2px solid #D8BC76', color: '#D8BC76' }}
                >
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white">Prayer Received in Faith</h3>
                <p className="text-[#EBE4D5]/80 text-sm max-w-md mx-auto leading-relaxed">
                  "The prayer of a righteous person is powerful and effective." — James 5:16 <br /><br />
                  Our prayer team has received your request and will lift your intentions up in intercession.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
                  style={{ border: '1.5px solid #D8BC76', color: '#D8BC76', minHeight: '44px' }}
                >
                  Send Another Prayer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
