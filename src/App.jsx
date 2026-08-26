import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CmsProvider, useCms } from './context/CmsContext';

// Components for Public Website
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceInfo from './components/ServiceInfo';
import Welcome from './components/Welcome';
import WorshipWithUs from './components/WorshipWithUs';
import BibleVerse from './components/BibleVerse';
import Events from './components/Events';
import Ministries from './components/Ministries';
import Gallery from './components/Gallery';
import Sermons from './components/Sermons';
import Prayer from './components/Prayer';
import Memorial from './components/Memorial';
import Footer from './components/Footer';
import VisitModal from './components/VisitModal';
import VideoModal from './components/VideoModal';

// Admin Layout & Protected Route
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import WebsiteContentManager from './pages/admin/WebsiteContentManager';
import EventsManager from './pages/admin/EventsManager';
import AnnouncementsManager from './pages/admin/AnnouncementsManager';
import WorshipManager from './pages/admin/WorshipManager';
import GalleryManager from './pages/admin/GalleryManager';
import MinistriesManager from './pages/admin/MinistriesManager';
import SermonsManager from './pages/admin/SermonsManager';
import PrayersManager from './pages/admin/PrayersManager';
import MemorialManager from './pages/admin/MemorialManager';
import MediaLibrary from './pages/admin/MediaLibrary';
import ChurchSettings from './pages/admin/ChurchSettings';
import HomepageControl from './pages/admin/HomepageControl';

// ── Public Website Shell Component ──
function PublicWebsite() {
  const { data } = useCms();
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState({ title: '', subtitle: '' });

  const toggles = data.sectionToggles || {};
  const activeAnnouncements = (data.announcements || []).filter((a) => a.isPublished);

  const handleOpenVideo = (title = '', subtitle = '') => {
    setActiveVideo({
      title: title || 'Walking by Faith — CNI Church Mahasamund',
      subtitle: subtitle || 'Sunday Message & Worship Broadcast',
    });
    setVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory text-[#17202B] flex flex-col font-sans">
      
      {/* Active Announcement Banner (if any) */}
      {activeAnnouncements.length > 0 && (
        <div className="bg-burgundy text-[#FFFDF9] py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider relative z-50 flex items-center justify-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[9px] bg-gold text-[#17202B]">NOTICE</span>
          <span className="truncate max-w-xl">{activeAnnouncements[0].title}: {activeAnnouncements[0].message}</span>
        </div>
      )}

      {/* Sticky Navigation */}
      <Navbar onOpenVisit={() => setVisitModalOpen(true)} />

      {/* Main Content Sections with Admin Section Controls */}
      <main className="flex-grow">
        {toggles.hero !== false && <Hero onOpenVideo={() => handleOpenVideo()} />}
        {toggles.serviceInfo !== false && <ServiceInfo />}
        {toggles.about !== false && <Welcome onOpenVisit={() => setVisitModalOpen(true)} />}
        {toggles.worship !== false && <WorshipWithUs />}
        {toggles.scripture !== false && <BibleVerse />}
        {toggles.events !== false && <Events />}
        {toggles.ministries !== false && <Ministries />}
        {toggles.gallery !== false && <Gallery />}
        {toggles.sermons !== false && <Sermons onOpenVideo={(t, s) => handleOpenVideo(t, s)} />}
        {toggles.prayer !== false && <Prayer />}
        {toggles.memorial !== false && <Memorial />}
      </main>

      {/* Footer */}
      <Footer onOpenVisit={() => setVisitModalOpen(true)} />

      {/* Visitor Modal */}
      <VisitModal
        isOpen={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
      />

      {/* Video Broadcast Preview Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoTitle={activeVideo.title}
        videoSubtitle={activeVideo.subtitle}
      />
    </div>
  );
}

// ── Main App Router Setup ──
export default function App() {
  return (
    <CmsProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Route */}
          <Route path="/" element={<PublicWebsite />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Panel Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="content" element={<WebsiteContentManager />} />
            <Route path="events" element={<EventsManager />} />
            <Route path="announcements" element={<AnnouncementsManager />} />
            <Route path="worship" element={<WorshipManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="ministries" element={<MinistriesManager />} />
            <Route path="sermons" element={<SermonsManager />} />
            <Route path="prayers" element={<PrayersManager />} />
            <Route path="memorial" element={<MemorialManager />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="settings" element={<ChurchSettings />} />
            <Route path="homepage" element={<HomepageControl />} />
          </Route>

          {/* Catch-all Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CmsProvider>
  );
}
