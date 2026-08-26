import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Shield, CheckCircle2, Search, Trash2, Mail, Phone, Lock, Filter } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function PrayersManager() {
  const { data, updatePrayerStatus, deletePrayerRequest } = useCms();
  const [filter, setFilter] = useState('all'); // all | unread | read | prayed | confidential
  const [searchTerm, setSearchTerm] = useState('');

  const prayers = data.prayers || [];

  const filteredPrayers = prayers.filter((p) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'unread'
        ? p.status === 'unread'
        : filter === 'read'
        ? p.status === 'read'
        : filter === 'prayed'
        ? p.status === 'prayed'
        : filter === 'confidential'
        ? p.isPrivate
        : true;

    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.request.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contact.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id) => {
    if (window.confirm('Delete this prayer request record?')) {
      deletePrayerRequest(id);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#17202B] flex items-center space-x-2">
            <span>Intercession Prayer Requests</span>
            <Shield className="w-5 h-5 text-[#7E2634]" />
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6A63]">
            Admin-only portal. Review, intercede, and mark prayer requests submitted by website visitors.
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-burgundy/10 border border-burgundy/20 text-xs font-bold text-[#7E2634] flex items-center space-x-2">
          <Lock className="w-4 h-4 text-burgundy" />
          <span>CONFIDENTIAL ADMIN DATA</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#FFFDF8] p-4 rounded-2xl border border-gold/25 shadow-sm">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, request, or phone/email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border border-gold/30 bg-ivory text-[#17202B]"
          />
          <Search className="w-4 h-4 text-[#9E9A91] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          {[
            ['all', 'All Requests'],
            ['unread', 'Unread'],
            ['read', 'Reviewed'],
            ['prayed', 'Prayed For'],
            ['confidential', '🔒 Confidential'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors shrink-0 ${
                filter === key
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'bg-ivory text-[#6E6A63] hover:bg-gold/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Prayers List */}
      <div className="space-y-4">
        {filteredPrayers.map((pr) => (
          <motion.div
            key={pr.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 sm:p-6 rounded-2xl shadow-md space-y-3 relative"
            style={{
              background: '#FFFDF8',
              border: pr.isPrivate ? '1.5px solid #7E2634' : '1.5px solid rgba(184, 148, 74, 0.25)',
            }}
          >
            {/* Status & Badges Top Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/15 pb-3">
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-lg text-[#17202B]">{pr.name}</span>
                {pr.isPrivate && (
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-red-700 text-white flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span>STRICTLY CONFIDENTIAL WITH PASTOR</span>
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-[11px] text-[#9E9A91]">{pr.createdAt}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    pr.status === 'unread'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : pr.status === 'prayed'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {pr.status === 'unread' ? '● UNREAD' : pr.status === 'prayed' ? '✓ PRAYED FOR' : 'REVIEWED'}
                </span>
              </div>
            </div>

            {/* Request Content */}
            <p className="text-xs sm:text-sm text-[#17202B] leading-relaxed italic bg-ivory/40 p-3.5 rounded-xl border border-gold/15">
              "{pr.request}"
            </p>

            {/* Contact details */}
            {pr.contact && pr.contact !== 'None' && (
              <div className="text-xs text-[#6E6A63] flex items-center space-x-2">
                <span className="font-semibold text-[#7E2634]">Contact:</span>
                <span>{pr.contact}</span>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-gold/15">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updatePrayerStatus(pr.id, 'unread')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    pr.status === 'unread' ? 'bg-red-700 text-white' : 'bg-ivory text-[#6E6A63]'
                  }`}
                >
                  Unread
                </button>
                <button
                  onClick={() => updatePrayerStatus(pr.id, 'read')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    pr.status === 'read' ? 'bg-[#7E2634] text-white' : 'bg-ivory text-[#6E6A63]'
                  }`}
                >
                  Mark Reviewed
                </button>
                <button
                  onClick={() => updatePrayerStatus(pr.id, 'prayed')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 ${
                    pr.status === 'prayed' ? 'bg-green-700 text-white' : 'bg-ivory text-[#6E6A63]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Prayed For</span>
                </button>
              </div>

              <button
                onClick={() => handleDelete(pr.id)}
                className="p-2 rounded-lg text-red-700 bg-red-50 hover:bg-red-100"
                title="Delete Request"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}

        {filteredPrayers.length === 0 && (
          <div className="text-center py-12 text-sm text-[#9E9A91] bg-[#FFFDF8] rounded-2xl border border-gold/20">
            No prayer requests match the selected filter.
          </div>
        )}
      </div>

    </div>
  );
}
