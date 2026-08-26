import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Plus, Copy, Check, Trash2, X, Search, ExternalLink } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function MediaLibrary() {
  const { data, addMediaItem, deleteMediaItem } = useCms();
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [search, setSearch] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: 'General',
  });

  const handleCopy = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.url.trim()) return;
    addMediaItem(formData);
    setFormData({ name: '', url: '', category: 'General' });
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this media asset?')) {
      deleteMediaItem(id);
    }
  };

  const filteredMedia = (data.media || []).filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#17202B]">
            Central Media Library
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6A63]">
            Upload or register image assets for reuse across Events, Gallery, Sermons & Content sections.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2 shadow-md transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '44px' }}
        >
          <Plus className="w-4 h-4 text-gold-soft" />
          <span>+ Add Media Asset</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search media by name or category..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border border-gold/30 bg-ivory text-[#17202B]"
        />
        <Search className="w-4 h-4 text-[#9E9A91] absolute left-3.5 top-1/2 -translate-y-1/2" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredMedia.map((m) => (
          <div
            key={m.id}
            className="group rounded-2xl overflow-hidden shadow-md flex flex-col justify-between"
            style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.25)', height: '250px' }}
          >
            <div className="relative h-36 bg-black">
              <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-black/70 text-gold-soft">
                {m.category}
              </span>
            </div>

            <div className="p-3 space-y-1">
              <h4 className="font-serif font-bold text-xs text-[#17202B] truncate">{m.name}</h4>
              <p className="text-[10px] text-[#9E9A91] truncate">{m.url}</p>
            </div>

            <div className="p-2 flex items-center justify-between border-t border-gold/15 bg-ivory/50">
              <button
                onClick={() => handleCopy(m.id, m.url)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#7E2634] bg-burgundy/10 flex items-center space-x-1"
              >
                {copiedId === m.id ? <Check className="w-3 h-3 text-green-700" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === m.id ? 'Copied!' : 'Copy URL'}</span>
              </button>

              <button
                onClick={() => handleDelete(m.id)}
                className="p-1.5 rounded-lg text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
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
              className="relative w-full max-w-md bg-[#FFFDF8] border-2 border-gold/35 rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gold/20 mb-5">
                <h3 className="font-serif font-bold text-xl text-[#17202B]">Add Media Asset</h3>
                <button onClick={() => setModalOpen(false)} className="p-2 text-[#7E2634]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Asset Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    placeholder="e.g. Christmas Fellowship Photo"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    placeholder="e.g. Worship, Exterior, Events"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Image File URL</label>
                  <input
                    type="text"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    placeholder="/church.jpg or https://..."
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
                    Add Media
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
