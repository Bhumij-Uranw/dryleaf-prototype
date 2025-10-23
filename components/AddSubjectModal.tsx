import React, { useState } from 'react';

interface AddSubjectModalProps {
  onClose: () => void;
  onAddSubject: (name: string) => void;
}

export const AddSubjectModal: React.FC<AddSubjectModalProps> = ({ onClose, onAddSubject }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddSubject(name.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-calm-text mb-6">Add New Subject</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Project Phoenix"
            className="w-full p-3 border border-calm-border rounded-lg focus:ring-2 focus:ring-calm-accent focus:outline-none transition placeholder:text-calm-subtle focus:bg-calm-text focus:text-white focus:placeholder:text-gray-400"
            autoFocus
          />
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-calm-text hover:bg-calm-border transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-6 py-2 rounded-lg bg-calm-accent text-white font-semibold hover:bg-calm-accent-hover transition-colors disabled:bg-calm-subtle"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};