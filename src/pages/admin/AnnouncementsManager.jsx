import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Plus, Trash2, Edit2, X, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function AnnouncementsManager() {
  const { data, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useCms();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    date: 'Today',
    isImportant: true,
    isPublished: true,
    expiresAt: '2026-09-30',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      message: '',
      date: new Date().toLocaleDateString(),
      isImportant: true,
      isPublished: true,
      expiresAt: '2026-09-30',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (ann) => {
    setEditingId(ann.id);
    setFormData({
      title: ann.title,
      message: ann.message,
      date: ann.date,
      isImportant: ann.isImportant,
      isPublished: ann.isPublished,
      expiresAt: ann.expiresAt || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateAnnouncement(editingId, formData);
    } else {
      addAnnouncement(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this announcement?')) {
      deleteAnnouncement(id);
    }
  };

  const togglePublish = (ann) => {
    updateAnnouncement(ann.id, { isPublished: !ann.isPublished });
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#17202B]">
            Church Announcements Manager
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6A63]">
            Publish quick notices, meeting alerts, and important parish updates.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2 shadow-md transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '44px' }}
        >
          <Plus className="w-4 h-4 text-gold-soft" />
          <span>+ Create Announcement</span>
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {(data.announcements || []).map((ann) => (
          <div
            key={ann.id}
            className="p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{
              background: ann.isPublished ? '#FFFDF8' : '#F6F1E7',
              border: ann.isImportant ? '1.5px solid #7E2634' : '1.5px solid rgba(184, 148, 74, 0.25)',
              opacity: ann.isPublished ? 1 : 0.7,
            }}
          >
            <div className="space-y-1.5 flex-grow">
              <div className="flex items-center space-x-2">
                {ann.isImportant && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-700 text-white flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>IMPORTANT NOTICE</span>
                  </span>
                )}
                <span className="text-xs text-[#9E9A91] font-semibold">{ann.date}</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#17202B]">{ann.title}</h3>
              <p className="text-xs text-[#6E6A63] leading-relaxed">{ann.message}</p>
            </div>

            <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => togglePublish(ann)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-1 ${
                  ann.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {ann.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{ann.isPublished ? 'Live' : 'Draft'}</span>
              </button>
              <button
                onClick={() => handleOpenEdit(ann)}
                className="p-2 rounded-lg text-[#7E2634] bg-burgundy/10"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(ann.id)}
                className="p-2 rounded-lg text-red-700 bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
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
                  {editingId ? 'Edit Announcement' : 'Create New Announcement'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-2 text-[#7E2634]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Title / Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Announcement Details</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                  />
                </div>

                <div className="flex items-center space-x-6 py-2">
                  <label className="flex items-center space-x-2 text-xs font-bold text-[#17202B] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isImportant}
                      onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
                      className="rounded"
                    />
                    <span>Mark as Important Notice</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs font-bold text-[#17202B] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="rounded"
                    />
                    <span>Publish Immediately</span>
                  </label>
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
                    Save Announcement
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
