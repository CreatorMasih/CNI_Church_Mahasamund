import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Megaphone,
  HeartHandshake,
  Image,
  BookOpen,
  Users,
  Flame,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Music,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function AdminDashboard() {
  const { data, auth } = useCms();
  const navigate = useNavigate();

  const eventsCount = (data.events || []).length;
  const announcementsCount = (data.announcements || []).filter((a) => a.isPublished).length;
  const prayersCount = (data.prayers || []).length;
  const unreadPrayersCount = (data.prayers || []).filter((p) => p.status === 'unread').length;
  const galleryCount = (data.gallery || []).length;
  const sermonsCount = (data.sermons?.recent || []).length + 1;
  const ministriesCount = (data.ministries || []).length;
  const memorialsCount = (data.memorials || []).length;

  const stats = [
    { label: 'Upcoming Events', count: eventsCount, icon: Calendar, color: '#7E2634', path: '/admin/events' },
    { label: 'Active Announcements', count: announcementsCount, icon: Megaphone, color: '#B8944A', path: '/admin/announcements' },
    { label: 'Prayer Requests', count: prayersCount, badge: unreadPrayersCount ? `${unreadPrayersCount} New` : null, icon: HeartHandshake, color: '#4E1822', path: '/admin/prayers' },
    { label: 'Gallery Photos', count: galleryCount, icon: Image, color: '#232E3C', path: '/admin/gallery' },
    { label: 'Sermon Messages', count: sermonsCount, icon: BookOpen, color: '#7E2634', path: '/admin/sermons' },
    { label: 'Church Ministries', count: ministriesCount, icon: Users, color: '#B8944A', path: '/admin/ministries' },
    { label: 'Memorial Entries', count: memorialsCount, icon: Flame, color: '#4E1822', path: '/admin/memorial' },
  ];

  return (
    <div className="space-y-8">

      {/* ── WELCOME BANNER ── */}
      <div
        className="rounded-3xl p-6 sm:p-8 text-[#FFFDF9] relative overflow-hidden shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
          border: '1.5px solid rgba(216, 188, 118, 0.4)',
        }}
      >
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-soft block">
            ADMINISTRATION DASHBOARD
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold">
            Welcome back, {auth.user?.name || 'Administrator'}
          </h2>
          <p className="text-xs sm:text-sm text-[#EBE4D5]/80 font-light leading-relaxed">
            Manage public website content, publish parish announcements, process intercession prayers, and update events live for CNI Church Mahasamund.
          </p>
        </div>

        {/* Decorative Cross Watermark */}
        <div className="absolute right-6 -bottom-10 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 140" className="w-56 h-72 fill-current text-white">
            <rect x="44" y="10" width="12" height="120" rx="2" />
            <rect x="15" y="38" width="70" height="12" rx="2" />
          </svg>
        </div>
      </div>

      {/* ── QUICK ACTION BUTTONS ── */}
      <div className="space-y-3">
        <h3 className="font-serif font-bold text-lg text-[#17202B]">Quick Administrator Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: '+ Add Event', path: '/admin/events', color: '#7E2634', icon: Calendar },
            { label: '+ Add Announcement', path: '/admin/announcements', color: '#B8944A', icon: Megaphone },
            { label: 'Upload Photos', path: '/admin/gallery', color: '#232E3C', icon: Image },
            { label: '+ Add Sermon', path: '/admin/sermons', color: '#7E2634', icon: BookOpen },
            { label: '+ Add Memorial', path: '/admin/memorial', color: '#4E1822', icon: Flame },
            { label: 'Edit Content', path: '/admin/content', color: '#B8944A', icon: FileText },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={i}
                onClick={() => navigate(action.path)}
                className="p-3.5 rounded-2xl flex flex-col items-center justify-center space-y-2 text-center transition-all hover:-translate-y-0.5 active:scale-95 shadow-md"
                style={{
                  background: '#FFFDF8',
                  border: '1.5px solid rgba(184, 148, 74, 0.25)',
                  minHeight: '80px',
                }}
              >
                <Icon className="w-5 h-5 text-[#7E2634]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#17202B]">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── OVERVIEW STATS CARDS ── */}
      <div className="space-y-3">
        <h3 className="font-serif font-bold text-lg text-[#17202B]">Content Overview</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(stat.path)}
                className="group p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-md relative overflow-hidden"
                style={{
                  background: '#FFFDF8',
                  border: '1.5px solid rgba(184, 148, 74, 0.25)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ background: stat.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {stat.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white animate-pulse">
                      {stat.badge}
                    </span>
                  )}
                </div>

                <span className="block font-serif text-3xl font-bold text-[#17202B] group-hover:text-[#7E2634] transition-colors">
                  {stat.count}
                </span>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#6E6A63] mt-1">
                  {stat.label}
                </span>

                <div className="flex items-center space-x-1 text-[11px] font-bold uppercase tracking-wider text-[#B8944A] pt-3 mt-2 border-t border-gold/15">
                  <span>MANAGE</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── RECENT ACTIVITY LOG & UNREAD PRAYERS PREVIEW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Recent Activity Feed (7 cols) */}
        <div
          className="lg:col-span-7 p-6 rounded-3xl shadow-lg space-y-4"
          style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.25)' }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-gold/20">
            <h3 className="font-serif font-bold text-lg text-[#17202B] flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#7E2634]" />
              <span>Recent Activity Log</span>
            </h3>
            <span className="text-xs text-[#9E9A91]">Live CMS Audit</span>
          </div>

          <div className="space-y-3">
            {(data.activityLog || []).slice(0, 6).map((log) => (
              <div
                key={log.id}
                className="flex items-start space-x-3 p-3 rounded-xl text-xs bg-ivory/60 border border-gold/15"
              >
                <div className="w-2 h-2 rounded-full bg-burgundy mt-1.5 shrink-0" />
                <div className="flex-grow">
                  <p className="font-semibold text-[#17202B]">{log.text}</p>
                  <span className="text-[10px] text-[#9E9A91]">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unread Prayer Requests Box (5 cols) */}
        <div
          className="lg:col-span-5 p-6 rounded-3xl shadow-lg space-y-4 flex flex-col justify-between"
          style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.25)' }}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gold/20">
              <h3 className="font-serif font-bold text-lg text-[#17202B] flex items-center space-x-2">
                <HeartHandshake className="w-5 h-5 text-[#7E2634]" />
                <span>Unread Prayer Requests</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                {unreadPrayersCount} Pending
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {(data.prayers || [])
                .filter((p) => p.status === 'unread')
                .slice(0, 3)
                .map((pr) => (
                  <div
                    key={pr.id}
                    onClick={() => navigate('/admin/prayers')}
                    className="p-3 rounded-xl bg-burgundy/5 border border-burgundy/20 cursor-pointer hover:bg-burgundy/10 transition-colors text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold text-[#7E2634]">
                      <span>{pr.name}</span>
                      {pr.isPrivate && (
                        <span className="px-2 py-0.2 rounded text-[9px] bg-red-700 text-white font-sans">
                          CONFIDENTIAL
                        </span>
                      )}
                    </div>
                    <p className="text-[#6E6A63] line-clamp-2 italic">"{pr.request}"</p>
                  </div>
                ))}

              {unreadPrayersCount === 0 && (
                <div className="text-center py-6 text-xs text-[#9E9A91] space-y-1">
                  <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
                  <p>All prayer requests have been reviewed!</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/prayers')}
            className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-[#FFFDF9] mt-4"
            style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '44px' }}
          >
            VIEW ALL PRAYER REQUESTS →
          </button>
        </div>

      </div>

    </div>
  );
}
