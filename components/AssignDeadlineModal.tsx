import React, { useState } from 'react';
import { Task } from '../types';

interface AssignDeadlineModalProps {
  task: Task;
  onClose: () => void;
  onAssignDeadline: (taskId: string, deadline: string) => void;
}

export const AssignDeadlineModal: React.FC<AssignDeadlineModalProps> = ({ task, onClose, onAssignDeadline }) => {
  const [deadline, setDeadline] = useState(task.deadline ? task.deadline.split('T')[0] : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deadline) {
      // Set to midday in local timezone to avoid timezone issues
      const localDate = new Date(deadline);
      const timezoneOffset = localDate.getTimezoneOffset() * 60000;
      const utcDate = new Date(localDate.getTime() - timezoneOffset + 12 * 60 * 60 * 1000);
      onAssignDeadline(task.id, utcDate.toISOString());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-calm-text mb-2">Set Deadline</h2>
        <p className="text-calm-subtle mb-6 truncate">For task: "{task.text}"</p>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-3 border border-calm-border rounded-lg focus:ring-2 focus:ring-calm-accent focus:outline-none transition"
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
              disabled={!deadline}
              className="px-6 py-2 rounded-lg bg-calm-accent text-white font-semibold hover:bg-calm-accent-hover transition-colors disabled:bg-calm-subtle"
            >
              Save Deadline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
