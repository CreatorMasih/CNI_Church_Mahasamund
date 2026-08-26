import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Plus, Edit2, Trash2, X, Filter } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function GalleryManager() {
  const { data, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useCms();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Worship',
    image: '/church.jpg',
    aspect: 'square',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Worship',
      image: '/church.jpg',
      aspect: 'square',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      image: item.image,
      aspect: item.aspect || 'square',
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateGalleryItem(editingId, formData);
    } else {
      addGalleryItem(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this gallery photo?')) {
      deleteGalleryItem(id);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#17202B]">
            Life at Our Church (Gallery Manager)
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6A63]">
            Manage parish memories, community worship photos, youth events, and outreach media.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2 shadow-md transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '44px' }}
        >
          <Plus className="w-4 h-4 text-gold-soft" />
          <span>+ Upload / Add Photo</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {(data.gallery || []).map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden shadow-md flex flex-col justify-between"
            style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.25)', height: '260px' }}
          >
            <img src={item.image} alt={item.title} className="w-full h-36 object-cover" />
            
            <div className="p-3 space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#7E2634] block">
                {item.category}
              </span>
              <h4 className="font-serif font-bold text-xs text-[#17202B] line-clamp-1">{item.title}</h4>
            </div>

            <div className="p-2 flex items-center justify-end space-x-2 border-t border-gold/15 bg-ivory/50">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-1.5 rounded-lg text-[#7E2634] hover:bg-burgundy/10"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
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
                <h3 className="font-serif font-bold text-xl text-[#17202B]">
                  {editingId ? 'Edit Photo' : 'Add New Gallery Photo'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-2 text-[#7E2634]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Photo Title / Caption</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    placeholder="e.g. Sunday Youth Choir Praise"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                  >
                    <option value="Worship">Worship</option>
                    <option value="Celebration">Celebration</option>
                    <option value="Youth">Youth</option>
                    <option value="Fellowship">Fellowship</option>
                    <option value="Community">Outreach / Community</option>
                    <option value="Choir">Choir</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Image URL</label>
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
                    Save Photo
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
