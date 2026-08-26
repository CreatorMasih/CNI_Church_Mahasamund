import React, { createContext, useContext, useState, useEffect } from 'react';
import { IMAGES, EVENTS, MINISTRIES, GALLERY_ITEMS, SERMONS, MEMORIALS, WORSHIP_SONG } from '../data/churchData';

const CmsContext = createContext(null);

const STORAGE_KEY = 'cni_church_cms_data_v2';
const AUTH_KEY = 'cni_church_admin_auth_v2';

// Default Seed State
const DEFAULT_CMS_DATA = {
  hero: {
    welcomeLabel: 'WELCOME HOME',
    mainHeading: 'CNI CHURCH',
    subHeading: 'MAHASAMUND',
    tagline: 'A Place of Faith, Hope & Love.',
    verse: 'For where two or three gather in my name, there am I with them.',
    verseReference: '— Matthew 18:20',
    primaryCtaText: 'EXPLORE OUR CHURCH',
    secondaryCtaText: 'WATCH OUR STORY',
    image: IMAGES.cniChurch,
    establishedYear: '1909',
  },
  about: {
    label: 'OUR STORY & HERITAGE',
    heading: 'More Than a Church.',
    headingItalic: 'A Family in Christ.',
    story: "Standing gracefully in Mahasamund, St. Peter's Church (CNI Church Mahasamund) has been a sacred beacon of faith, hope, and Christian unity since 1909. Under the Church of North India (CNI) Diocese of Chhattisgarh, our parish continues to preach the Gospel of grace and nurture generations in biblical truth.",
    paragraph2: "Whether you are seeking spiritual sanctuary, meaningful fellowship, youth guidance, or a place to serve your neighbors, you will find open doors and warm hearts waiting for you.",
    scripture: 'Let all that you do be done in love.',
    scriptureReference: '— 1 Cor 16:14',
    photo: IMAGES.cniChurch,
    established: '1909',
    diocese: 'CNI Diocese of C.G.',
    familiesCount: '100+ Families',
  },
  serviceInfo: {
    sundayTiming: 'Sunday • 8:00 AM',
    sundayCommunion: 'Communion: 1st & 3rd Sundays',
    sundaySchoolTiming: 'Sunday • 7:00 AM',
    youthTiming: 'Saturday • 6:00 PM',
    womensTiming: 'Wednesday • 5:00 PM',
    verseOfDay: 'The Lord is my shepherd; I shall not want.',
    verseOfDayReference: '— Psalm 23:1',
  },
  events: EVENTS,
  announcements: [
    {
      id: 'ann-1',
      title: 'Special Thanksgiving Divine Worship',
      message: 'Join us this coming Sunday at 8:00 AM for special prayers and holy communion.',
      date: 'Aug 30, 2026',
      isImportant: true,
      isPublished: true,
      expiresAt: '2026-09-05',
    }
  ],
  worshipSongs: [
    WORSHIP_SONG
  ],
  gallery: GALLERY_ITEMS,
  ministries: MINISTRIES,
  sermons: SERMONS,
  prayers: [
    {
      id: 'pr-1',
      name: 'Brother Samuel',
      contact: 'samuel@domain.com',
      request: 'Please pray for my mother who is recovering in the hospital. May God restore her health.',
      isPrivate: false,
      status: 'read',
      createdAt: '2026-08-25 14:30',
    },
    {
      id: 'pr-2',
      name: 'Sister Anita',
      contact: '+91 98261 XXXXX',
      request: 'Seeking prayers for my son’s upcoming examinations and future guidance in Christ.',
      isPrivate: true,
      status: 'unread',
      createdAt: '2026-08-26 10:15',
    }
  ],
  memorials: MEMORIALS,
  settings: {
    churchName: 'CNI CHURCH MAHASAMUND',
    fullChurchName: "St. Peter's Church (CNI) Mahasamund",
    address: 'Station Road, Mahasamund, Chhattisgarh — 493445',
    mapsUrl: 'https://maps.google.com/?q=St+Peters+Church+Mahasamund',
    phone: '+91 7723 XXXXX',
    whatsapp: '+91 98261 XXXXX',
    email: 'info@cnichurchmahasamund.org',
    sundayServiceTiming: '8:00 AM – 10:00 AM',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    youtubeUrl: 'https://youtube.com',
  },
  sectionToggles: {
    hero: true,
    serviceInfo: true,
    about: true,
    worship: true,
    scripture: true,
    events: true,
    ministries: true,
    gallery: true,
    sermons: true,
    prayer: true,
    memorial: true,
  },
  media: [
    { id: 'm-1', name: 'Real Church Photo', url: '/church.jpg', category: 'Exterior' },
    { id: 'm-2', name: 'Worship Congregation', url: IMAGES.worship, category: 'Worship' },
    { id: 'm-3', name: 'Choir Harmony', url: IMAGES.choir, category: 'Choir' },
    { id: 'm-4', name: 'Youth Group', url: IMAGES.youth, category: 'Youth' },
    { id: 'm-5', name: 'Sanctuary Sunlit', url: IMAGES.sanctuary, category: 'Sanctuary' },
  ],
  activityLog: [
    { id: 'act-1', text: 'System initialized & default data loaded', time: 'Just now', type: 'system' },
    { id: 'act-2', text: 'New confidential prayer request received', time: 'Today 10:15', type: 'prayer' },
  ],
};

export function CmsProvider({ children }) {
  // ── CMS State Initialization with LocalStorage Persistence ──
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_CMS_DATA, ...parsed };
      }
    } catch (err) {
      console.error('Failed to load saved CMS data:', err);
    }
    return DEFAULT_CMS_DATA;
  });

  // ── Authentication State ──
  const [auth, setAuth] = useState(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_KEY);
      if (savedAuth) return JSON.parse(savedAuth);
    } catch (err) {
      console.error('Failed to load admin auth:', err);
    }
    return { isAuthenticated: false, user: null };
  });

  // Save data to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to persist CMS data:', err);
    }
  }, [data]);

  // Save auth to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    } catch (err) {
      console.error('Failed to persist admin auth:', err);
    }
  }, [auth]);

  // ── Auth Actions ──
  const login = (email, password) => {
    // Admin credentials validation
    if ((email === 'admin@cnichurchmahasamund.org' || email === 'admin') && password === 'admin123') {
      const user = {
        name: 'Rev. Presbyter / Administrator',
        email: 'admin@cnichurchmahasamund.org',
        role: 'SUPER_ADMIN',
      };
      setAuth({ isAuthenticated: true, user });
      logActivity('Admin logged in to Dashboard', 'auth');
      return { success: true };
    }
    return { success: false, error: 'Invalid admin email or password. Use admin@cnichurchmahasamund.org / admin123' };
  };

  const logout = () => {
    logActivity('Admin logged out', 'auth');
    setAuth({ isAuthenticated: false, user: null });
  };

  // ── Activity Log Helper ──
  const logActivity = (text, type = 'update') => {
    const newLog = {
      id: `act-${Date.now()}`,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
    };
    setData((prev) => ({
      ...prev,
      activityLog: [newLog, ...(prev.activityLog || []).slice(0, 20)],
    }));
  };

  // ── CMS Updater Functions ──

  // Hero Section Update
  const updateHero = (updatedHero) => {
    setData((prev) => ({ ...prev, hero: { ...prev.hero, ...updatedHero } }));
    logActivity('Updated Hero section details');
  };

  // About Section Update
  const updateAbout = (updatedAbout) => {
    setData((prev) => ({ ...prev, about: { ...prev.about, ...updatedAbout } }));
    logActivity('Updated About & Story section');
  };

  // Service Info Update
  const updateServiceInfo = (updatedService) => {
    setData((prev) => ({ ...prev, serviceInfo: { ...prev.serviceInfo, ...updatedService } }));
    logActivity('Updated Service Info & Timings');
  };

  // Events CRUD
  const addEvent = (newEvent) => {
    const item = { ...newEvent, id: Date.now() };
    setData((prev) => ({ ...prev, events: [item, ...prev.events] }));
    logActivity(`Added new event: "${newEvent.title}"`);
  };

  const updateEvent = (id, updatedEvent) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.map((e) => (e.id === id ? { ...e, ...updatedEvent } : e)),
    }));
    logActivity(`Updated event ID ${id}`);
  };

  const deleteEvent = (id) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    }));
    logActivity(`Deleted event ID ${id}`);
  };

  // Announcements CRUD
  const addAnnouncement = (newAnn) => {
    const item = { ...newAnn, id: `ann-${Date.now()}` };
    setData((prev) => ({ ...prev, announcements: [item, ...prev.announcements] }));
    logActivity(`Published announcement: "${newAnn.title}"`);
  };

  const updateAnnouncement = (id, updatedAnn) => {
    setData((prev) => ({
      ...prev,
      announcements: prev.announcements.map((a) => (a.id === id ? { ...a, ...updatedAnn } : a)),
    }));
    logActivity(`Updated announcement "${id}"`);
  };

  const deleteAnnouncement = (id) => {
    setData((prev) => ({
      ...prev,
      announcements: prev.announcements.filter((a) => a.id !== id),
    }));
    logActivity(`Deleted announcement "${id}"`);
  };

  // Worship Songs CRUD
  const addWorshipSong = (song) => {
    const item = { ...song, id: `song-${Date.now()}` };
    setData((prev) => ({ ...prev, worshipSongs: [item, ...prev.worshipSongs] }));
    logActivity(`Added worship song: "${song.title}"`);
  };

  const updateWorshipSong = (id, updatedSong) => {
    setData((prev) => ({
      ...prev,
      worshipSongs: prev.worshipSongs.map((s) => (s.id === id ? { ...s, ...updatedSong } : s)),
    }));
    logActivity(`Updated worship song "${id}"`);
  };

  const deleteWorshipSong = (id) => {
    setData((prev) => ({
      ...prev,
      worshipSongs: prev.worshipSongs.filter((s) => s.id !== id),
    }));
    logActivity(`Deleted worship song "${id}"`);
  };

  // Gallery CRUD
  const addGalleryItem = (newItem) => {
    const item = { ...newItem, id: Date.now() };
    setData((prev) => ({ ...prev, gallery: [item, ...prev.gallery] }));
    logActivity(`Added photo to Gallery: "${newItem.title}"`);
  };

  const updateGalleryItem = (id, updatedItem) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === id ? { ...g, ...updatedItem } : g)),
    }));
    logActivity(`Updated Gallery item ${id}`);
  };

  const deleteGalleryItem = (id) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
    logActivity(`Deleted Gallery photo ${id}`);
  };

  // Ministries CRUD
  const addMinistry = (newMin) => {
    const item = { ...newMin, id: `min-${Date.now()}` };
    setData((prev) => ({ ...prev, ministries: [...prev.ministries, item] }));
    logActivity(`Created new Ministry: "${newMin.title}"`);
  };

  const updateMinistry = (id, updatedMin) => {
    setData((prev) => ({
      ...prev,
      ministries: prev.ministries.map((m) => (m.id === id ? { ...m, ...updatedMin } : m)),
    }));
    logActivity(`Updated Ministry "${id}"`);
  };

  const deleteMinistry = (id) => {
    setData((prev) => ({
      ...prev,
      ministries: prev.ministries.filter((m) => m.id !== id),
    }));
    logActivity(`Deleted Ministry "${id}"`);
  };

  // Sermons CRUD
  const addSermon = (newSermon) => {
    const item = { ...newSermon, id: `serm-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      sermons: {
        ...prev.sermons,
        recent: [item, ...prev.sermons.recent],
      },
    }));
    logActivity(`Added sermon: "${newSermon.title}"`);
  };

  const updateSermon = (id, updatedSermon) => {
    setData((prev) => {
      if (prev.sermons.featured.id === id) {
        return { ...prev, sermons: { ...prev.sermons, featured: { ...prev.sermons.featured, ...updatedSermon } } };
      }
      return {
        ...prev,
        sermons: {
          ...prev.sermons,
          recent: prev.sermons.recent.map((s) => (s.id === id ? { ...s, ...updatedSermon } : s)),
        },
      };
    });
    logActivity(`Updated sermon "${id}"`);
  };

  const deleteSermon = (id) => {
    setData((prev) => ({
      ...prev,
      sermons: {
        ...prev.sermons,
        recent: prev.sermons.recent.filter((s) => s.id !== id),
      },
    }));
    logActivity(`Deleted sermon "${id}"`);
  };

  // Prayer Request Public Submit & Admin Status Management
  const addPrayerRequest = (publicRequest) => {
    const newReq = {
      id: `pr-${Date.now()}`,
      name: publicRequest.name || 'Anonymous',
      contact: publicRequest.contact || 'None',
      request: publicRequest.request,
      isPrivate: !!publicRequest.isPrivate,
      status: 'unread',
      createdAt: new Date().toLocaleString(),
    };
    setData((prev) => ({
      ...prev,
      prayers: [newReq, ...prev.prayers],
    }));
    logActivity(`New prayer request received from ${newReq.name}`, 'prayer');
    return newReq;
  };

  const updatePrayerStatus = (id, status) => {
    setData((prev) => ({
      ...prev,
      prayers: prev.prayers.map((p) => (p.id === id ? { ...p, status } : p)),
    }));
    logActivity(`Updated prayer request status to ${status}`);
  };

  const deletePrayerRequest = (id) => {
    setData((prev) => ({
      ...prev,
      prayers: prev.prayers.filter((p) => p.id !== id),
    }));
    logActivity(`Deleted prayer request ${id}`);
  };

  // Memorials CRUD
  const addMemorial = (newMem) => {
    const item = { ...newMem, id: Date.now() };
    setData((prev) => ({ ...prev, memorials: [...prev.memorials, item] }));
    logActivity(`Added Memorial entry for "${newMem.name}"`);
  };

  const updateMemorial = (id, updatedMem) => {
    setData((prev) => ({
      ...prev,
      memorials: prev.memorials.map((m) => (m.id === id ? { ...m, ...updatedMem } : m)),
    }));
    logActivity(`Updated Memorial entry ${id}`);
  };

  const deleteMemorial = (id) => {
    setData((prev) => ({
      ...prev,
      memorials: prev.memorials.filter((m) => m.id !== id),
    }));
    logActivity(`Deleted Memorial entry ${id}`);
  };

  // Church Settings Update
  const updateSettings = (newSettings) => {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...newSettings } }));
    logActivity('Updated Church Settings & Contact details');
  };

  // Section Toggles
  const toggleSection = (sectionKey) => {
    setData((prev) => ({
      ...prev,
      sectionToggles: {
        ...prev.sectionToggles,
        [sectionKey]: !prev.sectionToggles[sectionKey],
      },
    }));
    logActivity(`Toggled section "${sectionKey}" visibility`);
  };

  // Media Library CRUD
  const addMediaItem = (mediaItem) => {
    const item = { ...mediaItem, id: `m-${Date.now()}` };
    setData((prev) => ({ ...prev, media: [item, ...prev.media] }));
    logActivity(`Uploaded media asset: "${mediaItem.name}"`);
  };

  const deleteMediaItem = (id) => {
    setData((prev) => ({ ...prev, media: prev.media.filter((m) => m.id !== id) }));
    logActivity(`Deleted media asset ${id}`);
  };

  // Reset to Default Seed Data
  const resetToDefaults = () => {
    setData(DEFAULT_CMS_DATA);
    logActivity('Reset all CMS content to factory seed default', 'system');
  };

  const value = {
    data,
    auth,
    login,
    logout,
    updateHero,
    updateAbout,
    updateServiceInfo,
    addEvent,
    updateEvent,
    deleteEvent,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    addWorshipSong,
    updateWorshipSong,
    deleteWorshipSong,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    addMinistry,
    updateMinistry,
    deleteMinistry,
    addSermon,
    updateSermon,
    deleteSermon,
    addPrayerRequest,
    updatePrayerStatus,
    deletePrayerRequest,
    addMemorial,
    updateMemorial,
    deleteMemorial,
    updateSettings,
    toggleSection,
    addMediaItem,
    deleteMediaItem,
    resetToDefaults,
  };

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}
