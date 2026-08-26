import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, MapPin } from 'lucide-react';

const NAV_LINKS = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SERVICE', href: '#service' },
  { name: 'EVENTS', href: '#events' },
  { name: 'MINISTRIES', href: '#ministries' },
  { name: 'GALLERY', href: '#gallery' },
  { name: 'SERMONS', href: '#sermons' },
  { name: 'PRAYER', href: '#prayer' },
  { name: 'CONTACT', href: '#footer' },
];

export default function Navbar({ onOpenVisit }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(246, 241, 231, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(184, 148, 74, 0.25)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 20px rgba(78, 24, 34, 0.06)' : 'none',
          paddingTop: scrolled ? '10px' : '16px',
          paddingBottom: scrolled ? '10px' : '16px',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Left Logo: Subtle Cross Icon + CNI CHURCH MAHASAMUND */}
          <a href="#home" className="flex items-center space-x-3 group flex-shrink-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
                boxShadow: '0 2px 10px rgba(126, 38, 52, 0.25)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gold-soft"
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
              <span
                className="block font-serif text-base sm:text-lg font-bold tracking-wider text-[#17202B]"
                style={{ lineHeight: 1.1 }}
              >
                CNI CHURCH
              </span>
              <span
                className="block text-[9px] tracking-[0.25em] font-bold uppercase"
                style={{ color: '#7E2634' }}
              >
                MAHASAMUND
              </span>
            </div>
          </a>

          {/* Center Links (Desktop) */}
          <nav className="hidden xl:flex items-center space-x-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-semibold tracking-[0.18em] py-1 relative group transition-colors text-[#17202B] hover:text-[#7E2634]"
              >
                {link.name}
                <span
                  className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                  style={{ background: '#7E2634' }}
                />
              </a>
            ))}
          </nav>

          {/* Right CTA (Desktop) */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenVisit}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:brightness-110 active:scale-95 shadow-md"
              style={{
                background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
                color: '#FFFDF9',
                boxShadow: '0 4px 15px rgba(126, 38, 52, 0.3)',
                minHeight: '44px',
              }}
            >
              <MapPin className="w-3.5 h-3.5 text-gold-soft" />
              <span>PLAN YOUR VISIT</span>
            </button>

            <a
              href="/admin/login"
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider text-[#7E2634] hover:bg-burgundy/10 transition-colors"
              style={{ border: '1px solid rgba(126, 38, 52, 0.3)', minHeight: '40px' }}
              title="Church Admin CMS Login"
            >
              <span>🔐 ADMIN</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="xl:hidden flex items-center space-x-2">
            <button
              onClick={onOpenVisit}
              className="sm:hidden px-3.5 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider"
              style={{
                background: '#7E2634',
                color: '#FFFDF9',
                minHeight: '38px',
              }}
            >
              VISIT
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl transition-colors text-[#17202B]"
              style={{
                background: mobileMenuOpen ? 'rgba(126, 38, 52, 0.1)' : 'rgba(184, 148, 74, 0.1)',
                border: '1px solid rgba(184, 148, 74, 0.3)',
                minHeight: '44px',
                minWidth: '44px',
              }}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-30 xl:hidden"
              style={{ background: 'rgba(23, 32, 43, 0.4)', backdropFilter: 'blur(4px)' }}
            />
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="fixed top-[64px] left-3 right-3 z-40 xl:hidden rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: '#FFFDF8',
                border: '1.5px solid rgba(184, 148, 74, 0.3)',
              }}
            >
              <div className="p-4 space-y-1">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-[#17202B] hover:text-[#7E2634] hover:bg-ivory transition-colors"
                    style={{ minHeight: '48px' }}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gold" />
                  </motion.a>
                ))}
                <div className="h-px my-2 bg-gold/20" />
                <button
                  onClick={() => { closeMobileMenu(); onOpenVisit(); }}
                  className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-center shadow-lg transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
                    color: '#FFFDF9',
                    minHeight: '50px',
                  }}
                >
                  ✝ PLAN YOUR VISIT
                </button>
                <a
                  href="/admin/login"
                  onClick={closeMobileMenu}
                  className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-center block mt-2 text-[#7E2634] bg-burgundy/10 border border-gold/30"
                  style={{ minHeight: '46px' }}
                >
                  🔐 ADMIN CMS PORTAL
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
