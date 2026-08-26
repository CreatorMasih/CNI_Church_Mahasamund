import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, CheckCircle2, FileText, Sparkles, Image as ImageIcon, BookOpen, Clock } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function WebsiteContentManager() {
  const { data, updateHero, updateAbout, updateServiceInfo } = useCms();

  const [heroState, setHeroState] = useState({ ...data.hero });
  const [aboutState, setAboutState] = useState({ ...data.about });
  const [serviceState, setServiceState] = useState({ ...data.serviceInfo });

  const [savedTab, setSavedTab] = useState('');

  const handleSaveHero = (e) => {
    e.preventDefault();
    updateHero(heroState);
    setSavedTab('hero');
    setTimeout(() => setSavedTab(''), 3000);
  };

  const handleSaveAbout = (e) => {
    e.preventDefault();
    updateAbout(aboutState);
    setSavedTab('about');
    setTimeout(() => setSavedTab(''), 3000);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    updateServiceInfo(serviceState);
    setSavedTab('service');
    setTimeout(() => setSavedTab(''), 3000);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#17202B]">
          Website Core Content Manager
        </h2>
        <p className="text-xs sm:text-sm text-[#6E6A63]">
          Edit and update text, headings, scriptures, and images rendered on the public website.
        </p>
      </div>

      {/* ── 1. HERO SECTION CONTENT FORM ── */}
      <div
        className="p-6 sm:p-8 rounded-3xl shadow-lg space-y-6"
        style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.3)' }}
      >
        <div className="flex items-center justify-between pb-4 border-b border-gold/20">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#7E2634]" />
            <h3 className="font-serif font-bold text-xl text-[#17202B]">1. Hero Section Content</h3>
          </div>
          {savedTab === 'hero' && (
            <span className="text-xs text-green-700 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Hero Saved & Live!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSaveHero} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Welcome Label Eyebrow</label>
              <input
                type="text"
                value={heroState.welcomeLabel}
                onChange={(e) => setHeroState({ ...heroState, welcomeLabel: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Established Year</label>
              <input
                type="text"
                value={heroState.establishedYear}
                onChange={(e) => setHeroState({ ...heroState, establishedYear: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Main Heading (Bold)</label>
              <input
                type="text"
                value={heroState.mainHeading}
                onChange={(e) => setHeroState({ ...heroState, mainHeading: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Subheading (Italic Gold/Burgundy)</label>
              <input
                type="text"
                value={heroState.subHeading}
                onChange={(e) => setHeroState({ ...heroState, subHeading: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Scripture Verse Text</label>
              <textarea
                rows={2}
                value={heroState.verse}
                onChange={(e) => setHeroState({ ...heroState, verse: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Verse Reference</label>
              <input
                type="text"
                value={heroState.verseReference}
                onChange={(e) => setHeroState({ ...heroState, verseReference: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Hero Image URL (Real Church Photo)</label>
            <input
              type="text"
              value={heroState.image}
              onChange={(e) => setHeroState({ ...heroState, image: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2 shadow-md"
              style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '44px' }}
            >
              <Save className="w-4 h-4" />
              <span>Save Hero Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* ── 2. ABOUT / WELCOME SECTION FORM ── */}
      <div
        className="p-6 sm:p-8 rounded-3xl shadow-lg space-y-6"
        style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.3)' }}
      >
        <div className="flex items-center justify-between pb-4 border-b border-gold/20">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#7E2634]" />
            <h3 className="font-serif font-bold text-xl text-[#17202B]">2. About & Story Section</h3>
          </div>
          {savedTab === 'about' && (
            <span className="text-xs text-green-700 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>About Saved & Live!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSaveAbout} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Main Headline</label>
              <input
                type="text"
                value={aboutState.heading}
                onChange={(e) => setAboutState({ ...aboutState, heading: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Headline Italic Accent</label>
              <input
                type="text"
                value={aboutState.headingItalic}
                onChange={(e) => setAboutState({ ...aboutState, headingItalic: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Church Story Paragraph 1</label>
            <textarea
              rows={3}
              value={aboutState.story}
              onChange={(e) => setAboutState({ ...aboutState, story: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Church Story Paragraph 2</label>
            <textarea
              rows={2}
              value={aboutState.paragraph2}
              onChange={(e) => setAboutState({ ...aboutState, paragraph2: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Floating Scripture Card Text</label>
              <input
                type="text"
                value={aboutState.scripture}
                onChange={(e) => setAboutState({ ...aboutState, scripture: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Scripture Reference</label>
              <input
                type="text"
                value={aboutState.scriptureReference}
                onChange={(e) => setAboutState({ ...aboutState, scriptureReference: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2 shadow-md"
              style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '44px' }}
            >
              <Save className="w-4 h-4" />
              <span>Save About Section</span>
            </button>
          </div>
        </form>
      </div>

      {/* ── 3. SERVICE INFORMATION STRIP FORM ── */}
      <div
        className="p-6 sm:p-8 rounded-3xl shadow-lg space-y-6"
        style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.3)' }}
      >
        <div className="flex items-center justify-between pb-4 border-b border-gold/20">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-[#7E2634]" />
            <h3 className="font-serif font-bold text-xl text-[#17202B]">3. Service Information & Verse of Day</h3>
          </div>
          {savedTab === 'service' && (
            <span className="text-xs text-green-700 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Service Info Saved & Live!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSaveService} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Sunday Worship Timing</label>
              <input
                type="text"
                value={serviceState.sundayTiming}
                onChange={(e) => setServiceState({ ...serviceState, sundayTiming: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Communion Note</label>
              <input
                type="text"
                value={serviceState.sundayCommunion}
                onChange={(e) => setServiceState({ ...serviceState, sundayCommunion: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Verse of the Day Text</label>
              <input
                type="text"
                value={serviceState.verseOfDay}
                onChange={(e) => setServiceState({ ...serviceState, verseOfDay: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Verse Reference</label>
              <input
                type="text"
                value={serviceState.verseOfDayReference}
                onChange={(e) => setServiceState({ ...serviceState, verseOfDayReference: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2 shadow-md"
              style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '44px' }}
            >
              <Save className="w-4 h-4" />
              <span>Save Service Information</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
