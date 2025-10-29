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
  high: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-200', border: 'border-red-300 dark:border-red-700' },
  medium: { bg: 'bg-yellow-100 dark:bg-yellow-900/50', text: 'text-yellow-800 dark:text-yellow-200', border: 'border-yellow-300 dark:border-yellow-700' },
  low: { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-800 dark:text-green-200', border: 'border-green-300 dark:border-green-700' },
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onFocus, onSetDeadline }) => {
  const styles = priorityStyles[task.priority];

  const formattedDeadline = task.deadline
    ? new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : null;

  return (
    <div
      className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
        task.completed ? 'bg-white/60 dark:bg-dark-surface/40' : 'bg-white dark:bg-dark-surface hover:shadow-md'
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 rounded text-calm-accent focus:ring-calm-accent border-calm-border dark:border-dark-border bg-calm-bg dark:bg-dark-bg mr-4 flex-shrink-0"
      />
      <div className="flex-grow">
        <p className={`text-calm-text dark:text-dark-text ${task.completed ? 'line-through text-calm-subtle dark:text-dark-subtle' : ''}`}>
          {task.text}
        </p>
        {formattedDeadline && (
          <div className="flex items-center text-xs text-calm-subtle dark:text-dark-subtle mt-1">
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
      <div className="flex items-center space-x-1 sm:space-x-2 transition-opacity">
        <button onClick={() => onSetDeadline(task)} className="p-1 text-calm-subtle hover:text-calm-accent" aria-label="Set deadline">
          <CalendarIcon className="w-5 h-5" />
        </button>
        <button onClick={() => onFocus(task)} className="p-1 text-calm-subtle hover:text-calm-accent" aria-label="Focus on task">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
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