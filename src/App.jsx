import React, { useState } from 'react';
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

export default function App() {
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState({ title: '', subtitle: '' });

  const handleOpenVideo = (title = '', subtitle = '') => {
    setActiveVideo({
      title: title || 'Walking by Faith — CNI Church Mahasamund',
      subtitle: subtitle || 'Sunday Message & Worship Broadcast',
    });
    setVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory text-[#17202B] flex flex-col font-sans">
      {/* Sticky Navigation */}
      <Navbar onOpenVisit={() => setVisitModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Section 1: Cinematic Hero */}
        <Hero onOpenVideo={() => handleOpenVideo()} />

        {/* Section 2: Quick Service Information Strip */}
        <ServiceInfo />

        {/* Section 3: Welcome & About */}
        <Welcome onOpenVisit={() => setVisitModalOpen(true)} />

        {/* Section 4: Worship With Us (NEW CINEMATIC WORSHIP SECTION) */}
        <WorshipWithUs />

        {/* Section 5: Immersive Scripture Experience */}
        <BibleVerse />

        {/* Section 6: Upcoming Events */}
        <Events />

        {/* Section 7: Church Ministries */}
        <Ministries />

        {/* Section 8: Life At Our Church (Gallery + Lightbox) */}
        <Gallery />

        {/* Section 9: Latest Sermons */}
        <Sermons onOpenVideo={(title, subtitle) => handleOpenVideo(title, subtitle)} />

        {/* Section 10: Prayer Request Section */}
        <Prayer />

        {/* Section 11: In Loving Memory */}
        <Memorial />
      </main>

      {/* Section 12 & Closing Footer */}
      <Footer onOpenVisit={() => setVisitModalOpen(true)} />

      {/* Visitor Plan Modal */}
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
