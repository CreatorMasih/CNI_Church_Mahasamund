import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Plus, Edit2, Trash2, X, Play, Link as LinkIcon } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function WorshipManager() {
  const { data, addWorshipSong, updateWorshipSong, deleteWorshipSong } = useCms();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: 'Worship With Us',
    description: 'Take a moment to pause, reflect, and worship. Let every heart be filled with peace, faith, and the presence of God.',
    verse: 'Sing to the Lord a new song; sing to the Lord, all the earth.',
    reference: '— Psalm 96:1',
    youtubeUrl: 'https://youtu.be/bvzAG2JomhI?si=3NQZpKsiiVGo706M',
    id: 'bvzAG2JomhI',
    thumbnail: 'https://img.youtube.com/vi/bvzAG2JomhI/maxresdefault.jpg',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: 'Sacred Worship Hymn',
      description: 'Praise music recorded live during divine service at St. Peter’s Church Mahasamund.',
      verse: 'Make a joyful noise to the Lord, all the earth!',
      reference: '— Psalm 100:1',
      youtubeUrl: 'https://youtu.be/bvzAG2JomhI',
      id: 'bvzAG2JomhI',
      thumbnail: 'https://img.youtube.com/vi/bvzAG2JomhI/maxresdefault.jpg',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (song) => {
    setEditingId(song.id);
    setFormData({
      title: song.title,
      description: song.description,
      verse: song.verse,
      reference: song.reference,
      youtubeUrl: song.youtubeUrl || `https://youtu.be/${song.id}`,
      id: song.id,
      thumbnail: song.thumbnail,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Extract video ID from youtubeUrl
    let videoId = formData.id;
    const match = formData.youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      videoId = match[1];
    }
    const songPayload = {
      ...formData,
      id: videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    };

    if (editingId) {
      updateWorshipSong(editingId, songPayload);
    } else {
      addWorshipSong(songPayload);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this worship song?')) {
      deleteWorshipSong(id);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#17202B]">
            Worship Songs & Video Manager
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6A63]">
            Manage praise music recordings, YouTube video IDs, and worship section scriptures.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2 shadow-md transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '44px' }}
        >
          <Plus className="w-4 h-4 text-gold-soft" />
          <span>+ Add Worship Song</span>
        </button>
      </div>

      {/* Songs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(data.worshipSongs || []).map((song) => (
          <div
            key={song.id}
            className="p-5 rounded-2xl shadow-lg flex flex-col justify-between space-y-4"
            style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.3)' }}
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
              <img src={song.thumbnail} alt={song.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#7E2634] text-white flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7E2634]">
                YouTube ID: {song.id}
              </span>
              <h3 className="font-serif font-bold text-xl text-[#17202B]">{song.title}</h3>
              <p className="text-xs text-[#6E6A63] line-clamp-2">{song.description}</p>
              <blockquote className="text-xs font-serif italic text-[#7E2634] pt-1">
                "{song.verse}" {song.reference}
              </blockquote>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gold/15">
              <button
                onClick={() => handleOpenEdit(song)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#7E2634] bg-burgundy/10 flex items-center space-x-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(song.id)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-[#17202B]/75 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#FFFDF8] border-2 border-gold/35 rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gold/20 mb-5">
                <h3 className="font-serif font-bold text-xl text-[#17202B]">
                  {editingId ? 'Edit Worship Song' : 'Add Worship Song'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-2 text-[#7E2634]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Song / Message Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">YouTube Video Link or ID</label>
                  <input
                    type="text"
                    required
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    placeholder="https://youtu.be/bvzAG2JomhI"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Verse Text</label>
                    <input
                      type="text"
                      required
                      value={formData.verse}
                      onChange={(e) => setFormData({ ...formData, verse: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Reference</label>
                    <input
                      type="text"
                      required
                      value={formData.reference}
                      onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase text-[#6E6A63] border border-gold/30"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase text-white bg-burgundy shadow-md"
                  >
                    Save Worship Song
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
