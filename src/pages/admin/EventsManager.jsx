import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Plus, Edit2, Trash2, Star, CheckCircle2, Clock, MapPin, X, Eye } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function EventsManager() {
  const { data, addEvent, updateEvent, deleteEvent } = useCms();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    date: 'SUNDAY 8:00 AM',
    time: '8:00 AM – 10:00 AM',
    location: 'Main Sanctuary, CNI Church Mahasamund',
    category: 'Worship',
    description: '',
    image: '/church.jpg',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      date: 'COMING SUNDAY',
      time: '10:00 AM',
      location: 'Sanctuary & Fellowship Hall',
      category: 'Celebration',
      description: '',
      image: '/church.jpg',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (evt) => {
    setEditingId(evt.id);
    setFormData({
      title: evt.title,
      date: evt.date,
      time: evt.time,
      location: evt.location,
      category: evt.category || 'Worship',
      description: evt.description,
      image: evt.image,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateEvent(editingId, formData);
    } else {
      addEvent(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event? It will be removed from the public website.')) {
      deleteEvent(id);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#17202B]">
            Church Events Manager
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6A63]">
            Publish, edit, and feature church services, gatherings, and special celebrations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2 shadow-md transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)', minHeight: '44px' }}
        >
          <Plus className="w-4 h-4 text-gold-soft" />
          <span>+ Add New Event</span>
        </button>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data.events || []).map((evt, idx) => (
          <div
            key={evt.id}
            className="rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 relative"
            style={{ background: '#FFFDF8', border: '1.5px solid rgba(184, 148, 74, 0.25)' }}
          >
            {/* Image Preview */}
            <div className="relative h-44 rounded-xl overflow-hidden border border-gold/20">
              <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-[#7E2634] text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">
                {evt.date}
              </div>
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-gold-soft px-2.5 py-1 rounded-full text-[10px] font-bold">
                {evt.category}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-lg text-[#17202B] leading-snug">{evt.title}</h3>
              <p className="text-xs text-[#6E6A63] line-clamp-2 leading-relaxed">{evt.description}</p>
              <div className="text-[11px] text-[#7E2634] space-y-1 font-medium pt-1">
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center space-x-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{evt.location}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gold/15">
              <button
                onClick={() => handleOpenEdit(evt)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#7E2634] bg-burgundy/10 flex items-center space-x-1 hover:bg-burgundy/20"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(evt.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 flex items-center space-x-1 hover:bg-red-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Event Modal */}
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
              className="relative w-full max-w-lg bg-[#FFFDF8] border-2 border-gold/35 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gold/20 mb-5">
                <h3 className="font-serif font-bold text-xl text-[#17202B]">
                  {editingId ? 'Edit Church Event' : 'Add New Church Event'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-2 text-[#7E2634]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Event Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                    placeholder="e.g. Easter Praise Night"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Date Badge Text</label>
                    <input
                      type="text"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                      placeholder="e.g. SUNDAY 8:00 AM"
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
                      <option value="Special">Special Service</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Event Time</label>
                    <input
                      type="text"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                      placeholder="e.g. 10:00 AM – 12:00 PM"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2634]">Location</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm border border-gold/30 bg-ivory text-[#17202B]"
                      placeholder="Main Sanctuary"
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
                    placeholder="Short description of the event..."
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
                    {editingId ? 'Save Event Changes' : 'Publish Event'}
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
