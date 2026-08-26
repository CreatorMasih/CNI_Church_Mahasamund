import React from 'react';
import { Sliders, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function HomepageControl() {
  const { data, toggleSection } = useCms();

  const sections = [
    { key: 'hero', name: 'Cinematic Hero Section', desc: 'Main header section with real church photograph & welcome titles' },
    { key: 'serviceInfo', name: 'Quick Service Information Strip', desc: 'Floating panel with Sunday timings, next event & verse of day' },
    { key: 'about', name: 'About & Parish Story Section', desc: 'Story narrative, heritage history, and scripture quote card' },
    { key: 'worship', name: 'Worship With Us Section', desc: 'Interactive worship video broadcast, Psalm 96:1 & sound controls' },
    { key: 'scripture', name: 'Immersive Scripture Experience', desc: 'Fullscreen sunset halo scripture section with John 14:6' },
    { key: 'events', name: 'Upcoming Gatherings & Events', desc: 'Asymmetrical event cards & event details modal' },
    { key: 'ministries', name: 'Church Ministries Section', desc: 'Interactive grid of youth, women, choir & outreach groups' },
    { key: 'gallery', name: 'Life at Our Church (Gallery)', desc: 'Editorial masonry photo gallery & lightbox modal' },
    { key: 'sermons', name: 'Latest Messages & Sermons', desc: 'Featured sermon broadcast visual & sermon archive row' },
    { key: 'prayer', name: 'Intercession Prayer Request Form', desc: 'Prayer request submission form for visitors' },
    { key: 'memorial', name: 'In Loving Memory (Memorial)', desc: 'Respectful tribute cards & candle lighting animations' },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#17202B] flex items-center space-x-2">
          <Sliders className="w-6 h-6 text-[#7E2634]" />
          <span>Homepage Section Controls</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#6E6A63] mt-1">
          Enable or disable individual sections rendered on the public website without altering code.
        </p>
      </div>

      {/* Toggles Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sections.map((sec) => {
          const isEnabled = data.sectionToggles?.[sec.key] !== false;
          return (
            <div
              key={sec.key}
              className="p-5 rounded-2xl shadow-md flex items-center justify-between gap-4 transition-colors"
              style={{
                background: isEnabled ? '#FFFDF8' : '#F6F1E7',
                border: isEnabled ? '1.5px solid rgba(184, 148, 74, 0.35)' : '1.5px solid rgba(110, 106, 99, 0.2)',
                opacity: isEnabled ? 1 : 0.65,
              }}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-serif font-bold text-base text-[#17202B] truncate">{sec.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                      isEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {isEnabled ? 'ACTIVE' : 'HIDDEN'}
                  </span>
                </div>
                <p className="text-xs text-[#6E6A63] leading-relaxed line-clamp-2">{sec.desc}</p>
              </div>

              <button
                onClick={() => toggleSection(sec.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 flex items-center space-x-1.5 transition-all ${
                  isEnabled
                    ? 'bg-burgundy text-white shadow-sm hover:brightness-110'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={{ minHeight: '40px' }}
              >
                {isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span>{isEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
