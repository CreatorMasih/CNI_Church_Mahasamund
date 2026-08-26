import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function MemorialManager() {
  const { data, addMemorial, updateMemorial, deleteMemorial } = useCms();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    years: 'Resting in Heavenly Peace',
    tribute: '',
    verse: 'Their works do follow them. — Revelation 14:13',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      years: 'Resting in Heavenly Peace',
      tribute: '',
      verse: 'Precious in the sight of the LORD is the death of his saints. — Psalm 116:15',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (mem) => {
    setEditingId(mem.id);
    setFormData({
      name: mem.name,
      years: mem.years,
      tribute: mem.tribute,
      verse: mem.verse,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateMemorial(editingId, formData);
    } else {
      addMemorial(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this memorial entry?')) {
      deleteMemorial(id);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#17202B]">
            In Loving Memory Manager
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6A63]">
            Publish respectful tributes, scriptures, and remembrances for departed church saints and elders.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2 shadow-md transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '44px' }}
        >
          <Plus className="w-4 h-4 text-gold-soft" />
          <span>+ Add Memorial Entry</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(data.memorials || []).map((mem) => (
          <div
            key={mem.id}
            className="p-6 rounded-3xl shadow-lg space-y-4 relative flex flex-col justify-between"
            style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.3)' }}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-[#7E2634]">
                <Flame className="w-5 h-5 text-amber-500 fill-current animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">{mem.years}</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-[#17202B]">{mem.name}</h3>
              <p className="text-xs text-[#6E6A63] leading-relaxed">{mem.tribute}</p>
            </div>

            <div className="pt-3 border-t border-gold/20 flex items-center justify-between">
              <span className="text-xs font-serif italic text-[#7E2634]">{mem.verse}</span>
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => handleOpenEdit(mem)}
                  className="p-2 rounded-lg text-[#7E2634] bg-burgundy/10"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(mem.id)}
                  className="p-2 rounded-lg text-red-700 bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
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
                  {editingId ? 'Edit Memorial Entry' : 'Add Memorial Entry'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-2 text-[#7E2634]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Name / Group Title</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Years / Remembrance Label</label>
                  <input
                    type="text"
                    required
                    value={formData.years}
                    onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Tribute Details</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.tribute}
                    onChange={(e) => setFormData({ ...formData, tribute: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Scripture Verse</label>
                  <input
                    type="text"
                    required
                    value={formData.verse}
                    onChange={(e) => setFormData({ ...formData, verse: e.target.value })}
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
                    Save Memorial
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
