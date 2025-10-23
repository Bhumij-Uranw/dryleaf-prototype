import React from 'react';
import { Task, Priority } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onFocus: (task: Task) => void;
  onSetDeadline: (task: Task) => void;
}

const priorityStyles: Record<Priority, { bg: string; text: string; border: string }> = {
  high: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  low: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onFocus, onSetDeadline }) => {
  const styles = priorityStyles[task.priority];

  const formattedDeadline = task.deadline
    ? new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : null;

  return (
    <div
      className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
        task.completed ? 'bg-white/60' : 'bg-white hover:shadow-md'
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 rounded text-calm-accent focus:ring-calm-accent border-calm-border mr-4 flex-shrink-0"
      />
      <div className="flex-grow">
        <p className={`text-calm-text ${task.completed ? 'line-through text-calm-subtle' : ''}`}>
          {task.text}
        </p>
        {formattedDeadline && (
          <div className="flex items-center text-xs text-calm-subtle mt-1">
            <CalendarIcon className="w-3 h-3 mr-1" />
            <span>{formattedDeadline}</span>
          </div>
        )}
      </div>
      <div
        className={`text-xs font-semibold px-2 py-1 rounded-full border ${styles.bg} ${styles.text} ${styles.border} mx-4 hidden sm:block`}
      >
        {task.priority}
      </div>
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onSetDeadline(task)} className="p-1 text-calm-subtle hover:text-calm-accent" aria-label="Set deadline">
          <CalendarIcon className="w-5 h-5" />
        </button>
        <button onClick={() => onFocus(task)} className="p-1 text-calm-subtle hover:text-calm-accent" aria-label="Focus on task">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 112 0v2a1 1 0 11-2 0V5zm1 11a1 1 0 001-1V9a1 1 0 00-2 0v6a1 1 0 001 1z" clipRule="evenodd" />
          </svg>
        </button>
        <button onClick={() => onDelete(task.id)} className="p-1 text-calm-subtle hover:text-red-500" aria-label="Delete task">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};
