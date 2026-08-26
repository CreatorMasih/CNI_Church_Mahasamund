import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Edit2, Trash2, X, ShieldCheck } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function MinistriesManager() {
  const { data, addMinistry, updateMinistry, deleteMinistry } = useCms();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    leader: '',
    image: '/church.jpg',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      leader: 'Ministry Leaders',
      image: '/church.jpg',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (min) => {
    setEditingId(min.id);
    setFormData({
      title: min.title,
      description: min.description,
      leader: min.leader || '',
      image: min.image,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateMinistry(editingId, formData);
    } else {
      addMinistry(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this ministry?')) {
      deleteMinistry(id);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#17202B]">
            Church Ministries Manager
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6A63]">
            Create and edit parish ministries, descriptions, leader contact titles, and images.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2 shadow-md transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '44px' }}
        >
          <Plus className="w-4 h-4 text-gold-soft" />
          <span>+ Create New Ministry</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data.ministries || []).map((min) => (
          <div
            key={min.id}
            className="p-5 rounded-2xl shadow-lg flex flex-col justify-between space-y-4"
            style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.25)' }}
          >
            <div className="relative h-40 rounded-xl overflow-hidden border border-gold/20">
              <img src={min.image} alt={min.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-[#17202B]/80 backdrop-blur-md text-[#D8BC76] px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {min.leader}
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-xl text-[#17202B]">{min.title}</h3>
              <p className="text-xs text-[#6E6A63] line-clamp-3 leading-relaxed">{min.description}</p>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gold/15">
              <button
                onClick={() => handleOpenEdit(min)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#7E2634] bg-burgundy/10 flex items-center space-x-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(min.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 flex items-center space-x-1"
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
                  {editingId ? 'Edit Ministry' : 'Create New Ministry'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-2 text-[#7E2634]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Ministry Name</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    placeholder="e.g. Senior Citizens Fellowship"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Leader / Team Contact Title</label>
                  <input
                    type="text"
                    required
                    value={formData.leader}
                    onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    placeholder="e.g. Ministry Committee"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Description</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                  />
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
                    Save Ministry
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
