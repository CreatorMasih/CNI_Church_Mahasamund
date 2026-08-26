import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Megaphone,
  Music,
  Image,
  Users,
  BookOpen,
  HeartHandshake,
  Flame,
  Folder,
  Settings,
  Sliders,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Bell,
  UserCheck,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Website Content', path: '/admin/content', icon: FileText },
  { name: 'Events', path: '/admin/events', icon: Calendar },
  { name: 'Announcements', path: '/admin/announcements', icon: Megaphone },
  { name: 'Worship Songs', path: '/admin/worship', icon: Music },
  { name: 'Life at Our Church (Gallery)', path: '/admin/gallery', icon: Image },
  { name: 'Ministries', path: '/admin/ministries', icon: Users },
  { name: 'Sermons', path: '/admin/sermons', icon: BookOpen },
  { name: 'Prayer Requests', path: '/admin/prayers', icon: HeartHandshake, badgeKey: 'unreadPrayers' },
  { name: 'In Loving Memory', path: '/admin/memorial', icon: Flame },
  { name: 'Media Library', path: '/admin/media', icon: Folder },
  { name: 'Homepage Control', path: '/admin/homepage', icon: Sliders },
  { name: 'Church Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const { auth, logout, data } = useCms();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const unreadPrayersCount = (data.prayers || []).filter((p) => p.status === 'unread').length;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Get active item title
  const currentNav = NAV_ITEMS.find((item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );
  const pageTitle = currentNav ? currentNav.name : 'Admin Panel';

  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#17202B] flex flex-col font-sans">

      {/* ── TOP HEADER BAR ── */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3"
        style={{
          background: '#FFFDF8',
          borderBottom: '1.5px solid rgba(184, 148, 74, 0.25)',
          boxShadow: '0 2px 10px rgba(23, 32, 43, 0.05)',
        }}
      >
        <div className="flex items-center space-x-3">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-[#17202B] hover:bg-ivory"
            aria-label="Toggle sidebar menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Logo */}
          <div className="hidden lg:flex items-center space-x-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#FFFDF9]"
              style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gold-soft" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M6 8h12" />
              </svg>
            </div>
            <div>
              <span className="block font-serif font-bold text-sm leading-none text-[#17202B]">CNI CHURCH CMS</span>
              <span className="block text-[9px] font-bold uppercase tracking-wider text-[#7E2634]">MAHASAMUND ADMIN</span>
            </div>
          </div>

          <div className="h-5 w-px bg-gold/20 hidden sm:block" />

          {/* Page Title */}
          <h1 className="font-serif text-lg sm:text-xl font-bold text-[#17202B] truncate">
            {pageTitle}
          </h1>
        </div>

        {/* Top Right Header Controls */}
        <div className="flex items-center space-x-3">
          {/* View Live Website Button */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#7E2634] hover:bg-burgundy/10 transition-colors"
            style={{ border: '1px solid rgba(126, 38, 52, 0.3)' }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>VIEW LIVE WEBSITE</span>
          </a>

          {/* Unread Prayers Notification Badge */}
          {unreadPrayersCount > 0 && (
            <NavLink
              to="/admin/prayers"
              className="relative p-2 rounded-full text-[#7E2634] hover:bg-burgundy/10 transition-colors"
              title={`${unreadPrayersCount} unread prayer request(s)`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadPrayersCount}
              </span>
            </NavLink>
          )}

          {/* Admin User Badge */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-xl bg-ivory text-xs border border-gold/20">
            <UserCheck className="w-4 h-4 text-[#7E2634]" />
            <span className="font-semibold text-[#17202B]">{auth.user?.name || 'Admin'}</span>
          </div>

          {/* Quick Logout */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-[#7E2634] hover:bg-burgundy/10 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ── MAIN BODY WITH SIDEBAR & CONTENT AREA ── */}
      <div className="flex-grow flex relative">

        {/* ── LEFT SIDEBAR (Desktop) ── */}
        <aside
          className="hidden lg:flex flex-col w-64 shrink-0 py-6 px-4 border-r overflow-y-auto"
          style={{
            background: '#FFFDF8',
            borderColor: 'rgba(184, 148, 74, 0.25)',
            maxHeight: 'calc(100vh - 60px)',
          }}
        >
          <div className="space-y-1 flex-grow">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9E9A91] px-3 block mb-2">
              NAVIGATION MENU
            </span>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-burgundy text-[#FFFDF9] shadow-md font-bold'
                        : 'text-[#6E6A63] hover:text-[#17202B] hover:bg-ivory'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>

                  {item.badgeKey === 'unreadPrayers' && unreadPrayersCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white">
                      {unreadPrayersCount}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Sidebar Footer User Info & Logout */}
          <div className="pt-4 border-t border-gold/20 mt-4 space-y-2">
            <div className="px-3 py-2 rounded-xl bg-ivory border border-gold/20 text-xs">
              <span className="block font-bold text-[#17202B] truncate">{auth.user?.email || 'admin@cnichurch.org'}</span>
              <span className="block text-[10px] text-[#7E2634] font-semibold uppercase tracking-wider">SUPER ADMIN ROLE</span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* ── MOBILE SIDEBAR DRAWER ── */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 z-40 lg:hidden bg-[#17202B]/60 backdrop-blur-sm"
              />

              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#FFFDF8] border-r border-gold/30 p-5 flex flex-col justify-between overflow-y-auto"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-gold/20 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center text-white font-serif font-bold">
                        ✝
                      </div>
                      <span className="font-serif font-bold text-[#17202B] text-base">CNI CHURCH CMS</span>
                    </div>
                    <button onClick={() => setMobileSidebarOpen(false)} className="p-2 text-[#7E2634]">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <nav className="space-y-1">
                    {NAV_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          end={item.exact}
                          onClick={() => setMobileSidebarOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                              isActive
                                ? 'bg-burgundy text-white shadow-md font-bold'
                                : 'text-[#6E6A63] hover:bg-ivory'
                            }`
                          }
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </div>

                          {item.badgeKey === 'unreadPrayers' && unreadPrayersCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white">
                              {unreadPrayersCount}
                            </span>
                          )}
                        </NavLink>
                      );
                    })}
                  </nav>
                </div>

                <div className="pt-4 border-t border-gold/20 mt-6">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── MAIN CONTENT OUTLET AREA ── */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
