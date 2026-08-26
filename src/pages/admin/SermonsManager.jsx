import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Edit2, Trash2, X, Play, Star } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function SermonsManager() {
  const { data, addSermon, updateSermon, deleteSermon } = useCms();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const featured = data.sermons?.featured;
  const recent = data.sermons?.recent || [];

  const [formData, setFormData] = useState({
    title: '',
    speaker: 'Rev. Presbyter In-Charge',
    date: 'August 25, 2026',
    duration: '40 mins',
    series: 'Sunday Divine Message',
    description: '',
    image: '/church.jpg',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      speaker: 'Rev. Presbyter In-Charge',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      duration: '42 mins',
      series: 'Faith & Salvation',
      description: '',
      image: '/church.jpg',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (sermon) => {
    setEditingId(sermon.id);
    setFormData({
      title: sermon.title,
      speaker: sermon.speaker,
      date: sermon.date,
      duration: sermon.duration,
      series: sermon.series || 'Sunday Message',
      description: sermon.description || '',
      image: sermon.image,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateSermon(editingId, formData);
    } else {
      addSermon(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this sermon recording?')) {
      deleteSermon(id);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#17202B]">
            Sermon Messages & Media Manager
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6A63]">
            Publish recorded Sunday sermons, speaker credits, scripture references, and video links.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2 shadow-md transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '44px' }}
        >
          <Plus className="w-4 h-4 text-gold-soft" />
          <span>+ Add Sermon Broadcast</span>
        </button>
      </div>

      {/* Featured Sermon Control Card */}
      {featured && (
        <div
          className="p-6 rounded-3xl shadow-lg space-y-4 relative border-2 border-gold/40"
          style={{ background: '#FFFDF8' }}
        >
          <div className="flex items-center justify-between border-b border-gold/20 pb-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-burgundy text-white flex items-center space-x-1">
              <Star className="w-3 h-3 fill-current text-gold" />
              <span>CURRENT FEATURED BROADCAST</span>
            </span>
            <button
              onClick={() => handleOpenEdit(featured)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#7E2634] bg-burgundy/10 flex items-center space-x-1"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Featured</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-4 relative h-44 rounded-2xl overflow-hidden border border-gold/30">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-burgundy text-white flex items-center justify-center">
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </div>
              </div>
            </div>

            <div className="sm:col-span-8 space-y-2">
              <span className="text-xs font-bold text-[#7E2634] uppercase tracking-wider">{featured.series}</span>
              <h3 className="font-serif font-bold text-2xl text-[#17202B]">{featured.title}</h3>
              <p className="text-xs text-[#6E6A63] font-medium">{featured.speaker} — {featured.date} ({featured.duration})</p>
              <p className="text-xs text-[#6E6A63] line-clamp-2 leading-relaxed">{featured.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Sermons Archive Grid */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-xl text-[#17202B]">Recent Sermon Archive</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((sermon) => (
            <div
              key={sermon.id}
              className="p-5 rounded-2xl shadow-md flex flex-col justify-between space-y-3"
              style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.25)' }}
            >
              <div className="relative h-36 rounded-xl overflow-hidden border border-gold/20">
                <img src={sermon.image} alt={sermon.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-burgundy text-white flex items-center justify-center">
                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E2634] block">
                  {sermon.date} • {sermon.duration}
                </span>
                <h4 className="font-serif font-bold text-base text-[#17202B] line-clamp-2 mt-0.5">{sermon.title}</h4>
                <p className="text-xs text-[#6E6A63] mt-1">{sermon.speaker}</p>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gold/15">
                <button
                  onClick={() => handleOpenEdit(sermon)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase text-[#7E2634] bg-burgundy/10 flex items-center space-x-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(sermon.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase text-red-700 bg-red-50 flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
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
                  {editingId ? 'Edit Sermon Details' : 'Add New Sermon Broadcast'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-2 text-[#7E2634]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Sermon Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Speaker Name</label>
                    <input
                      type="text"
                      required
                      value={formData.speaker}
                      onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Date</label>
                    <input
                      type="text"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Duration</label>
                    <input
                      type="text"
                      required
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Series Name</label>
                    <input
                      type="text"
                      required
                      value={formData.series}
                      onChange={(e) => setFormData({ ...formData, series: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    />
                  </div>
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

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Thumbnail Image URL</label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                  />
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
                    Save Sermon
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
