import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Heart, Shield } from 'lucide-react';
import { IMAGES } from '../data/churchData';

const CHURCH_PHOTO = '/church.jpg';

const NAV_LINKS_FOOTER = [
  ['Home Page', '#home'],
  ['About Our Story', '#about'],
  ['Worship Timings', '#service'],
  ['Upcoming Events', '#events'],
  ['Church Ministries', '#ministries'],
  ['Life at Our Church', '#gallery'],
  ['Latest Sermons', '#sermons'],
  ['Prayer Request', '#prayer'],
];

export default function Footer({ onOpenVisit }) {
  return (
    <footer id="footer" className="relative overflow-hidden pt-16 sm:pt-24" style={{ background: 'linear-gradient(180deg, #F6F1E7 0%, #1D2733 35%, #17202B 100%)' }}>

      {/* ── FINAL CLOSING INVITATION BANNER ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-0">
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-14 lg:p-16 text-center"
          style={{ border: '1.5px solid rgba(216, 188, 118, 0.4)' }}
        >
          {/* Background Real Church Silhouette Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${CHURCH_PHOTO}')`, filter: 'brightness(0.6) contrast(1.1)' }}
          />
          {/* Warm Burgundy/Dark Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(78, 24, 34, 0.75) 0%, rgba(23, 32, 43, 0.92) 100%)' }}
          />
          {/* Warm Horizon Gold Radial */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-40 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at bottom, rgba(216, 188, 118, 0.25), transparent)' }}
          />

          <div className="relative z-10 max-w-xl mx-auto space-y-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: '#D8BC76' }}>
              ✝ AN OPEN INVITATION
            </span>
            <h2
              className="font-serif font-bold text-white tracking-tight leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}
            >
              COME AS YOU ARE.
            </h2>
            <p className="font-serif italic text-white/90 text-base sm:text-lg">
              You are always welcome here in the house of the Lord.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenVisit}
                className="px-9 py-4 rounded-full font-bold text-xs uppercase tracking-[0.25em] transition-all hover:brightness-110 active:scale-95 shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
                  color: '#FFFDF9',
                  border: '1.5px solid rgba(216, 188, 118, 0.4)',
                  minHeight: '54px',
                  boxShadow: '0 8px 25px rgba(126, 38, 52, 0.4)',
                }}
              >
                PLAN YOUR VISIT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER MAIN LINKS AREA ── */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12"
        style={{ borderBottom: '1px solid rgba(216, 188, 118, 0.15)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', color: '#D8BC76', border: '1px solid rgba(216, 188, 118, 0.3)' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M6 8h12" />
                </svg>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl font-bold tracking-wider text-white">CNI CHURCH</span>
                <span className="block text-[10px] tracking-[0.22em] uppercase font-bold text-gold-soft">MAHASAMUND</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-[#9E9A91] max-w-sm">
              Church of North India (CNI) — St. Peter's Church Mahasamund is dedicated to preaching the Gospel of Christ, nurturing spiritual growth, and serving our community with love and integrity.
            </p>

            <div
              className="p-4 rounded-xl text-xs sm:text-sm italic font-serif"
              style={{ background: 'rgba(126, 38, 52, 0.25)', border: '1px solid rgba(216, 188, 118, 0.25)', color: '#D8BC76' }}
            >
              "Let all that you do be done in love."
              <span className="block text-[10px] font-sans uppercase tracking-wider not-italic mt-1 text-[#9E9A91]">— 1 Corinthians 16:14</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base sm:text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS_FOOTER.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-xs sm:text-sm transition-colors text-[#9E9A91] hover:text-gold-soft"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Service & Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-base sm:text-lg font-bold text-white">Service & Location</h4>
            <div className="space-y-4 text-xs sm:text-sm text-[#9E9A91]">
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-soft" />
                <div>
                  <span className="text-white text-sm font-semibold block">Sunday Main Service</span>
                  <span>8:00 AM – 10:00 AM</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-soft" />
                <div>
                  <span className="text-white text-sm font-semibold block">Church Address</span>
                  <span>Station Road, Mahasamund,<br />Chhattisgarh — 493445</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-gold-soft" />
                <span>+91 7723 XXXXX / Contact Pastor</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-gold-soft" />
                <span>info@cnichurchmahasamund.org</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── COPYRIGHT FOOTER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9E9A91]">
        <p className="text-center sm:text-left">© 2026 CNI Church Mahasamund. All Rights Reserved.</p>
        <span className="font-bold text-gold-soft flex items-center space-x-1">
          <span>✝ To God Be The Glory</span>
        </span>
      </div>
    </footer>
  );
}
