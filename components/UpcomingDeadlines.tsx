import React from 'react';
import { Task, Subject } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';

interface UpcomingDeadlinesProps {
  tasks: Task[];
  subjects: Subject[];
}

export const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({ tasks, subjects }) => {
  const tasksWithDeadlines = tasks
    .filter(t => t.deadline && !t.completed)
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime());

  const getRelativeDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);

    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
    if (diffDays < 0) return 'Overdue';

    return taskDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };
  
  const getSubjectName = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId)?.name || 'Uncategorized';
  }

  if (tasksWithDeadlines.length === 0) {
    return (
      <div className="bg-white/50 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-calm-text mb-4">Upcoming Deadlines</h2>
        <div className="text-center py-6 text-calm-subtle">
          <p>No upcoming deadlines.</p>
          <p>Assign a deadline to a task to see it here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/50 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-calm-text mb-4">Upcoming Deadlines</h2>
      <div className="space-y-3">
        {tasksWithDeadlines.slice(0, 5).map(task => {
          const deadlineDate = new Date(task.deadline!);
          const relativeDate = getRelativeDate(deadlineDate);
          return (
            <div key={task.id} className="flex items-start justify-between">
              <div>
                <p className="text-calm-text">{task.text}</p>
                <p className="text-xs text-calm-subtle">{getSubjectName(task.subjectId)}</p>
              </div>
              <div
                className={`flex items-center text-sm font-semibold whitespace-nowrap ${
                  relativeDate === 'Overdue' ? 'text-red-600' : 'text-calm-accent'
                }`}
              >
                <CalendarIcon className="w-4 h-4 mr-1.5" />
                {relativeDate}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
