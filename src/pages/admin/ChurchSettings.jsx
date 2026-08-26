import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, CheckCircle2, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function ChurchSettings() {
  const { data, updateSettings, resetToDefaults } = useCms();
  const [formState, setFormState] = useState({ ...data.settings });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formState);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all website content & settings to factory seed default?')) {
      resetToDefaults();
      setFormState({ ...data.settings });
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#17202B]">
            Central Parish Settings
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6A63]">
            Global configuration for church contact details, address, maps link, phone numbers & social channels.
          </p>
        </div>

        {saved && (
          <span className="text-xs text-green-700 font-bold flex items-center space-x-1 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Live Across Website!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* 1. Basic Parish Info */}
        <div
          className="p-6 sm:p-8 rounded-3xl shadow-lg space-y-5"
          style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.3)' }}
        >
          <h3 className="font-serif font-bold text-xl text-[#17202B] pb-3 border-b border-gold/20 flex items-center space-x-2">
            <Globe className="w-5 h-5 text-[#7E2634]" />
            <span>1. Parish Name & Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Short Church Name (Header)</label>
              <input
                type="text"
                required
                value={formState.churchName}
                onChange={(e) => setFormState({ ...formState, churchName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Full Parish Title</label>
              <input
                type="text"
                required
                value={formState.fullChurchName}
                onChange={(e) => setFormState({ ...formState, fullChurchName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
          </div>
        </div>

        {/* 2. Contact & Address */}
        <div
          className="p-6 sm:p-8 rounded-3xl shadow-lg space-y-5"
          style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.3)' }}
        >
          <h3 className="font-serif font-bold text-xl text-[#17202B] pb-3 border-b border-gold/20 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-[#7E2634]" />
            <span>2. Address, Phone & Maps Integration</span>
          </h3>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Physical Parish Address</label>
            <input
              type="text"
              required
              value={formState.address}
              onChange={(e) => setFormState({ ...formState, address: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Phone Number</label>
              <input
                type="text"
                required
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">WhatsApp Contact</label>
              <input
                type="text"
                required
                value={formState.whatsapp}
                onChange={(e) => setFormState({ ...formState, whatsapp: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Parish Email Address</label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Google Maps URL</label>
            <input
              type="text"
              required
              value={formState.mapsUrl}
              onChange={(e) => setFormState({ ...formState, mapsUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
            />
          </div>
        </div>

        {/* 3. Social Channels */}
        <div
          className="p-6 sm:p-8 rounded-3xl shadow-lg space-y-5"
          style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.3)' }}
        >
          <h3 className="font-serif font-bold text-xl text-[#17202B] pb-3 border-b border-gold/20 flex items-center space-x-2">
            <Phone className="w-5 h-5 text-[#7E2634]" />
            <span>3. Social Channels & Media</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Facebook URL</label>
              <input
                type="text"
                value={formState.facebookUrl}
                onChange={(e) => setFormState({ ...formState, facebookUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Instagram URL</label>
              <input
                type="text"
                value={formState.instagramUrl}
                onChange={(e) => setFormState({ ...formState, instagramUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">YouTube Channel URL</label>
              <input
                type="text"
                value={formState.youtubeUrl}
                onChange={(e) => setFormState({ ...formState, youtubeUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase text-red-700 bg-red-50 border border-red-200"
          >
            Reset All Content to Defaults
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-white flex items-center justify-center space-x-2 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '50px' }}
          >
            <Save className="w-4 h-4 text-gold-soft" />
            <span>SAVE ALL PARISH SETTINGS</span>
          </button>
        </div>

      </form>

    </div>
  );
}
